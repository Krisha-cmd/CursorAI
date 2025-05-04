import { useState, useEffect } from 'react';

export const useReadingAssistance = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

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

  return {
    isEnabled,
    toggleReadingAssistance,
    readText,
    stopReading
  };
}; 