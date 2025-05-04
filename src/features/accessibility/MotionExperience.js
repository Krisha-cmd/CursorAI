import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
import '../../styles/components/MotionExperience.css';

export const useMotionExperience = () => {
  const [isReduced, setIsReduced] = useState(false);
  const [isHandTrackingEnabled, setIsHandTrackingEnabled] = useState(false);
  const [showCameraPermission, setShowCameraPermission] = useState(false);
  const [showSystemCheck, setShowSystemCheck] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [isFistClosed, setIsFistClosed] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const modelRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const cameraContainerRef = useRef(null);
  const lastClickTimeRef = useRef(0);
  const lastHoveredElementRef = useRef(null);
  const loadingTimeoutRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const clickDebounceRef = useRef(null);
  const scrollDebounceRef = useRef(null);
  const lastScrollTimeRef = useRef(0);
  const smoothingFactor = 0.3;
  const scrollSpeed = 10; // Reduced scroll speed for smoother scrolling
  const scrollZoneHeight = 100; // Height of the scroll zones at top and bottom

  const checkSystemRequirements = () => {
    const gpu = tf.getBackend() === 'webgl';
    const memory = navigator.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;

    const result = {
      hasGPU: gpu,
      hasEnoughMemory: memory >= 8,
      hasEnoughCores: cores >= 4,
      meetsRequirements: gpu && memory >= 8 && cores >= 4
    };

    console.log('[System Check]', result);
    return result;
  };

  const createCameraContainer = () => {
    const existingContainer = document.getElementById('camera-container');
    if (existingContainer) existingContainer.remove();

    const container = document.createElement('div');
    container.id = 'camera-container';
    container.className = 'camera-container';
    container.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 320px;
      height: 180px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 9999;
      background: #000;
    `;

    const canvas = document.createElement('canvas');
    canvas.className = 'hand-tracking-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9998;
    `;
    canvasRef.current = canvas;
    document.body.appendChild(canvas);

    document.body.appendChild(container);
    cameraContainerRef.current = container;
    return container;
  };

  const initializeCamera = async () => {
    try {
      const container = createCameraContainer();

      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user',
            aspectRatio: 16/9
          } 
        });
        console.log('[Camera] Access granted with ideal settings');
      } catch (error) {
        console.warn('[Camera] Falling back to basic settings:', error);
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: {
            aspectRatio: 16/9
          }
        });
        console.log('[Camera] Access granted with basic settings');
      }

      const videoElement = document.createElement('video');
      videoElement.className = 'camera-video';
      videoElement.srcObject = stream;
      videoElement.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scaleX(-1);
      `;
      videoRef.current = videoElement;

      container.innerHTML = '';
      container.appendChild(videoElement);

      try {
        await videoElement.play();
        console.log('[Video] Playback started');
        setCameraEnabled(true);
        setShowCameraPermission(false);
        setShowSystemCheck(true);
      } catch (error) {
        console.warn('[Video] Autoplay failed, enabling click-to-play');
        container.onclick = async () => {
          await videoElement.play();
          setCameraEnabled(true);
          setShowCameraPermission(false);
          setShowSystemCheck(true);
        };
      }
    } catch (error) {
      console.error('[Error] Initializing camera:', error);
      stopHandTracking();
    }
  };

  const initializeHandTracking = async () => {
    try {
      const overlay = document.createElement('div');
      overlay.className = 'motion-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9997;
      `;
      document.body.appendChild(overlay);

      // Show loading popup immediately
      setShowLoading(true);
      console.log('[Loading] Showing loading popup');
      
      // Start model loading
      console.log('[Model] Loading handpose model...');
      const handposeModel = await handpose.load();
      modelRef.current = handposeModel;
      setIsHandTrackingEnabled(true);
      console.log('[Model] Handpose model loaded');

      // Show instruction popup after loading
      setShowInstruction(true);

      // Ensure loading popup shows for full 5 seconds
      loadingTimeoutRef.current = setTimeout(() => {
        console.log('[Loading] Hiding loading popup');
        setShowLoading(false);
        trackHands();
      }, 5000);

    } catch (error) {
      console.error('[Error] Initializing hand tracking:', error);
      stopHandTracking();
    }
  };

  const isFist = (landmarks) => {
    const thumbTip = landmarks[4];   // Thumb tip
    const indexTip = landmarks[8];   // Index finger tip
  
    const distance = Math.hypot(
      thumbTip[0] - indexTip[0],
      thumbTip[1] - indexTip[1]
    );
  
    const pinchThreshold = 30; // 🔧 You can adjust this value as needed
  
    const isPinched = distance < pinchThreshold;
  
    console.log('[Pinch Detection] Thumb-Index distance:', distance, '→ Pinched:', isPinched);
  
    return isPinched;
  };
  
  const handleElementHover = (element) => {
    if (lastHoveredElementRef.current === element) return;
    
    if (lastHoveredElementRef.current) {
      lastHoveredElementRef.current.classList.remove('reading-highlight');
      // Reset any font size changes
      lastHoveredElementRef.current.style.fontSize = '';
    }

    if (element && element.textContent && element.textContent.trim()) {
      element.classList.add('reading-highlight');
      // Store original font size if not already stored
      if (!element.dataset.originalFontSize) {
        element.dataset.originalFontSize = window.getComputedStyle(element).fontSize;
      }
      // Keep the original font size
      element.style.fontSize = element.dataset.originalFontSize;
    }

    lastHoveredElementRef.current = element;
  };

  const handleElementClick = (element) => {
    if (element && element.textContent && element.textContent.trim()) {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(element.textContent.trim());
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const smoothPosition = (current, target) => {
    return current + (target - current) * smoothingFactor;
  };

  const handleScroll = (direction) => {
    const now = Date.now();
    if (now - lastScrollTimeRef.current < 50) return; // Limit scroll frequency
    
    lastScrollTimeRef.current = now;
    const scrollAmount = direction === 'up' ? -scrollSpeed : scrollSpeed;
    
    window.scrollBy({
      top: scrollAmount,
      behavior: 'smooth'
    });
  };

  const trackHands = async () => {
    const model = modelRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!model || !video || !canvas) {
      console.warn('[Warning] Missing components:', {
        model: !!model,
        video: !!video,
        canvas: !!canvas
      });
      return;
    }

    try {
      const predictions = await model.estimateHands(video);
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (predictions.length > 0) {
        const landmarks = predictions[0].landmarks;
        const indexFinger = landmarks[8];

        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        const [rawX, rawY] = indexFinger;
        const targetX = (rawX / videoWidth) * canvas.width;
        const targetY = (rawY / videoHeight) * canvas.height;

        // Apply smoothing to cursor position
        const smoothedX = smoothPosition(lastPositionRef.current.x, canvas.width - targetX);
        const smoothedY = smoothPosition(lastPositionRef.current.y, targetY);

        // Handle scrolling based on position
        const windowHeight = window.innerHeight;
        const scrollThreshold = scrollZoneHeight;

        // Check if hand is in scroll zones
        if (smoothedY < scrollThreshold) {
          // In top scroll zone
          handleScroll('up');
        } else if (smoothedY > windowHeight - scrollThreshold) {
          // In bottom scroll zone
          handleScroll('down');
        }

        lastPositionRef.current = { x: smoothedX, y: smoothedY };

        // Draw hand landmarks with reduced opacity
        ctx.fillStyle = 'rgba(94, 234, 212, 0.6)';
        ctx.beginPath();
        ctx.arc(smoothedX, smoothedY, 5, 0, 2 * Math.PI);
        ctx.fill();

        // Draw scroll zones (for debugging, can be removed in production)
        ctx.fillStyle = 'rgba(94, 234, 212, 0.1)';
        ctx.fillRect(0, 0, canvas.width, scrollThreshold);
        ctx.fillRect(0, windowHeight - scrollThreshold, canvas.width, scrollThreshold);

        // Check for fist with debouncing
        const fistClosed = isFist(landmarks);
        if (fistClosed !== isFistClosed) {
          setIsFistClosed(fistClosed);
          if (fistClosed) {
            if (clickDebounceRef.current) {
              clearTimeout(clickDebounceRef.current);
            }

            clickDebounceRef.current = setTimeout(() => {
              const now = Date.now();
              if (now - lastClickTimeRef.current > 1000) {
                lastClickTimeRef.current = now;
                const element = document.elementFromPoint(smoothedX, smoothedY);
                if (element && !element.closest('.floating-menu')) {
                  element.click();
                  console.log('[Click] Element clicked:', element);
                }
              }
            }, 300);
          }
        }

        // Update cursor with smooth transitions
        const existingCursor = document.querySelector('.hand-cursor');
        if (existingCursor) {
          existingCursor.style.transition = 'transform 0.1s ease-out';
          existingCursor.style.transform = `translate(${smoothedX}px, ${smoothedY}px)`;
          existingCursor.className = `hand-cursor ${fistClosed ? 'fist-closed' : ''}`;
        } else {
          const cursor = document.createElement('div');
          cursor.className = `hand-cursor ${fistClosed ? 'fist-closed' : ''}`;
          cursor.style.cssText = `
            position: fixed;
            left: 0;
            top: 0;
            transform: translate(${smoothedX}px, ${smoothedY}px);
            transition: transform 0.1s ease-out;
            pointer-events: none;
            z-index: 9999;
          `;
          document.body.appendChild(cursor);
        }

        // Add trail effect with reduced opacity
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
          position: fixed;
          left: 0;
          top: 0;
          transform: translate(${smoothedX}px, ${smoothedY}px);
          transition: transform 0.1s ease-out, opacity 0.3s ease-out;
          pointer-events: none;
          z-index: 9998;
          opacity: 0.3;
        `;
        document.body.appendChild(trail);

        // Handle element hover with debouncing
        const element = document.elementFromPoint(smoothedX, smoothedY);
        if (element && !element.closest('.floating-menu')) {
          handleElementHover(element);
        }
      }
    } catch (error) {
      console.error('[Error] Hand tracking:', error);
    }

    animationFrameRef.current = requestAnimationFrame(trackHands);
  };

  const stopHandTracking = () => {
    console.log('[Stop] Hand tracking');
    
    // Clear all timeouts
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Stop video stream
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }

    // Remove all DOM elements
    document.querySelector('.hand-cursor')?.remove();
    document.querySelector('.motion-overlay')?.remove();
    document.getElementById('camera-container')?.remove();
    document.querySelector('.hand-tracking-canvas')?.remove();

    // Remove highlights
    if (lastHoveredElementRef.current) {
      lastHoveredElementRef.current.classList.remove('reading-highlight');
    }

    // Reset all states
    setIsHandTrackingEnabled(false);
    setShowLoading(false);
    setShowCameraPermission(false);
    setShowSystemCheck(false);
    setCameraEnabled(false);
    setIsFistClosed(false);
    
    // Clear refs
    modelRef.current = null;
    videoRef.current = null;
    canvasRef.current = null;
    cameraContainerRef.current = null;
    lastHoveredElementRef.current = null;
  };

  const toggleMotion = () => {
    const newState = !isReduced;
    console.log('[Toggle] Motion experience:', newState);
    
    if (isReduced) {
      // If it's currently enabled, disable it
      stopHandTracking();
      setIsReduced(false);
      document.body.classList.remove('motion-reduced');
    } else {
      // If it's currently disabled, enable it
      setIsReduced(true);
      document.body.classList.add('motion-reduced');
      setShowCameraPermission(true);
    }
  };

  useEffect(() => {
    if (cameraEnabled && !showSystemCheck) {
      initializeHandTracking();
    }
  }, [cameraEnabled, showSystemCheck]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsReduced(true);
      document.body.classList.add('motion-reduced');
    }

    return () => {
      stopHandTracking();
    };
  }, []);

  return {
    isReduced,
    isHandTrackingEnabled,
    showCameraPermission,
    showSystemCheck,
    showLoading,
    showInstruction,
    setShowCameraPermission,
    setShowSystemCheck,
    setShowInstruction,
    toggleMotion,
    initializeCamera
  };
};
