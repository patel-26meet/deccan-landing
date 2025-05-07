"use client"

import React, { useRef, useEffect } from 'react';

interface IFaqCardProps {
  question: string;
  answer: string;
  isOpen: boolean;
  index: number;
  toggleFaq: (index: number) => void;
}

const FaqCard: React.FC<IFaqCardProps> = ({ 
  question, 
  answer, 
  isOpen, 
  index, 
  toggleFaq 
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        // First set the height to auto to measure full content height
        contentRef.current.style.height = 'auto';
        const height = contentRef.current.scrollHeight;
        // Then set it to 0 and force a reflow
        contentRef.current.style.height = '0px';
        // Force browser to acknowledge the change
        void contentRef.current.offsetHeight;
        // Then animate to the full height
        contentRef.current.style.height = `${height}px`;
        contentRef.current.style.opacity = '1';
      } else {
        contentRef.current.style.height = '0px';
        contentRef.current.style.opacity = '0';
      }
    }
  }, [isOpen]);

  return (
    <div className={`faq-card ${isOpen ? 'open' : ''}`} onClick={() => toggleFaq(index)}>
      <div className="faq-question-row">
        <div className="faq-question-text">{question}</div>
        <div className="faq-toggle-icon">
          <img src={isOpen ? "/assets/faqs/faqs-minus.svg" : "/assets/faqs/faqs-plus-1.svg"} alt="Toggle" />
        </div>
      </div>
      <div className="faq-answer-container" ref={contentRef}>
        <div className="faq-answer-text">{answer}</div>
      </div>
    </div>
  );
};

export default FaqCard;

