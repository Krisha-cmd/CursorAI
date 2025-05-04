import React from 'react';
import '../styles/components/FAQs.css';

function FAQs() {
  const faqs = [
    {
      number: "01",
      question: "About Outlier",
      answer: "Outlier is a platform for experts to contribute to AI training and get paid for their expertise."
    },
    {
      number: "02",
      question: "Getting started",
      answer: "Sign up, complete your profile, and start applying for opportunities that match your skills."
    },
    {
      number: "03",
      question: "Qualifications",
      answer: "We welcome experts from all backgrounds. Some roles may require specific experience or credentials."
    },
    {
      number: "04",
      question: "Pay",
      answer: "Pay varies by assignment and expertise. All payments are processed securely."
    },
    {
      number: "05",
      question: "Hours",
      answer: "You set your own hours and work as much or as little as you want."
    }
  ];

  return (
    <section className="faq">
      <div className="faq-container">
        <div className="faq-left">
          <h2 className="faq-title">FAQs</h2>
          <button className="faq-seeall">SEE ALL</button>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-q">
                <span>{faq.number}</span> {faq.question} <span className="faq-arrow">&#9660;</span>
              </div>
              <div className="faq-a">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQs; 