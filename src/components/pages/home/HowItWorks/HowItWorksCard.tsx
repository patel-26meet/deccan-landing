"use client"

import React, { useState, useEffect } from 'react';
import { IHowItWorksType } from '@/interfaces/components/howItWorks.type';

const HowItWorksCard: React.FC<IHowItWorksType> = ({
  header,
  subheader,
  index,
  isActive,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (isActive && typeof document !== "undefined") {
      let topPosition;
      if (index === 0) {
        topPosition = 17;
      } else {
        topPosition = 17 + (index * 6); 
      }
      
      const contentElement = document.querySelector('.how-it-works__content');
      if (contentElement) {
        const afterElement = contentElement as HTMLElement;
        afterElement.style.setProperty('--indicator-top', `${topPosition}rem`);
        afterElement.classList.add('has-active-item');
      }
    }
  }, [isActive, index]);

  return (
    <div 
      className={`how-it-works__card ${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''}`}
      onClick={() => onClick(index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="how-it-works__card-content">
        <h3 className="how-it-works__card-header">{header}</h3>
        {isActive && <p className="how-it-works__card-subheader">{subheader}</p>}
      </div>
    </div>
  );
};

export default HowItWorksCard;