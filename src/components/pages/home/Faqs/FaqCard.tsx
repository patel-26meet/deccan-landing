"use client"

interface FaqCardProps {
  question: string;
  answer: string;
  isOpen: boolean;
  index: number;
  toggleFaq: (index: number) => void;
}

export default function FaqCard({ question, answer, isOpen, index, toggleFaq }: FaqCardProps) {
  return (
    <div 
      className={`faq-card ${isOpen ? 'open' : 'closed'}`}
      onClick={() => toggleFaq(index)}
    >
      <div className="faq-question-row">
        <div className="faq-question-text">{question}</div>
        <div className="faq-toggle-icon">
          <img 
            src={isOpen ? "/assets/faqs/faqs-minus.svg" : "/assets/faqs/faqs-plus-1.svg"} 
            alt={isOpen ? "Collapse" : "Expand"} 
          />
        </div>
      </div>
      <div className="faq-answer-container">
        <div className="faq-answer-text">
          {answer}
        </div>
      </div>
    </div>
  );
}
