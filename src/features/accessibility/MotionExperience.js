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
  const [isFistClosed, setIsFistClosed] = useState(false);
  const modelRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const cameraContainerRef = useRef(null);
  const lastClickTimeRef = useRef(0);
  const lastHoveredElementRef = useRef(null);

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

    const loadingText = document.createElement('div');
    loadingText.className = 'camera-loading';
    loadingText.textContent = 'Initializing camera...';
    container.appendChild(loadingText);

    const canvas = document.createElement('canvas');
    canvas.className = 'hand-tracking-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasRef.current = canvas;
    document.body.appendChild(canvas);

    document.body.appendChild(container);
    cameraContainerRef.current = container;
    return container;
  };

  const initializeHandTracking = async () => {
    try {
      const systemCheck = checkSystemRequirements();
      setShowSystemCheck(!systemCheck.meetsRequirements);
      setShowCameraPermission(true);
      const container = createCameraContainer();

      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          } 
        });
        console.log('[Camera] Access granted with ideal settings');
      } catch (error) {
        console.warn('[Camera] Falling back to basic settings:', error);
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        console.log('[Camera] Access granted with basic settings');
      }

      const videoElement = document.createElement('video');
      videoElement.className = 'camera-video';
      videoElement.srcObject = stream;
      videoElement.width = 640;
      videoElement.height = 480;
      videoRef.current = videoElement;

      container.innerHTML = '';
      container.appendChild(videoElement);

      try {
        await videoElement.play();
        console.log('[Video] Playback started');
      } catch (error) {
        console.warn('[Video] Autoplay failed, enabling click-to-play');
        container.onclick = () => videoElement.play();
      }

      const overlay = document.createElement('div');
      overlay.className = 'motion-overlay';
      document.body.appendChild(overlay);

      console.log('[Model] Loading handpose model...');
      const handposeModel = await handpose.load();
      modelRef.current = handposeModel;
      setIsHandTrackingEnabled(true);
      console.log('[Model] Handpose model loaded');

      trackHands();
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
    }

    if (element && element.textContent && element.textContent.trim()) {
      element.classList.add('reading-highlight');
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
const x = (rawX / videoWidth) * canvas.width;
const y = (rawY / videoHeight) * canvas.height;

const mirroredX = canvas.width - x;

        // Draw hand landmarks
        ctx.fillStyle = 'rgba(94, 234, 212, 0.8)';
        ctx.beginPath();
        ctx.arc(mirroredX, y, 5, 0, 2 * Math.PI);
        ctx.fill();

        // Check for fist
        const fistClosed = isFist(landmarks);
        if (fistClosed !== isFistClosed) {
          setIsFistClosed(fistClosed);
          if (fistClosed) {
            const now = Date.now();
            if (now - lastClickTimeRef.current > 500) {
              lastClickTimeRef.current = now;
              const element = document.elementFromPoint(mirroredX, y);
              if (element) {
                element.click();
                handleElementClick(element);
                console.log('[Click] Element clicked:', element);
              }
            }
          }
        }

        // Update cursor
        document.querySelector('.hand-cursor')?.remove();
        const cursor = document.createElement('div');
        cursor.className = `hand-cursor ${fistClosed ? 'fist-closed' : ''}`;
        cursor.style.left = `${mirroredX}px`;
        cursor.style.top = `${y}px`;
        document.body.appendChild(cursor);

        // Add trail effect
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = `${mirroredX}px`;
        trail.style.top = `${y}px`;
        document.body.appendChild(trail);

        // Handle element hover
        const element = document.elementFromPoint(mirroredX, y);
        handleElementHover(element);
      }
    } catch (error) {
      console.error('[Error] Hand tracking:', error);
    }

    animationFrameRef.current = requestAnimationFrame(trackHands);
  };

  const stopHandTracking = () => {
    console.log('[Stop] Hand tracking');
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }

    document.querySelector('.hand-cursor')?.remove();
    document.querySelector('.motion-overlay')?.remove();
    document.getElementById('camera-container')?.remove();
    document.querySelector('.hand-tracking-canvas')?.remove();

    if (lastHoveredElementRef.current) {
      lastHoveredElementRef.current.classList.remove('reading-highlight');
    }

    setIsHandTrackingEnabled(false);
    modelRef.current = null;
    videoRef.current = null;
  };

  const toggleMotion = () => {
    const newState = !isReduced;
    console.log('[Toggle] Motion experience:', newState);
    setIsReduced(newState);
    document.body.classList.toggle('motion-reduced', newState);

    if (newState) {
      initializeHandTracking();
    } else {
      stopHandTracking();
    }
  };

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
    setShowCameraPermission,
    setShowSystemCheck,
    toggleMotion
  };
};
