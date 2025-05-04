import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/FloatingMenu.css';
import outlierLogo from '../Assets/outlierLogo.png';

function FloatingMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const timeoutRef = useRef(null);

  const chatMessages = [
    "Hello! Need help?",
    "How can I assist you today?",
    "Let's make your experience better!",
    "Discover our accessibility features",
    "Try our new features!"
  ];

  const menuItems = [
    {
      icon: '🔍',
      tooltip: 'Screen Reader Mode',
      link: '#'
    },
    {
      icon: '🎨',
      tooltip: 'High Contrast Mode',
      link: '#'
    },
    {
      icon: '📏',
      tooltip: 'Text Size Adjuster',
      link: '#'
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setShowChat(false);
    }
  };

  const showRandomChat = () => {
    if (!isMenuOpen) {
      const randomMessage = chatMessages[Math.floor(Math.random() * chatMessages.length)];
      setChatMessage(randomMessage);
      setShowChat(true);

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        setShowChat(false);
      }, 5000);
    }
  };

  useEffect(() => {
    // Set initial message
    setChatMessage(chatMessages[0]);
    
    // Set up interval for subsequent messages
    const chatInterval = setInterval(() => {
      if (!isMenuOpen) {
        showRandomChat();
      }
    }, 15000);

    return () => {
      clearInterval(chatInterval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isMenuOpen]);

  return (
    <div className="floating-menu">
      <div 
        className="floating-menu-button"
        onClick={toggleMenu}
        role="button"
        tabIndex="0"
        aria-label="Toggle accessibility menu"
        aria-expanded={isMenuOpen}
      >
        <img src={outlierLogo} alt="Outlier Logo" className="floating-menu-logo" />
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
          <a 
            key={index}
            href={item.link}
            className="floating-menu-item"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            aria-label={item.tooltip}
          >
            <span className="floating-menu-icon">{item.icon}</span>
            <span className="floating-menu-tooltip">{item.tooltip}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default FloatingMenu; 