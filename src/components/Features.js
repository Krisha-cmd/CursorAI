import React from 'react';
import '../styles/components/Features.css';
import ResponseCards from './ResponseCards';
import baseFeature from '../Assets/baseFeature.svg';
import BaseFeatureCard from './BaseFeatureCard';
import FeatureCardWithSVGs from './FeatureCardWithSVGs';
import feature2 from '../Assets/feature2.png';

function Features() {
  return (
    <section className="features">
      <h2 className="section-title">Share your expertise and get paid<br />working where and when you want</h2>
      <div className="feature-cards">
        <div className="feature-card">
          <div className="feature-image">
            <div className="feature-image-base">
              <img src={baseFeature} alt="base feature" />
              <BaseFeatureCard 
                title="Select the best response"
                description="Select the best response from the options."
              />
            </div>
            <ResponseCards />
          </div>
          <h3>Share your</h3>
          <h3>knowledge</h3>
          <p>Everyone's an expert at something.<br/>
Share your expertise and help make AI more human.</p>
        </div>
        <div className="feature-card">
          <div className="feature-image">
            <div className="feature-image-base">
              <img src={baseFeature} alt="base feature" />
              <img id="feature2" src={feature2} alt="" />
            </div>
          </div>
          <h3>Connect with<br/> fellow experts</h3>
          <p>Join our community to work alongside like-minded experts in your domain.</p><p></p>
        </div>
        <div className="feature-card">
          <div className="feature-image">
            <div className="feature-image-base">
              <img src={baseFeature} alt="base feature" />
              <BaseFeatureCard 
                title="My earnings"
                description=""
                logo="featureMenu"
              />
              <FeatureCardWithSVGs/>
            </div>
          </div>
          <h3>Get paid on your <br/>terms</h3>
          <p>Earn competitive pay while enjoying the flexibility to work where and when you want.</p><p></p>
        </div>
      </div>
    </section>
  );
}

export default Features; 