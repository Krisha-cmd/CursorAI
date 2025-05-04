import { useState } from 'react';

export const useColorVision = () => {
  const [colorMode, setColorMode] = useState('normal');

  const setColorVisionMode = (mode) => {
    // Remove all color vision classes
    document.body.classList.remove(
      'color-vision-protanopia',
      'color-vision-deuteranopia',
      'color-vision-tritanopia'
    );

    // Add the selected mode class
    if (mode !== 'normal') {
      document.body.classList.add(`color-vision-${mode}`);
    }

    setColorMode(mode);
  };

  const colorModes = [
    { id: 'normal', label: 'Normal Vision' },
    { id: 'protanopia', label: 'Protanopia (Red-Blind)' },
    { id: 'deuteranopia', label: 'Deuteranopia (Green-Blind)' },
    { id: 'tritanopia', label: 'Tritanopia (Blue-Blind)' }
  ];

  return {
    colorMode,
    setColorVisionMode,
    colorModes
  };
}; 