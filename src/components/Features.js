import React, { useEffect, useRef } from 'react';
import '../styles/components/Features.css';
import ResponseCards from './ResponseCards';
import baseFeature from '../Assets/baseFeature.svg';
import BaseFeatureCard from './BaseFeatureCard';
import FeatureCardWithSVGs from './FeatureCardWithSVGs';
import feature2 from '../Assets/feature2.png';

function Features() {
  const featureRefs = useRef([]);
  const lastScrollY = useRef(window.scrollY);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentScrollY = window.scrollY;
          const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
          
          // If scrolling down, always play animation
          if (entry.isIntersecting && currentScrollY > lastScrollY.current) {
            // Remove the class first
            entry.target.classList.remove('visible');
            // Add a small delay before adding the class back
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, 50);
          }
          // If scrolling up, just make it visible without animation
          else if (entry.isIntersecting && currentScrollY < lastScrollY.current) {
            entry.target.classList.add('visible');
          }
          // If scrolled above the section, hide the element
          else if (currentScrollY < sectionTop - 100) {
            entry.target.classList.remove('visible');
          }
        });
        lastScrollY.current = window.scrollY;
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    // Observe all feature-image-base elements
    featureRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      // Cleanup observer on component unmount
      featureRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <section className="features" id="features" ref={sectionRef}>
      <h2 className="section-title">Share your expertise and get paid<br />working where and when you want</h2>
      <div className="feature-cards">
        <div className="feature-card">
          <div className="feature-image">
            <div className="feature-image-base" ref={el => featureRefs.current[0] = el}>
              <img src={baseFeature} alt="base feature" />
              <BaseFeatureCard 
                title="Select the best response"
                description="Select the best response from the options."
                logo="featureLogo"
              />
              <ResponseCards />
            </div>
          </div>
          <h3>Share your</h3>
          <h3>knowledge</h3>
          <p>Everyone's an expert at something.<br/>
Share your expertise and help make AI more human.</p>
        </div>
        <div className="feature-card">
          <div className="feature-image">
            <div className="feature-image-base" ref={el => featureRefs.current[1] = el}>
              <img src={baseFeature} alt="base feature" />
              <img id="feature2" src={feature2} alt="" />
            </div>
          </div>
          <h3>Connect with<br/> fellow experts</h3>
          <p>Join our community to work alongside like-minded experts in your domain.</p><p></p>
        </div>
        <div className="feature-card">
          <div className="feature-image">
            <div className="feature-image-base" ref={el => featureRefs.current[2] = el}>
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