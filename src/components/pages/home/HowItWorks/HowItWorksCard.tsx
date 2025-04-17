import React from 'react';

interface HowItWorksCardProps {
  header: string;
  subheader: string;
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
}

const HowItWorksCard: React.FC<HowItWorksCardProps> = ({
  header,
  subheader,
  index,
  isActive,
  onClick
}) => {
  return (
    <div 
      className={`how-it-works-card ${isActive ? 'active' : ''}`}
      onClick={() => onClick(index)}
    >
      <div className="card-number">{index + 1}</div>
      <div className="card-content">
        <h3 className="card-header">{header}</h3>
        <p className="card-subheader">{subheader}</p>
      </div>
      <div className="card-arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke={isActive ? "#4434EF" : "#888"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

export default HowItWorksCard;