import React, { useState } from 'react';
import '../styles/components/FAQs.css';

function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      number: "01",
      question: "About Outlier",
      answer: {
        title: "",
        content: [
          "So what is Outlier?",
          "Outlier is a platform that connects subject matter experts to help build the world's most advanced Generative AI.",
          "You will work on a variety of projects from generating training data in your discipline to advance these models to evaluating performance of models."
        ]
      }
    },
    {
      number: "02",
      question: "Getting started",
      answer: {
        sections: [
          {
            title: "What does the onboarding process look like?",
            content: "During onboarding, you will be added to a Squad of like-minded contributors, led by an experienced squad lead. The squad lead will help you onboard and learn about how to successfully contribute to a range of projects.\n\nEach domain's onboarding process looks a little different. Most require you to submit a resume and pass a screening exam to demonstrate your competence in the topic area. Some may require a virtual interview as well."
          },
          {
            title: "Will I get paid for the onboarding process?",
            content: "You will be compensated when you successfully complete the onboarding process.\n\nCompensation may vary depending on the domain area. Please review the details in the job description for specifics."
          },
          {
            title: "How long does the onboarding take?",
            content: "Completing the onboarding modules and the assessment usually takes between 1 and 5 hours.\n\nOnce you have completed the final assessment, you may have to wait for review, but can expect < 48 hour turnaround to get any feedback that is required."
          },
          {
            title: "What is the purpose of Outlier's onboarding?",
            content: "The purpose of our onboarding programs is to equip you with the skills and knowledge to succeed on projects. Training AI models is a very unique process and can take some time to get used to. We want to ensure that you know what to expect before projects and have an understanding of the type of work you may see on Outlier."
          }
        ]
      }
    },
    {
      number: "03",
      question: "Qualifications",
      answer: {
        sections: [
          {
            title: "What qualifications do I need?",
            content: "Candidates should have deep expertise in the domains of focus that they are applying for. Our job descriptions will have more specific details on what would be expected in each domain, but we encourage you to submit your application.",
            list: [
              "Minimum qualifications are usually junior and seniors in undergraduate programs of the domain.",
              "Preferred qualifications are graduate students, masters, and PhD holders of the domain."
            ],
            additional: [
              "We also expect all candidates to have a strong understanding of written English and clear communication skills.",
              "Passion and commitment to be part of an exciting journey to help build the next generation of Generative AIs."
            ]
          },
          {
            title: "What is your selection process? How are resumes evaluated?",
            content: "We evaluate your resume and identify if you meet the minimum qualifications for a domain and associated pay rate. These qualifications are listed in any given job description."
          },
          {
            title: "Can I bring some friends too?",
            content: "Of course! We want to give everyone the opportunity to build together the new generation of AI models. Everyone is more than welcome to apply.\n\nTo refer candidates within your domain of expertise who are good fits for your project, please contact your team lead."
          }
        ]
      }
    },
    {
      number: "04",
      question: "Pay",
      answer: {
        sections: [
          {
            title: "How much will I be paid?",
            content: "Competitive rates are set based on the domain of focus and your qualifications."
          },
          {
            title: "How will I be paid?",
            content: "You will be paid out weekly via your preferred option between PayPal and AirTM."
          },
          {
            title: "Are there opportunities to earn more?",
            content: "Some domains may offer rewards for completing onboarding programs, or higher rates for superior performance!"
          }
        ]
      }
    },
    {
      number: "05",
      question: "Hours",
      answer: {
        sections: [
          {
            title: "How much time should I expect to work?",
            content: "Outlier is very flexible! We have some contributors working ~5-10 hrs/week and some who work 40 hrs/week as their schedule allows.\nYou will earn based on how many hours you contribute throughout the week, which is up to you as there is no minimum or maximum amount of hours that need to be worked."
          },
          {
            title: "Can I do this work in addition to another part-time or full-time opportunity?",
            content: "Absolutely! Contributors are independent contractors who can choose how many hours they want to work a week."
          },
          {
            title: "How long will this opportunity last?",
            content: "Our projects have varying lengths, depending on the need of the AI models you'd be working on. After completing a project, our contributors will have the opportunity to work on additional projects."
          }
        ]
      }
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderAnswer = (answer) => {
    if (answer.sections) {
      return (
        <div className="faq-answer-content">
          {answer.sections.map((section, index) => (
            <div key={index} className="faq-answer-section">
              <h3 className="faq-answer-title">{section.title}</h3>
              <p className="faq-answer-text">{section.content}</p>
              {section.list && (
                <ul className="faq-answer-list">
                  {section.list.map((item, i) => (
                    <li key={i} className="faq-answer-list-item">{item}</li>
                  ))}
                </ul>
              )}
              {section.additional && section.additional.map((text, i) => (
                <p key={i} className="faq-answer-text">{text}</p>
              ))}
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="faq-answer-content">
        <h3 className="faq-answer-title">{answer.title}</h3>
        {answer.content.map((text, index) => (
          <p key={index} className="faq-answer-text">{text}</p>
        ))}
      </div>
    );
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <div className="faq-header">
          <div className="faq-title-wrapper">
            <h1 className="faq-title">FAQs</h1>
          </div>
          <div className="faq-see-all-container">
            <a href="./faq" className="faq-see-all-button">
              <div className="faq-see-all-border">
                <div className="faq-see-all-text">SEE ALL</div>
              </div>
            </a>
          </div>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-number">{faq.number}</div>
              <div 
                className={`faq-question-container ${activeIndex === index ? 'active' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question-wrapper">
                  <div className="faq-question-content">
                    <p className="faq-question-text">{faq.question}</p>
                  </div>
                  <div className="faq-chevron" style={{ transform: activeIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <svg viewBox="0 0 14 9" width="14" height="9">
                      <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                </div>
                <div className="faq-answer">
                  {renderAnswer(faq.answer)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQs; 