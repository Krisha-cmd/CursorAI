import React from 'react';
import '../styles/components/Footer.css';

function Footer() {
  return (
    <div className="footer-section">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-background">
            <img 
              src="https://framerusercontent.com/images/4eQLWXrGRtbCqZf16YhdA27s2s.png" 
              alt="Footer background"
              className="footer-image"
            />
          </div>
          <div className="footer-overlay">
            <div className="footer-text-container">
              <p className="footer-title">
                Join us in making a lasting impact on AI
              </p>
            </div>
            <div className="footer-button-container">
              <a 
                href="https://app.outlier.ai/en/expert/jobs?ajs=dfe4435f-81cc-416f-b189-7cf8c646d90e" 
                className="footer-button"
                target="_blank"
                rel="noopener"
              >
                <div className="footer-button-content">
                  <p className="footer-button-text">VIEW OPPORTUNITIES</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="footer-copyright">
            <p>© 2024 Smart Ecosystems. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <div className="footer-links-column">
              <a href="https://outlier.ai/legal/terms-of-use" className="footer-link">Terms of Use</a>
              <a href="https://outlier.ai/legal/community-guidelines" className="footer-link">Community Guidelines</a>
            </div>
            <div className="footer-links-column">
              <a href="https://outlier.ai/legal/privacy-policy" className="footer-link">Privacy Policy</a>
              <a href="https://outlier.ai/legal/working-location-policy" className="footer-link">Working location policy</a>
            </div>
            <div className="footer-links-column">
              <a href="https://outlier.ai/legal/cookies-policy" className="footer-link">Cookies Policy</a>
              <a href="https://outlier.ai/legal/data-processing-addendum" className="footer-link" target="_blank" rel="noopener">Data Processing Addendum</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer; 