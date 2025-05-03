import React from 'react';
import './App.css';

function App() {
  return (
    <div className="outlier-hero-bg">
      {/* Navbar - Pixel Perfect */}
      <nav className="outlier-navbar-pixel">
        <div className="outlier-logo-pixel">
          {/* Outlier SVG Logo */}
          <img src="https://framerusercontent.com/images/sS5NeWBM7nxXxiPhqPVXebxzYPE.svg" alt="Outlier Logo" className="outlier-logo-svg" width="350" height="32" />
        </div>
        <div className="outlier-navlinks-pixel">
          <a href="#blog">BLOG</a>
          <a href="#faq">FAQ</a>
          <a href="#login" className="outlier-login-btn-pixel">LOG IN</a>
          <a href="#opportunities" className="outlier-cta-btn-pixel">VIEW OPPORTUNITIES</a>
        </div>
      </nav>

      {/* Hero Section - Pixel Perfect */}
      <section className="outlier-hero-section-pixel">
        <div className="outlier-hero-left-pixel">
          <h1 className="outlier-hero-title-pixel">
            Shape the Next<br />Generation of AI<br />with your Expertise
          </h1>
          <div className="outlier-hero-actions-pixel">
            <a href="#opportunities" className="outlier-cta-btn-pixel large">VIEW OPPORTUNITIES</a>
            <span className="outlier-hero-subtext-pixel">Get paid training cutting-edge AI on your own schedule</span>
          </div>
        </div>
        <div className="outlier-hero-right-pixel">
          <div className="outlier-hero-image-container-pixel">
            <img src="https://framerusercontent.com/images/8QTpoCuziu04ZWLyREiJkAXHbU.png?scale-down-to=1024&lossless=1" alt="Expert" className="outlier-hero-image-pixel" />
            {/* Floating Stat Cards */}
            <div className="outlier-stat-card-pixel outlier-stat-experts-pixel">
              <div className="outlier-stat-number-pixel">40 000</div>
              <div className="outlier-stat-label-pixel">Experts</div>
              <div className="outlier-stat-avatars-pixel">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="outlier-avatar-pixel" />
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar" className="outlier-avatar-pixel" />
              </div>
            </div>
            <div className="outlier-stat-card-pixel outlier-stat-paid-pixel">
              <div className="outlier-stat-number-pixel">$100M</div>
              <div className="outlier-stat-label-pixel">Paid out</div>
            </div>
            <div className="outlier-stat-card-pixel outlier-stat-assignments-pixel">
              <div className="outlier-stat-number-pixel">3.4M</div>
              <div className="outlier-stat-label-pixel">Assignments</div>
            </div>
            {/* Vertical Icon Buttons - SVG Placeholders */}
            <div className="outlier-hero-icons-pixel">
              <button className="outlier-icon-btn-pixel" title="Writing"><svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="12" fill="#F3E8FF"/><path d="M7 17l10-10M7 17h3.5M7 17v-3.5" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round"/></svg></button>
              <button className="outlier-icon-btn-pixel" title="Network"><svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="12" fill="#F3E8FF"/><path d="M8 12h8M12 8v8" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round"/></svg></button>
              <button className="outlier-icon-btn-pixel" title="Lab"><svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="12" fill="#F3E8FF"/><path d="M8 8l8 8M8 16l8-8" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round"/></svg></button>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="outlier-expertise-section">
        <h2 className="outlier-expertise-title">Share your expertise and get paid<br />working where and when you want</h2>
        <div className="outlier-expertise-cards">
          <div className="outlier-expertise-card">
            <div className="outlier-expertise-imgwrap">
              <img src="https://placehold.co/300x200?text=Select+the+best+response" alt="Select the best response" />
            </div>
            <h3>Share your knowledge</h3>
            <p>Everyone's an expert at something. Share your expertise and help make AI more human.</p>
          </div>
          <div className="outlier-expertise-card">
            <div className="outlier-expertise-imgwrap">
              <img src="https://placehold.co/300x200?text=Connect+with+experts" alt="Connect with experts" />
            </div>
            <h3>Connect with fellow experts</h3>
            <p>Join our community to work alongside like-minded experts in your domain.</p>
          </div>
          <div className="outlier-expertise-card">
            <div className="outlier-expertise-imgwrap">
              <img src="https://placehold.co/300x200?text=Earnings" alt="Earnings" />
            </div>
            <h3>Get paid on your terms</h3>
            <p>Earn competitive pay while enjoying the flexibility to work where and when you want.</p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="outlier-community-section">
        <div className="outlier-community-header">
          <h2 className="outlier-community-title">Join a community of innovators</h2>
          <p className="outlier-community-subtitle">Our AI trainers come from all backgrounds and have expertise in everything from organic chemistry to creative writing.</p>
          <a href="#opportunities" className="outlier-community-cta">ALL OPPORTUNITIES &rarr;</a>
        </div>
        <div className="outlier-community-grid">
          <div className="outlier-community-card"><span className="outlier-community-icon">🧬</span>Generalist<div className="outlier-community-link">Learn more &rarr;</div></div>
          <div className="outlier-community-card"><span className="outlier-community-icon">➗</span>Math<div className="outlier-community-link">Learn more &rarr;</div></div>
          <div className="outlier-community-card"><span className="outlier-community-icon">⚗️</span>Chemistry<div className="outlier-community-link">Learn more &rarr;</div></div>
          <div className="outlier-community-card"><span className="outlier-community-icon">⚖️</span>Law<div className="outlier-community-link">Learn more &rarr;</div></div>
          <div className="outlier-community-card"><span className="outlier-community-icon">📜</span>History<div className="outlier-community-link">Learn more &rarr;</div></div>
          <div className="outlier-community-card"><span className="outlier-community-icon">💻</span>Coding<div className="outlier-community-link">Learn more &rarr;</div></div>
          <div className="outlier-community-card"><span className="outlier-community-icon">📊</span>Data Science<div className="outlier-community-link">Learn more &rarr;</div></div>
          <div className="outlier-community-card outlier-community-card-special">And 30+ other expert domains<div className="outlier-community-link">Discover &rarr;</div></div>
        </div>
      </section>

      {/* Craft Section */}
      <section className="outlier-craft-section">
        <div className="outlier-craft-header">
          <h2 className="outlier-craft-title">Building great AI is a craft</h2>
          <p className="outlier-craft-subtitle">AI training is never boring. Create your account and try a sample task in your area of expertise</p>
        </div>
        <div className="outlier-craft-content">
          <div className="outlier-craft-left">
            <div className="outlier-craft-card outlier-craft-card-active">
              <div className="outlier-craft-card-icon">🏅</div>
              <div>
                <div className="outlier-craft-card-title">Rating & ranking</div>
                <div className="outlier-craft-card-desc">Rating or ranking assignments ask contributors to identify the best model responses out of two or more options until the content is high quality enough to be accepted in a review process. Contributors may also be asked to justify their selection in relation to specific criteria or factors.</div>
              </div>
            </div>
            <div className="outlier-craft-card">Open rewrite</div>
            <div className="outlier-craft-card">Multi-modal</div>
          </div>
          <div className="outlier-craft-right">
            <img src="https://placehold.co/500x320?text=AI+Task+Illustration" alt="AI Task Illustration" className="outlier-craft-illustration" />
          </div>
        </div>
        <div className="outlier-craft-callout">
          <div className="outlier-craft-callout-icon">✨</div>
          <div className="outlier-craft-callout-content">
            <div className="outlier-craft-callout-title">AI training is never boring!</div>
            <div className="outlier-craft-callout-desc">Apply for an opportunity in your area of expertise</div>
          </div>
          <a href="#opportunities" className="outlier-craft-callout-btn">VIEW OPPORTUNITIES</a>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="outlier-testimonials-section">
        <h2 className="outlier-testimonials-title">
          <span className="outlier-testimonials-highlight">Meet the experts</span> helping<br />develop safe and beneficial AI<br />across multiple disciplines
        </h2>
        <div className="outlier-testimonials-grid">
          <div className="outlier-testimonial-card">
            <div className="outlier-testimonial-quote">The flexibility is absolutely amazing and I really enjoy it. It was a blessing having this kind of freedom for the first time.</div>
            <div className="outlier-testimonial-user">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Martin M." className="outlier-testimonial-avatar" />
              <div>
                <div className="outlier-testimonial-name">Martin M.</div>
                <div className="outlier-testimonial-field">History</div>
              </div>
            </div>
          </div>
          <div className="outlier-testimonial-card">
            <div className="outlier-testimonial-quote">As an educator, you have to take an individual approach with each student. Training AI is engaging for me because I'm using that same creativity.</div>
            <div className="outlier-testimonial-user">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Gabriela S." className="outlier-testimonial-avatar" />
              <div>
                <div className="outlier-testimonial-name">Gabriela S.</div>
                <div className="outlier-testimonial-field">Psychology & Education</div>
              </div>
            </div>
          </div>
          <div className="outlier-testimonial-card">
            <div className="outlier-testimonial-quote">The work itself is fun. I'm learning about such a broad variety of topics because every time you see a task, you learn something new.</div>
            <div className="outlier-testimonial-user">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Daliah B." className="outlier-testimonial-avatar" />
              <div>
                <div className="outlier-testimonial-name">Daliah B.</div>
                <div className="outlier-testimonial-field">German</div>
              </div>
            </div>
          </div>
          <div className="outlier-testimonial-card">
            <div className="outlier-testimonial-quote">I can work anytime from anywhere. After only one month, I made around $2,000 from working on projects.</div>
            <div className="outlier-testimonial-user">
              <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Hamed H." className="outlier-testimonial-avatar" />
              <div>
                <div className="outlier-testimonial-name">Hamed H.</div>
                <div className="outlier-testimonial-field">Arabic</div>
              </div>
            </div>
          </div>
          <div className="outlier-testimonial-card">
            <div className="outlier-testimonial-quote">I've worked on other platforms, but there is absolutely no support available. At Outlier, you're really getting into an online community.</div>
            <div className="outlier-testimonial-user">
              <img src="https://randomuser.me/api/portraits/men/12.jpg" alt="Scott O." className="outlier-testimonial-avatar" />
              <div>
                <div className="outlier-testimonial-name">Scott O.</div>
                <div className="outlier-testimonial-field">Generalist</div>
              </div>
            </div>
          </div>
          <div className="outlier-testimonial-card">
            <div className="outlier-testimonial-quote">Working remotely has given me the ability to strike the perfect balance between nurturing my family and pursuing professional goals.</div>
            <div className="outlier-testimonial-user">
              <img src="https://randomuser.me/api/portraits/women/22.jpg" alt="Casey R." className="outlier-testimonial-avatar" />
              <div>
                <div className="outlier-testimonial-name">Casey R.</div>
                <div className="outlier-testimonial-field">Generalist</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="outlier-faq-section">
        <div className="outlier-faq-container">
          <div className="outlier-faq-left">
            <h2 className="outlier-faq-title">FAQs</h2>
            <button className="outlier-faq-seeall">SEE ALL</button>
          </div>
          <div className="outlier-faq-list">
            <div className="outlier-faq-item">
              <div className="outlier-faq-q"><span>01</span> About Outlier <span className="outlier-faq-arrow">&#9660;</span></div>
              <div className="outlier-faq-a">Outlier is a platform for experts to contribute to AI training and get paid for their expertise.</div>
            </div>
            <div className="outlier-faq-item">
              <div className="outlier-faq-q"><span>02</span> Getting started <span className="outlier-faq-arrow">&#9660;</span></div>
              <div className="outlier-faq-a">Sign up, complete your profile, and start applying for opportunities that match your skills.</div>
            </div>
            <div className="outlier-faq-item">
              <div className="outlier-faq-q"><span>03</span> Qualifications <span className="outlier-faq-arrow">&#9660;</span></div>
              <div className="outlier-faq-a">We welcome experts from all backgrounds. Some roles may require specific experience or credentials.</div>
            </div>
            <div className="outlier-faq-item">
              <div className="outlier-faq-q"><span>04</span> Pay <span className="outlier-faq-arrow">&#9660;</span></div>
              <div className="outlier-faq-a">Pay varies by assignment and expertise. All payments are processed securely.</div>
            </div>
            <div className="outlier-faq-item">
              <div className="outlier-faq-q"><span>05</span> Hours <span className="outlier-faq-arrow">&#9660;</span></div>
              <div className="outlier-faq-a">You set your own hours and work as much or as little as you want.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;