// src/components/landing/FAQ.jsx
import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const { darkMode } = useTheme();
  const [expandedFaq, setExpandedFaq] = useState(0);

  const faqs = [
    {
      question: "Who can access ZidTask?",
      answer: "ZidTask is designed for teams of all sizes. Anyone with an account can access the platform and start managing their tasks efficiently."
    },
    {
      question: "How to sign up for ZidTask?",
      answer: "Simply click on the 'Get Started' button, fill in your details, and you'll be ready to create your first board in minutes."
    },
    {
      question: "Can I use it on my mobile?",
      answer: "Yes! ZidTask is fully responsive and works seamlessly on all devices including mobile phones and tablets."
    },
    {
      question: "How to change my projects?",
      answer: "Navigate to your dashboard, select the project you want to modify, and click on the settings icon to make changes."
    },
    {
      question: "Will I get a notification for closed?",
      answer: "Yes, you'll receive real-time notifications for all important updates including when tasks are closed or completed."
    },
    {
      question: "What about our marketing team role?",
      answer: "Marketing teams can use custom boards, labels, and workflows specifically designed for campaign management and content planning."
    }
  ];

  return (
    <section id="faq" style={{ 
      padding: '80px 0', 
      background: darkMode ? 'rgba(30, 64, 175, 0.05)' : 'rgba(219, 234, 254, 0.2)' 
    }}>
      <div className="container">
        <div className="text-center mb-5 fade-in">
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '15px' }}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p style={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '16px' }}>
            Quick answers to common queries about using ZidTask
          </p>
        </div>

        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} className={`stagger-item transition-all`} style={{
              background: expandedFaq === idx 
                ? (darkMode ? 'rgba(30, 64, 175, 0.2)' : 'rgba(219, 234, 254, 0.5)')
                : (darkMode ? 'rgba(30, 64, 175, 0.1)' : 'rgba(255, 255, 255, 0.6)'),
              border: `1px solid ${expandedFaq === idx 
                ? (darkMode ? 'rgba(59, 130, 246, 0.4)' : 'rgba(30, 64, 175, 0.3)')
                : (darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 64, 175, 0.15)')}`,
              borderRadius: '12px',
              marginBottom: '15px',
              overflow: 'hidden',
              animationDelay: `${idx * 0.1}s`,
              boxShadow: expandedFaq === idx ? '0 4px 12px rgba(30, 64, 175, 0.2)' : 'none'
            }}>
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
                className="transition-all"
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  padding: '20px 25px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  color: darkMode ? '#fff' : '#1e40af',
                  fontSize: '16px',
                  fontWeight: '500',
                  textAlign: 'left'
                }}
              >
                <span>{faq.question}</span>
                <ChevronDown 
                  size={20} 
                  className="transition-all"
                  style={{
                    transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0)',
                    color: '#3b82f6'
                  }}
                />
              </button>
              {expandedFaq === idx && (
                <div className="fade-in" style={{
                  padding: '0 25px 20px',
                  color: darkMode ? '#94a3b8' : '#64748b',
                  fontSize: '14px',
                  lineHeight: '1.6'
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;