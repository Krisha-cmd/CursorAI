import React from 'react';
import '../styles/components/Community.css';

function Community() {
  return (
    <section className="community">
      <div className="community-header">
        <h2 className="community-title">Join a community of innovators</h2>
        <p className="community-subtitle">Our AI trainers come from all backgrounds and have expertise in everything from organic chemistry to creative writing.</p>
        <a href="#opportunities" className="community-cta">ALL OPPORTUNITIES &rarr;</a>
      </div>
      <div className="community-grid">
        <div className="community-card"><span className="community-icon">🧬</span>Generalist<div className="community-link">Learn more &rarr;</div></div>
        <div className="community-card"><span className="community-icon">➗</span>Math<div className="community-link">Learn more &rarr;</div></div>
        <div className="community-card"><span className="community-icon">⚗️</span>Chemistry<div className="community-link">Learn more &rarr;</div></div>
        <div className="community-card"><span className="community-icon">⚖️</span>Law<div className="community-link">Learn more &rarr;</div></div>
        <div className="community-card"><span className="community-icon">📜</span>History<div className="community-link">Learn more &rarr;</div></div>
        <div className="community-card"><span className="community-icon">💻</span>Coding<div className="community-link">Learn more &rarr;</div></div>
        <div className="community-card"><span className="community-icon">📊</span>Data Science<div className="community-link">Learn more &rarr;</div></div>
        <div className="community-card community-card-special">And 30+ other expert domains<div className="community-link">Discover &rarr;</div></div>
      </div>
    </section>
  );
}

export default Community; 