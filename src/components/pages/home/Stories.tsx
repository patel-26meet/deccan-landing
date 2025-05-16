'use client';

import React, { useState } from 'react';
import StoriesCard from './Stories/StoriesCard';
import ImageBackside from './Stories/ImageBackside';
import { storiesData } from '@/constants/pages/home/stories';
import useDeviceType from '@/lib/hooks/useDeviceType';

const Stories = () => {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});

  // Handle card touch/click for tablets
  const handleCardFlip = (cardId: string) => {
    if (isTablet) {
      setFlippedCards(prev => ({
        ...prev,
        [cardId]: !prev[cardId],
      }));
    }
  };

  // Get card class based on flip state
  const getCardClass = (cardId: string) => {
    const baseClass = 'stories__flip-card-inner';
    return isTablet && flippedCards[cardId] ? `${baseClass} flipped` : baseClass;
  };

  return (
    <div id="stories-section" className="stories-section">
      <div className="stories">
        <div className="stories__header-container">
          <div className="stories__title">{storiesData.header}</div>
          <div className="stories__description">
            {storiesData.subheader}
            <span className="stories__description-highlight">{storiesData.expertCount}</span>{' '}
            {storiesData.expertText}
          </div>
        </div>

        {isMobile ? (
          <div className="stories__mobile">
            <StoriesCard
              testimonial={storiesData.testimonials[0].testimonial}
              highlightedText={storiesData.testimonials[0].highlightedText}
              additionalText={storiesData.testimonials[0].additionalText}
              name={storiesData.testimonials[0].name}
              role={storiesData.testimonials[0].role}
              organization={storiesData.testimonials[0].organization}
              profileImage={storiesData.images.dp3}
            />
            <StoriesCard
              testimonial={storiesData.testimonials[2].testimonial}
              highlightedText={storiesData.testimonials[2].highlightedText}
              name={storiesData.testimonials[2].name}
              role={storiesData.testimonials[2].role}
              organization={storiesData.testimonials[2].organization}
              profileImage={storiesData.images.dp1}
            />
            <div className="stories__mobile-image">
              <img className="stories__mobile-image-img" src={storiesData.images.image2} alt="Soul AI community member" loading="lazy" />
            </div>
          </div>
        ) : (
          <div className="stories__grid">
            <div className="stories__grid-left">
              <div className="stories__grid-left-top">
                <a
                  href="https://www.linkedin.com/feed/update/urn:li:activity:7298324135418478592/?actorCompanyId=96882481"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stories__linkedin-link"
                >
                  <img
                    className="stories__grid-image stories__grid-image--hover"
                    src={storiesData.images.linkedinPost}
                    loading="lazy"
                  />
                </a>
                <div className="stories__flip-card" onClick={() => handleCardFlip('card1')}>
                  <div className={getCardClass('card1')}>
                    <div className="stories__flip-card-front">
                      <img className="stories__grid-image" src={storiesData.images.image1} loading="lazy" />
                    </div>
                    <div className="stories__flip-card-back">
                      <ImageBackside content={storiesData.flipCards.image1.content} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="stories__grid-left-bottom">
                <div className="stories__grid-left-bottom-images">
                  <img
                    className="stories__grid-image stories__grid-image--hover"
                    src={storiesData.images.whatsapp}
                    loading="lazy"
                  />
                  <img
                    className="stories__grid-image stories__grid-image--hover"
                    src={storiesData.images.woman}
                    loading="lazy"
                  />
                </div>
                <div className="stories__grid-left-bottom-cards">
                  <StoriesCard
                    testimonial={storiesData.testimonials[0].testimonial}
                    highlightedText={storiesData.testimonials[0].highlightedText}
                    additionalText={storiesData.testimonials[0].additionalText}
                    name={storiesData.testimonials[0].name}
                    role={storiesData.testimonials[0].role}
                    organization={storiesData.testimonials[0].organization}
                    profileImage={storiesData.images.dp3}
                  />
                  <StoriesCard
                    testimonial={storiesData.testimonials[1].testimonial}
                    highlightedText={storiesData.testimonials[1].highlightedText}
                    additionalText={storiesData.testimonials[1].additionalText}
                    name={storiesData.testimonials[1].name}
                    organization={storiesData.testimonials[1].organization}
                    profileImage={storiesData.testimonials[1].profileImage}
                  />
                </div>
              </div>
            </div>
            <div className="stories__grid-right">
              <div className="stories__grid-right-space"></div>
              <div className="stories__grid-right-top">
                <StoriesCard
                  testimonial={storiesData.testimonials[2].testimonial}
                  highlightedText={storiesData.testimonials[2].highlightedText}
                  additionalText={storiesData.testimonials[2].additionalText}
                  name={storiesData.testimonials[2].name}
                  role={storiesData.testimonials[2].role}
                  organization={storiesData.testimonials[2].organization}
                  profileImage={storiesData.images.dp1}
                />
                <img
                  className="stories__grid-image stories__grid-image--hover"
                  src={storiesData.images.linkedinMsg}
                  loading="lazy"
                />
              </div>
              <div className="stories__grid-right-middle">
                <div className="stories__flip-card" onClick={() => handleCardFlip('card2')}>
                  <div className={getCardClass('card2')}>
                    <div className="stories__flip-card-front">
                      <img className="stories__grid-image" src={storiesData.images.image2} loading="lazy" />
                    </div>
                    <div className="stories__flip-card-back">
                      <ImageBackside content={storiesData.flipCards.image2.content} />
                    </div>
                  </div>
                </div>
                <StoriesCard
                  testimonial={storiesData.testimonials[3].testimonial}
                  highlightedText={storiesData.testimonials[3].highlightedText}
                  additionalText={storiesData.testimonials[3].additionalText}
                  name={storiesData.testimonials[3].name}
                  organization={storiesData.testimonials[3].organization}
                  profileImage={storiesData.images.dp2}
                />
              </div>
              <div className="stories__grid-right-bottom">
                <a
                  href="https://www.linkedin.com/feed/update/urn:li:activity:7286402295943024640/?actorCompanyId=96882481"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stories__linkedin-link"
                >
                  <img
                    className="stories__grid-image stories__grid-image--hover"
                    src={storiesData.images.linkedinBotRight}
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="stories-section__blur"></div>
      <div className="stories-section__blur-gradient"></div>
      {/* No button for now 
      <div className="stories-section__button">
        <Button text="View More Stories" mode="light" />
      </div>
      */}
    </div>
  );
};

export default Stories;
