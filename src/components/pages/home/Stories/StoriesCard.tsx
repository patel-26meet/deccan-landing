import React from 'react';
import { IStoriesCardType } from '../../../../interfaces/components/storiescard.type';

type StoriesCardProps = IStoriesCardType

const StoriesCard: React.FC<StoriesCardProps> = ({
  testimonial,
  highlightedText,
  additionalText,
  name,
  role,
  organization,
  profileImage
}) => {
  return (
    <div className='stories-card-wrapper'>
      <div className='stories-card-content'>
        <div className='stories-card-testimonial'>
          <span className='testimonial-text'>{testimonial}</span>
          {highlightedText && <span className='testimonial-highlight'>{highlightedText}</span>}
          {additionalText && <span className='testimonial-additional'>{additionalText}</span>}
        </div>
        <div className='stories-card-author'>
          <div className='author-info'>
            <div className='author-name'>{name}</div>
            <div className='author-role'>{role}</div>
            <div className='author-organization'>{organization}</div>
          </div>
          <img className='author-image' src={profileImage} alt={`${name} profile`} />
        </div>
      </div>
    </div>
  );
};

export default StoriesCard;