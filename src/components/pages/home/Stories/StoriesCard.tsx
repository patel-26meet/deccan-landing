'use client';

import React from 'react';
import { IStoriesCardType } from '../../../../interfaces/components/storiescard.type';

type StoriesCardProps = IStoriesCardType;

const StoriesCard: React.FC<StoriesCardProps> = ({
  testimonial,
  highlightedText,
  additionalText,
  name,
  role,
  organization,
  profileImage,
}) => {
  const isAzizullahTestimonial = name === 'Azizullah C';

  return (
    <div className="stories-card">
      <div className="stories-card__content">
        <div className="stories-card__testimonial">
          <p className="stories-card__testimonial-text">
            {testimonial}
            {highlightedText && (
              <span className="stories-card__testimonial-highlight">{highlightedText}</span>
            )}
            {additionalText && (
              <>
                {isAzizullahTestimonial ? (
                  <>
                    <br />
                    <br />
                  </>
                ) : null}
                <span className="stories-card__testimonial-additional">{additionalText}</span>
              </>
            )}
          </p>
        </div>
        <div className="stories-card__author">
          <div className="stories-card__author-info">
            <div className="stories-card__author-name">{name}</div>
            <div className="stories-card__author-role">{role}</div>
            <div className="stories-card__author-organization">{organization}</div>
          </div>
          <img className="stories-card__author-image" src={profileImage} alt={`${name} profile`} />
        </div>
      </div>
    </div>
  );
};

export default StoriesCard;
