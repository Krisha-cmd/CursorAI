import React from 'react';
import '../styles/components/Hero.css';
import ava1 from '../Assets/ava1.png';
import ava2 from '../Assets/ava2.png';
import ava3 from '../Assets/ava3.png';
import gitIcon from '../Assets/git.svg';
import labIcon from '../Assets/lab.svg';
import penIcon from '../Assets/pen.svg';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Shape the Next<br />Generation of AI<br />with your Expertise
        </h1>
        <div className="hero-actions">
          <a href="#opportunities" className="cta-button large">VIEW OPPORTUNITIES</a>
          <span className="hero-subtext">Get paid training cutting-edge AI on your own schedule</span>
        </div>
      </div>
      <div className="hero-image-section">
        <div className="hero-image-container">
          <img src="https://framerusercontent.com/images/8QTpoCuziu04ZWLyREiJkAXHbU.png" alt="Expert" className="hero-image" />
          {/* Stats Cards */}
          <div className="stat-card experts">
            <div className="stat-number">40 000</div>
            <div className="stat-label">Experts</div>
            <div className="stat-avatars">
              <img src={ava1} alt="avatar" className="avatar" id="avatar-1" />
              <img src={ava2} alt="avatar" className="avatar" id="avatar-2" />
              <img src={ava3} alt="avatar" className="avatar" id="avatar-3" />
            </div>
          </div>
          <div className="stat-card paid">
            <div className="stat-number">$100M</div>
            <div className="stat-label">Paid out</div>
          </div>
          <div className="stat-card assignments">
            <div className="stat-number">3.4M</div>
            <div className="stat-label">Assignments</div>
          </div>
          {/* Action Icons */}
          <div className="action-icons">
            <button className="icon-button" title="Writing">
              <img src={penIcon} alt="Writing" width="24" height="24" />
            </button>
            <button className="icon-button" title="Network">
              <img src={gitIcon} alt="Network" width="24" height="24" />
            </button>
            <button className="icon-button" title="Lab">
              <img src={labIcon} alt="Lab" width="24" height="24" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero; 