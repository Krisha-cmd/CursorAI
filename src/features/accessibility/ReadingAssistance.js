import { useState, useEffect, useRef } from 'react';

export const useReadingAssistance = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeElement, setActiveElement] = useState(null);
  const zoomTimeoutRef = useRef(null);
  const speechTimeoutRef = useRef(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  useEffect(() => {
    if (isEnabled) {
      // Add mouseover event listener to all text elements
      const handleMouseOver = (event) => {
        const target = event.target;
        
        // Only process elements with text content
        if (target.textContent && target.textContent.trim() && 
            !target.closest('.floating-menu') && // Exclude the floating menu
            window.getComputedStyle(target).display !== 'none') {
          
          // Clear any existing timeouts
          if (zoomTimeoutRef.current) clearTimeout(zoomTimeoutRef.current);
          if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);

          // Store the current element
          setActiveElement(target);

          // Add highlight class with a slight delay
          zoomTimeoutRef.current = setTimeout(() => {
            target.classList.add('reading-highlight');
            
            // Zoom the text
            const currentFontSize = window.getComputedStyle(target).fontSize;
            const newFontSize = parseFloat(currentFontSize) * 1.2;
            target.style.fontSize = `${newFontSize}px`;
            target.style.transition = 'font-size 0.3s ease';

            // Read the text
            if (speechSynthesis) {
              const utterance = new SpeechSynthesisUtterance(target.textContent.trim());
              utterance.rate = 0.9; // Slightly slower for better comprehension
              utterance.pitch = 1;
              speechSynthesis.speak(utterance);
            }
          }, 100);
        }
      };

      const handleMouseOut = (event) => {
        const target = event.target;
        
        // Clear timeouts
        if (zoomTimeoutRef.current) clearTimeout(zoomTimeoutRef.current);
        if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);

        // Stop any ongoing speech
        if (speechSynthesis) {
          speechSynthesis.cancel();
        }

        // Remove highlight and reset zoom with a delay
        if (target.classList.contains('reading-highlight')) {
          setTimeout(() => {
            target.classList.remove('reading-highlight');
            target.style.fontSize = '';
          }, 300);
        }
      };

      // Add event listeners to all text elements
      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseout', handleMouseOut);

      return () => {
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mouseout', handleMouseOut);
        if (zoomTimeoutRef.current) clearTimeout(zoomTimeoutRef.current);
        if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
        if (speechSynthesis) {
          speechSynthesis.cancel();
        }
      };
    }
  }, [isEnabled, speechSynthesis]);

  const toggleReadingAssistance = () => {
    setIsEnabled(!isEnabled);
    document.body.classList.toggle('reading-assistance');

    if (speechSynthesis) {
      if (!isEnabled) {
        // Stop any ongoing speech
        speechSynthesis.cancel();
      }
    }
  };

  const readText = (text) => {
    if (speechSynthesis && isEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  const stopReading = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
    }
  };

  const increaseZoom = () => {
    const newZoom = Math.min(zoomLevel + 0.1, 2.0);
    setZoomLevel(newZoom);
    document.body.style.fontSize = `${newZoom}em`;
  };

  const decreaseZoom = () => {
    const newZoom = Math.max(zoomLevel - 0.1, 0.8);
    setZoomLevel(newZoom);
    document.body.style.fontSize = `${newZoom}em`;
  };

  const resetZoom = () => {
    setZoomLevel(1);
    document.body.style.fontSize = '1em';
  };

  return {
    isEnabled,
    zoomLevel,
    toggleReadingAssistance,
    readText,
    stopReading,
    increaseZoom,
    decreaseZoom,
    resetZoom
  };
}; 