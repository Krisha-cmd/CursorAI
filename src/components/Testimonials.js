import React from 'react';
import '../styles/components/Testimonials.css';

function Testimonials() {
  const testimonials = [
    {
      quote: "The flexibility is absolutely amazing and I really enjoy it. It was a blessing having this kind of freedom for the first time.",
      name: "Martin M.",
      field: "History",
      avatar: "https://framerusercontent.com/images/M4m16FAzIWFyfIUGnqkXHOtI.jpg"
    },
    {
      quote: "As an educator, you have to take an individual approach with each student. Training AI is engaging for me because I'm using that same creativity.",
      name: "Gabriela S.",
      field: "Psychology & Education",
      avatar: "https://framerusercontent.com/images/fn4Mhmfl5gVdW2KvEB5Z9aSHQGk.jpg"
    },
    {
      quote: "The work itself is fun. I'm learning about such a broad variety of topics because every time you see a task, you learn something new. I just learned some cool Swiss recipes for apple fritters.",
      name: "Daliah B.",
      field: "German",
      avatar: "https://framerusercontent.com/images/YWmc9rrVuAAUktdkWZTUAvTQ1ic.jpg"
    },
    {
      quote: "I can work anytime from anywhere. After only one month, I made around $2,000 from working on projects.",
      name: "Hamed H.",
      field: "Arabic",
      avatar: "https://framerusercontent.com/images/Rb2xAEcIxsKdk4tofxQVtcvn8lc.jpg"
    },
    {
      quote: "I've worked on other platforms, but there is absolutely no support available. At Outlier, you're really getting into an online community.",
      name: "Scott O.",
      field: "Generalist",
      avatar: "https://framerusercontent.com/images/ZRIwJq0PnzRc52tan355lxz0ZOI.jpg"
    },
    {
      quote: "Working remotely has given me the ability to strike the perfect balance between nurturing my family and pursuing professional goals.",
      name: "Casey R.",
      field: "Generalist",
      avatar: "https://framerusercontent.com/images/gkOGW38vYErd0AUtJh4TN9XstE.png"
    }
  ];

  return (
    <div className="testimonials-container">
      <div className="testimonials-heading-content">
        <div className="testimonials-title-wrapper">
          <h1 className="testimonials-title">
            <span className="testimonials-title-highlight">Meet the experts</span> helping<br />
            develop safe and beneficial AI<br />
            across multiple disciplines
          </h1>
        </div>
      </div>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonials-card">
            <div className="testimonials-quote-wrapper">
              <p className="testimonials-quote">{testimonial.quote}</p>
            </div>
            <div className="testimonials-user-wrapper">
              <div className="testimonials-avatar-container">
                <div className="testimonials-avatar-border">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="testimonials-avatar"
                  />
                </div>
              </div>
              <div className="testimonials-user-info">
                <p className="testimonials-user-name">{testimonial.name}</p>
                <p className="testimonials-user-field">{testimonial.field}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials; 