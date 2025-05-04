import React from 'react';
import '../styles/components/FeatureCardWithSVGs.css';
import BaseFeatureCard from './BaseFeatureCard';
import svg1573 from '../Assets/1573.svg';
import svg2587 from '../Assets/2587.svg';

function FeatureCardWithSVGs({ title, description, logo = 'featureLogo' }) {
  return (
    <div className="feature-card-container">
            <div id="svgContainer-1">
              <img src={svg2587} alt="card1" style={{ width: '100%', height: '100%' }} />
            </div>
            <div className='feature-card-svg-container'>
            <div className="svgContainer">
              <img src={svg1573} alt="card2" style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="svgContainer">
              <img src={svg1573} alt="card3" style={{ width: '100%', height: '100%' }} />
            </div>
            </div>
    </div>
  );
}

export default FeatureCardWithSVGs; 