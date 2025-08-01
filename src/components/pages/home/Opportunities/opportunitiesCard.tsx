'use client';

import { IOpportunitiesCard } from '@/interfaces/components/opportunitiesCard.type';
import { FC } from 'react';

const OpportunitiesCard: FC<IOpportunitiesCard> = ({ header, description, rate, category }) => {
  // Function to get the appropriate image based on category
  const getImagePath = () => {
    switch (category) {
      case 'Coding and Software':
        return './assets/opportunities/card/coding.svg';
      case 'AI/ML':
        return './assets/opportunities/card/ml.svg';
      case 'Specialist':
        return './assets/opportunities/card/specialist.svg';
      case 'Linguistics':
        return './assets/opportunities/card/linguistic.svg';
      default:
        return './assets/opportunities/card/coding.svg'; // Default fallback
    }
  };

  return (
    <div className="opportunities-card">
      <div className="opportunities-card__inner">
        <div className="opportunities-card__content">
          <div className="opportunities-card__details">
            <div className="opportunities-card__header">{header}</div>
            <div className="opportunities-card__description">{description}</div>
            <div className="opportunities-card__rate">{rate}</div>
          </div>
          <div className="opportunities-card__button">
            <div className="opportunities-card__button-text">Apply Now</div>
          </div>
        </div>
      </div>
      <div className="opportunities-card__image">
        <img src={getImagePath()} alt={`${category} illustration`} loading="lazy" />
      </div>
    </div>
  );
};

export default OpportunitiesCard;
