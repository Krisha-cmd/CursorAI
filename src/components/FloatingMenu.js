import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/FloatingMenu.css';
import outlierLogo from '../Assets/outlierLogo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useReadingAssistance } from '../features/accessibility/ReadingAssistance';

function FloatingMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [position, setPosition] = useState({ x: 40, y: window.innerHeight - 130 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [activeIcon, setActiveIcon] = useState('universal-access');
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);

  const {
    isEnabled,
    zoomLevel,
    toggleReadingAssistance,
    increaseZoom,
    decreaseZoom,
    resetZoom
  } = useReadingAssistance();

  const chatMessages = [
    "Hello! Need help?",
    "How can I assist you today?",
    "Let's make your experience better!",
    "Discover our accessibility features",
    "Try our new features!"
  ];

  const menuItems = [
    {
      icon: 'fa-solid fa-hand-back-fist',
      label: 'Motion Experience',
      tooltip: 'Adjust motion sensitivity and reduce motion effects',
      action: () => handleFeatureClick('motion', 'hand-back-fist')
    },
    {
      icon: 'fa-solid fa-microphone-lines',
      label: 'Voice Control',
      tooltip: 'Enable voice commands for navigation and control',
      action: () => handleFeatureClick('voice', 'microphone-lines')
    },
    {
      icon: 'fa-solid fa-circle-half-stroke',
      label: 'High Contrast',
      tooltip: 'Switch to high contrast mode for better visibility',
      action: () => handleFeatureClick('contrast', 'circle-half-stroke')
    },
    {
      icon: 'fa-solid fa-palette',
      label: 'Color Vision Mode',
      tooltip: 'Adjust color settings for different types of color vision',
      action: () => handleFeatureClick('color', 'palette')
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Reading Assistance',
      tooltip: 'Enable text-to-speech and reading aids',
      action: () => handleFeatureClick('reading', isEnabled ? 'volume-mute' : 'volume-up')
    }
  ];

  const handleFeatureClick = (feature, icon) => {
    setActiveIcon(icon);
    setIsMenuOpen(false);
    
    switch (feature) {
      case 'reading':
        toggleReadingAssistance();
        if (!isEnabled) {
          setChatMessage("Click on the parts you want to read out loud");
          setShowChat(true);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            setShowChat(false);
          }, 5000);
        }
        break;
      case 'motion':
        document.body.classList.toggle('motion-reduced');
        break;
      case 'contrast':
        document.body.classList.toggle('high-contrast');
        break;
      case 'color':
        // Add color vision mode toggle logic here
        break;
      case 'voice':
        // Add voice control toggle logic here
        break;
      default:
        break;
    }
  };

  const getIconClass = () => {
    if (activeIcon === 'universal-access') {
      return 'fas fa-universal-access';
    }
    return `fas fa-${activeIcon}`;
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('.floating-menu-button')) {
      const rect = menuRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const x = e.clientX - dragOffset.x;
      const y = e.clientY - dragOffset.y;
      
      const maxX = window.innerWidth - menuRef.current.offsetWidth;
      const maxY = window.innerHeight - menuRef.current.offsetHeight;
      
      setPosition({
        x: Math.min(Math.max(0, x), maxX),
        y: Math.min(Math.max(0, y), maxY)
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const toggleMenu = () => {
    if (!isDragging) {
      setIsMenuOpen(!isMenuOpen);
      if (!isMenuOpen) {
        setShowChat(false);
      }
    }
  };

  const showRandomChat = () => {
    if (!isMenuOpen && !isEnabled) {
      const randomMessage = chatMessages[Math.floor(Math.random() * chatMessages.length)];
      setChatMessage(randomMessage);
      setShowChat(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setShowChat(false);
      }, 5000);
    }
  };

  useEffect(() => {
    setChatMessage(chatMessages[0]);
    
    const chatInterval = setInterval(() => {
      if (!isMenuOpen && !isEnabled) {
        showRandomChat();
      }
    }, 15000);

    return () => {
      clearInterval(chatInterval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isMenuOpen, isEnabled]);

  return (
    <div 
      className="floating-menu"
      ref={menuRef}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        bottom: 'auto',
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      onMouseDown={handleMouseDown}
    >
      <div 
        className="floating-menu-button"
        onClick={toggleMenu}
        role="button"
        tabIndex="0"
        aria-label="Toggle accessibility menu"
        aria-expanded={isMenuOpen}
      >
        <i className={getIconClass()}></i>
        {!isMenuOpen && showChat && (
          <div className="floating-menu-chat">
            {chatMessage}
          </div>
        )}
      </div>
      
      <div 
        className={`floating-menu-items ${isMenuOpen ? 'open' : ''}`}
        role="menu"
        aria-label="Accessibility options"
      >
        {menuItems.map((item, index) => (
          <button 
            key={index}
            className="floating-menu-item"
            role="menuitem"
            aria-label={item.tooltip}
            onClick={item.action}
          >
            <i className={item.icon}></i>
            <span className="floating-menu-tooltip">{item.tooltip}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default FloatingMenu; 