import React from 'react';
import '../styles/components/ResponseCards.css';
import featureMenu from '../Assets/feature menu.svg';

function ResponseCards() {
  return (
    <div className="response-cards-container">
      <div className="response-card">
        <div className="response-header">
          <div className="response-title">
            <p>Response A</p>
          </div>
          <div className="menu-icon-button">
            <img src={featureMenu} alt="menu"/>
          </div>
        </div>
        <div className="skeletons">
          <div className="skeleton"></div>
          <div className="skeleton"></div>
          <div className="skeleton"></div>
          <div className="skeleton"></div>
          <div className="skeleton"></div>
        </div>
      </div>
      <div className="response-card">
        <div className="response-header">
          <div className="response-title">
            <p>Response B</p>
          </div>
          <div className="menu-icon-button">
            <img src={featureMenu} alt="menu" width="14" height="14" />
          </div>
        </div>
        <div className="skeletons">
          <div className="skeleton"></div>
          <div className="skeleton"></div>
          <div className="skeleton"></div>
          <div className="skeleton"></div>
          <div className="skeleton"></div>
        </div>
      </div>
    </div>
  );
}

export default ResponseCards; 