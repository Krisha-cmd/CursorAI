import React, { useState } from 'react';
import { useReadingAssistance } from './ReadingAssistance';
import './AccessibilityControls.css';

export const AccessibilityControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState('universal-access');
  const {
    isEnabled,
    zoomLevel,
    toggleReadingAssistance,
    stopReading,
    increaseZoom,
    decreaseZoom,
    resetZoom
  } = useReadingAssistance();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleFeatureClick = (feature, icon) => {
    setActiveIcon(icon);
    setIsOpen(false);
    
    switch (feature) {
      case 'reading':
        toggleReadingAssistance();
        break;
      case 'decrease':
        decreaseZoom();
        break;
      case 'increase':
        increaseZoom();
        break;
      case 'reset':
        resetZoom();
        break;
      default:
        break;
    }
  };

  const getIconClass = () => {
    switch (activeIcon) {
      case 'volume-up':
        return 'fas fa-volume-up';
      case 'volume-mute':
        return 'fas fa-volume-mute';
      case 'search-minus':
        return 'fas fa-search-minus';
      case 'search-plus':
        return 'fas fa-search-plus';
      case 'undo':
        return 'fas fa-undo';
      default:
        return 'fas fa-universal-access';
    }
  };

  return (
    <div className="floating-menu">
      <button 
        className="floating-menu-button"
        onClick={toggleMenu}
        aria-label="Accessibility Controls"
      >
        <i className={getIconClass()}></i>
      </button>

      <div className={`floating-menu-items ${isOpen ? 'open' : ''}`}>
        <button
          className="floating-menu-item"
          onClick={() => handleFeatureClick('reading', isEnabled ? 'volume-mute' : 'volume-up')}
          title="Toggle text-to-speech"
        >
          <i className={`fas ${isEnabled ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
          <span className="floating-menu-tooltip">
            {isEnabled ? 'Stop Reading' : 'Start Reading'}
          </span>
        </button>

        <button
          className="floating-menu-item"
          onClick={() => handleFeatureClick('decrease', 'search-minus')}
          title="Decrease text size"
        >
          <i className="fas fa-search-minus"></i>
          <span className="floating-menu-tooltip">Decrease Text Size</span>
        </button>

        <div className="floating-menu-chat">
          {Math.round(zoomLevel * 100)}%
        </div>

        <button
          className="floating-menu-item"
          onClick={() => handleFeatureClick('increase', 'search-plus')}
          title="Increase text size"
        >
          <i className="fas fa-search-plus"></i>
          <span className="floating-menu-tooltip">Increase Text Size</span>
        </button>

        <button
          className="floating-menu-item"
          onClick={() => handleFeatureClick('reset', 'undo')}
          title="Reset text size"
        >
          <i className="fas fa-undo"></i>
          <span className="floating-menu-tooltip">Reset Text Size</span>
        </button>
      </div>
    </div>
  );
}; 