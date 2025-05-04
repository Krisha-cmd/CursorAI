import { useState, useEffect } from 'react';

export const useHighContrast = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
    document.body.classList.toggle('high-contrast');
  };

  useEffect(() => {
    // Check user's system preferences
    const prefersHighContrast = window.matchMedia('(prefers-contrast: more)').matches;
    if (prefersHighContrast) {
      setIsHighContrast(true);
      document.body.classList.add('high-contrast');
    }
  }, []);

  return {
    isHighContrast,
    toggleHighContrast
  };
}; 