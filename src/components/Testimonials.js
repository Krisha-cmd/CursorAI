import React from 'react';
import '../styles/components/Testimonials.css';

function Testimonials() {
  const testimonials = [
    {
      quote: "The flexibility is absolutely amazing and I really enjoy it. It was a blessing having this kind of freedom for the first time.",
      name: "Martin M.",
      field: "History",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "As an educator, you have to take an individual approach with each student. Training AI is engaging for me because I'm using that same creativity.",
      name: "Gabriela S.",
      field: "Psychology & Education",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "The work itself is fun. I'm learning about such a broad variety of topics because every time you see a task, you learn something new.",
      name: "Daliah B.",
      field: "German",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  return (
    <section className="testimonials">
      <h2 className="testimonials-title">
        <span className="testimonials-highlight">Meet the experts</span> helping<br />develop safe and beneficial AI<br />across multiple disciplines
      </h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-quote">{testimonial.quote}</div>
            <div className="testimonial-user">
              <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
              <div>
                <div className="testimonial-name">{testimonial.name}</div>
                <div className="testimonial-field">{testimonial.field}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials; 