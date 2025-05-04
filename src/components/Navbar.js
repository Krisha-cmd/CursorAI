import React, { useState } from 'react';
import '../styles/components/Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-second-container">
          <nav className="navbar-third-container">  
            <div className="logo-section">
              <div className="logo-section-container">
                <a className="logo-link" href="./">
                  <div className="logo-image">
                    <div className="logo-background">
                      <img 
                        decoding="async" 
                        width="119" 
                        height="26" 
                        src="https://framerusercontent.com/images/sS5NeWBM7nxXxiPhqPVXebxzYPE.svg" 
                        alt="Outlier Logo" 
                      />
                    </div>
                  </div>
                </a>  
              </div>
            </div>
            <div className="nav-menu">
              <div className="nav-item">
                <a className="nav-link" href="./blog">
                  <div className="link-text">
                    <p>BLOG</p>
                  </div>
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link" href="./faq">
                  <div className="link-text">
                    <p>FAQ</p>
                  </div>
                </a>
              </div>
              <div className="nav-item">
                <a id="login-button" className="nav-button login" href="https://app.outlier.ai/en/expert/login">
                  <div className="button-text">
                    <p>LOG IN</p>
                  </div>
                </a>
              </div>
              <div className="nav-item">
                <a id="signup-button" className="nav-button cta" href="https://app.outlier.ai/en/expert/jobs">
                  <div className="button-text">
                    <p>VIEW OPPORTUNITIES</p>
                  </div>
                </a>
              </div>
            </div>
            <button 
              id="menu-button"
              className={`nav-menu-button ${isMenuOpen ? 'open' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar; 