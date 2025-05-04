import React from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Community from './components/Community';
import Craft from './components/Craft';
import Testimonials from './components/Testimonials';
import FAQs from './components/FAQs';
import Footer from './components/Footer';
import svg1 from './Assets/svg.svg';
import svg2 from './Assets/svg2.svg';

function App() {
  return (
    <div className="landing-page">
      <Navbar />
      
      <img className="blob-colour" src={svg1} alt="" />
      <div className="blob-container">
        
        <div className="blob" >
          
          <div className="svgContainer">
            <img src={svg2} alt="" />
          </div>
        </div>
      </div>
      <Hero />
      <Features />
      <Community />
      <Craft />
      <Testimonials />
      <FAQs />
      <Footer />
    </div>
  );
}

export default App;