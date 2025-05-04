import React from 'react';
import '../styles/components/Craft.css';

function Craft() {
  return (
    <section className="craft">
      <div className="craft-header">
        <h2 className="craft-title">Building great AI is a craft</h2>
        <p className="craft-subtitle">AI training is never boring. Create your account and try a sample task in your area of expertise</p>
      </div>
      <div className="craft-content">
        <div className="craft-left">
          <div className="craft-card craft-card-active">
            <div className="craft-card-icon">🏅</div>
            <div>
              <div className="craft-card-title">Rating & ranking</div>
              <div className="craft-card-desc">Rating or ranking assignments ask contributors to identify the best model responses out of two or more options until the content is high quality enough to be accepted in a review process. Contributors may also be asked to justify their selection in relation to specific criteria or factors.</div>
            </div>
          </div>
          <div className="craft-card">Open rewrite</div>
          <div className="craft-card">Multi-modal</div>
        </div>
        <div className="craft-right">
          <img src="https://placehold.co/500x320?text=AI+Task+Illustration" alt="AI Task Illustration" className="craft-illustration" />
        </div>
      </div>
      <div className="craft-callout">
        <div className="craft-callout-icon">✨</div>
        <div className="craft-callout-content">
          <div className="craft-callout-title">AI training is never boring!</div>
          <div className="craft-callout-desc">Apply for an opportunity in your area of expertise</div>
        </div>
        <a href="#opportunities" className="craft-callout-btn">VIEW OPPORTUNITIES</a>
      </div>
    </section>
  );
}

export default Craft; 