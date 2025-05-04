import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/FloatingMenu.css';
import outlierLogo from '../Assets/outlierLogo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useReadingAssistance } from '../features/accessibility/ReadingAssistance';
import HandTrackingPopups from './HandTrackingPopups';
import { useMotionExperience } from '../features/accessibility/MotionExperience';
import { useVoiceControl } from '../features/accessibility/VoiceControl';

function FloatingMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [position, setPosition] = useState({ x: 40, y: window.innerHeight - 130 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [activeMode, setActiveMode] = useState(null);
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);

  const {
    isEnabled,
    toggleReadingAssistance
  } = useReadingAssistance();

  const {
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
  } = useMotionExperience();

  const {
    isListening,
    isSpeaking,
    toggleVoiceControl,
    startListening,
    stopListening
  } = useVoiceControl();

  const chatMessages = [
    "Hello! Need help?",
    "How can I assist you today?",
    "Let's make your experience better!",
    "Discover our accessibility features",
    "Try our new features!"
  ];

  // Effect to handle chat message changes
  useEffect(() => {
    if (chatMessage) {
      console.log('Current chat message:', chatMessage);
    }
  }, [chatMessage]);

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
    // {
    //   icon: 'fa-solid fa-circle-half-stroke',
    //   label: 'High Contrast',
    //   tooltip: 'Switch to high contrast mode for better visibility',
    //   action: () => handleFeatureClick('contrast', 'circle-half-stroke')
    // },
    // {
    //   icon: 'fa-solid fa-palette',
    //   label: 'Color Vision Mode',
    //   tooltip: 'Adjust color settings for different types of color vision',
    //   action: () => handleFeatureClick('color', 'palette')
    // },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Reading Assistance',
      tooltip: 'Enable text-to-speech and reading aids',
      action: () => handleFeatureClick('reading', isEnabled ? 'volume-mute' : 'volume-up')
    }
  ];

  const handleFeatureClick = (feature, icon) => {
    console.log('Feature clicked:', feature, 'Current active mode:', activeMode);
    
    // If clicking the same feature, deactivate it
    if (activeMode === feature) {
      console.log('Deactivating current feature:', feature);
      setActiveMode(null);
      setIsMenuOpen(false);
      
      // Remove any active classes
      document.body.classList.remove('motion-reduced', 'high-contrast', 'reading-assistance');
      if (feature === 'reading') {
        toggleReadingAssistance();
      } else if (feature === 'motion') {
        toggleMotion();
      } else if (feature === 'voice') {
        console.log('Deactivating voice control');
        toggleVoiceControl();
      }
      return;
    }

    // Deactivate previous mode if any
    if (activeMode) {
      console.log('Deactivating previous mode:', activeMode);
      document.body.classList.remove('motion-reduced', 'high-contrast', 'reading-assistance');
      if (activeMode === 'reading') {
        toggleReadingAssistance();
      } else if (activeMode === 'motion') {
        toggleMotion();
      } else if (activeMode === 'voice') {
        console.log('Deactivating previous voice control');
        toggleVoiceControl();
      }
    }

    // Activate new mode
    console.log('Setting new active mode:', feature);
    setActiveMode(feature);
    setIsMenuOpen(false);
    
    switch (feature) {
      case 'reading':
        toggleReadingAssistance();
        setChatMessage("Hover over text to zoom and read aloud");
        setShowChat(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setShowChat(false);
        }, 10000);
        break;
      case 'motion':
        toggleMotion();
        setChatMessage("Now you can use your hands instead of your mouse!");
        setShowChat(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setShowChat(false);
        }, 10000);
        break;
      case 'contrast':
        document.body.classList.add('high-contrast');
        break;
      case 'color':
        // Add color vision mode toggle logic here
        break;
      case 'voice':
        console.log('Activating voice control');
        toggleVoiceControl();
        setChatMessage("Voice control activated. I'm listening for your commands.");
        setShowChat(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setShowChat(false);
        }, 10000);
        break;
      default:
        break;
    }
  };

  const getIconContent = () => {
    if (!activeMode) {
      return <img src={outlierLogo} alt="Outlier Logo" className="floating-menu-logo" />;
    }

    switch (activeMode) {
      case 'reading':
        return <i className={`fas ${isEnabled ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>;
      case 'motion':
        return <i className="fas fa-hand-back-fist"></i>;
      case 'contrast':
        return <i className="fas fa-circle-half-stroke"></i>;
      case 'color':
        return <i className="fas fa-palette"></i>;
      case 'voice':
        return <i className={`fas ${isListening ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>;
      default:
        return <img src={outlierLogo} alt="Outlier Logo" className="floating-menu-logo" />;
    }
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
    if (!isMenuOpen && !activeMode) {
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

  // Initial chat message and interval setup
  useEffect(() => {
    if (!activeMode) {
      setChatMessage(chatMessages[0]);
    }
    
    const chatInterval = setInterval(() => {
      if (!isMenuOpen && !activeMode) {
        showRandomChat();
      }
    }, 15000);

    return () => {
      clearInterval(chatInterval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isMenuOpen, activeMode]);

  return (
    <>
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
          {getIconContent()}
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
              className={`floating-menu-item ${activeMode === item.label.toLowerCase().replace(' ', '-') ? 'active' : ''}`}
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
      <HandTrackingPopups
        showSystemCheck={showSystemCheck}
        showCameraPermission={showCameraPermission}
        showLoading={showLoading}
        showInstruction={showInstruction}
        setShowSystemCheck={setShowSystemCheck}
        setShowCameraPermission={setShowCameraPermission}
        setShowInstruction={setShowInstruction}
        initializeCamera={initializeCamera}
      />
    </>
  );
}

export default FloatingMenu; 