import { useState, useEffect } from 'react';

export const useMotionExperience = () => {
  const [isReduced, setIsReduced] = useState(false);

  const toggleMotion = () => {
    setIsReduced(!isReduced);
    document.body.classList.toggle('motion-reduced');
  };

  useEffect(() => {
    // Check user's system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsReduced(true);
      document.body.classList.add('motion-reduced');
    }
  }, []);

  return {
    isReduced,
    toggleMotion
  };
}; 