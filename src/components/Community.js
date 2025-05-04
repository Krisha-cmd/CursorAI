import React from 'react';
import '../styles/components/Community.css';
import communityLogo from '../Assets/communityLogo.svg';
import overlay1 from '../Assets/overlay1.svg';
import overlay2 from '../Assets/overlay2.svg';

function Community() {
  return (
    <section className="community">
      <div className="community-container">
        <div className="community-content">
          <div className="community-header">
            <div className="community-title">
              <h2>Join a community of innovators</h2>
            </div>
            <div className="community-description">
              <p>Our AI trainers come from all backgrounds and have expertise<br />
              in everything from organic chemistry to creative writing.</p>
            </div>
          </div>
          <div className="community-cta">
            <a href="https://app.outlier.ai/en/expert/jobs" target="_blank" rel="noopener" className="cta-button-community">
              <span>ALL OPPORTUNITIES</span>
              <div className="arrow-icon">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.667 5L12.333 5M12.333 5L8.333 1M12.333 5L8.333 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </a>
          </div>
        
        <div className="community-card-grid">
          <a href="https://app.outlier.ai/en/expert/jobs?type=Generalist" className="community-card-card">
            <div className="community-card-content">
              <div className="community-card-icon">
                <img src={communityLogo} alt="Generalist" />
              </div>
              <div className="community-card-title">
                <h3>Generalist</h3>
              </div>
            </div>
            <div className="community-card-link">
              <span>Learn more</span>
              <div className="arrow-icon">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.667 5L12.333 5M12.333 5L8.333 1M12.333 5L8.333 9" stroke="#9C8FA3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <img src={overlay1} alt="" className="overlay overlay-1" />
            <img src={overlay2} alt="" className="overlay overlay-2" />
          </a>
          <a href="https://app.outlier.ai/en/expert/jobs?type=Math" className="community-card-card">
            <div className="community-card-content">
              <div className="community-card-icon">
                <img src={communityLogo} alt="Math" />
              </div>
              <div className="community-card-title">
                <h3>Math</h3>
              </div>
            </div>
            <div className="community-card-link">
              <span>Learn more</span>
              <div className="arrow-icon">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.667 5L12.333 5M12.333 5L8.333 1M12.333 5L8.333 9" stroke="#9C8FA3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <img src={overlay1} alt="" className="overlay overlay-1" />
            <img src={overlay2} alt="" className="overlay overlay-2" />
          </a>
          <a href="https://app.outlier.ai/en/expert/jobs?type=Chemistry" className="community-card-card">
            <div className="community-card-content">
              <div className="community-card-icon">
                <img src={communityLogo} alt="Chemistry" />
              </div>
              <div className="community-card-title">
                <h3>Chemistry</h3>
              </div>
            </div>
            <div className="community-card-link">
              <span>Learn more</span>
              <div className="arrow-icon">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.667 5L12.333 5M12.333 5L8.333 1M12.333 5L8.333 9" stroke="#9C8FA3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <img src={overlay1} alt="" className="overlay overlay-1" />
            <img src={overlay2} alt="" className="overlay overlay-2" />
          </a>
          <a href="https://app.outlier.ai/en/expert/jobs?type=Law" className="community-card-card">
            <div className="community-card-content">
              <div className="community-card-icon">
                <img src={communityLogo} alt="Law" />
              </div>
              <div className="community-card-title">
                <h3>Law</h3>
              </div>
            </div>
            <div className="community-card-link">
              <span>Learn more</span>
              <div className="arrow-icon">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.667 5L12.333 5M12.333 5L8.333 1M12.333 5L8.333 9" stroke="#9C8FA3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <img src={overlay1} alt="" className="overlay overlay-1" />
            <img src={overlay2} alt="" className="overlay overlay-2" />
          </a>
          <a href="https://app.outlier.ai/en/expert/jobs?type=History" className="community-card-card">
            <div className="community-card-content">
              <div className="community-card-icon">
                <img src={communityLogo} alt="History" />
              </div>
              <div className="community-card-title">
                <h3>History</h3>
              </div>
            </div>
            <div className="community-card-link">
              <span>Learn more</span>
              <div className="arrow-icon">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.667 5L12.333 5M12.333 5L8.333 1M12.333 5L8.333 9" stroke="#9C8FA3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <img src={overlay1} alt="" className="overlay overlay-1" />
            <img src={overlay2} alt="" className="overlay overlay-2" />
          </a>
          <a href="https://app.outlier.ai/en/expert/jobs?type=Coding" className="community-card-card">
            <div className="community-card-content">
              <div className="community-card-icon">
                <img src={communityLogo} alt="Coding" />
              </div>
              <div className="community-card-title">
                <h3>Coding</h3>
              </div>
            </div>
            <div className="community-card-link">
              <span>Learn more</span>
              <div className="arrow-icon">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.667 5L12.333 5M12.333 5L8.333 1M12.333 5L8.333 9" stroke="#9C8FA3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <img src={overlay1} alt="" className="overlay overlay-1" />
            <img src={overlay2} alt="" className="overlay overlay-2" />
          </a>
          <a href="https://app.outlier.ai/en/expert/jobs?type=DataScience" className="community-card-card">
            <div className="community-card-content">
              <div className="community-card-icon">
                <img src={communityLogo} alt="Data Science" />
              </div>
              <div className="community-card-title">
                <h3>Data Science</h3>
              </div>
            </div>
            <div className="community-card-link">
              <span>Learn more</span>
              <div className="arrow-icon">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.667 5L12.333 5M12.333 5L8.333 1M12.333 5L8.333 9" stroke="#9C8FA3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <img src={overlay1} alt="" className="overlay overlay-1" />
            <img src={overlay2} alt="" className="overlay overlay-2" />
          </a>
          <a href="https://app.outlier.ai/en/expert/jobs" className="community-card-card discover">
            <div className="community-card-content">
              <div className="community-card-title">
                <h3>And 30+ other expert domains</h3>
              </div>
            </div>
            <div className="community-card-link">
              <span>Discover</span>
              <div className="arrow-icon">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.667 5L12.333 5M12.333 5L8.333 1M12.333 5L8.333 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
       </a>
        </div>
        </div>
      </div>
    </section>
  );
}

export default Community; 