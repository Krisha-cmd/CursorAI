import React from 'react';
import '../styles/components/Features.css';

function Features() {
  return (
    <section className="features">
      <h2 className="section-title">Share your expertise and get paid<br />working where and when you want</h2>
      <div className="feature-cards">
        <div className="feature-card">
          <div className="feature-image">
            <img src="https://placehold.co/300x200?text=Select+the+best+response" alt="Select the best response" />
          </div>
          <h3>Share your knowledge</h3>
          <p>Everyone's an expert at something. Share your expertise and help make AI more human.</p>
        </div>
        <div className="feature-card">
          <div className="feature-image">
            <img src="https://placehold.co/300x200?text=Connect+with+experts" alt="Connect with experts" />
          </div>
          <h3>Connect with fellow experts</h3>
          <p>Join our community to work alongside like-minded experts in your domain.</p>
        </div>
        <div className="feature-card">
          <div className="feature-image">
            <img src="https://placehold.co/300x200?text=Earnings" alt="Earnings" />
          </div>
          <h3>Get paid on your terms</h3>
          <p>Earn competitive pay while enjoying the flexibility to work where and when you want.</p>
        </div>
      </div>
    </section>
  );
}

export default Features; 