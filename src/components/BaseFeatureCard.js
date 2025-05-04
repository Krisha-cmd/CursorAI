import React from 'react';
import '../styles/components/BaseFeatureCard.css';
import featureLogo from '../Assets/featureLogo.svg';
import featureMenu from '../Assets/featurepayment.svg';

function BaseFeatureCard({ title, description, logo = 'featureLogo' }) {
  const logos = {
    featureLogo: featureLogo,
    featureMenu: featureMenu
  };

  const heights = {
    featureLogo: {
      content: '62px',
      footer: '140px'
    },
    featureMenu: {
      content: '41px',
      footer: '170px'
    }
  };

  return (
    <div className="base-feature-card">
      <div className="base-feature-content" style={{ height: heights[logo].content }}>
        <div className="base-feature-header">
          <img src={logos[logo]} alt="feature logo" className="feature-icon" />
          <p id="feature-image-title">{title}</p>
        </div>
        <p id="feature-image-description">{description}</p>
      </div>
      <div className="base-feature-footer" style={{ height: heights[logo].footer }}></div>
    </div>
  );
}

export default BaseFeatureCard; 