'use client';

import React, { useState, useEffect } from 'react'
import StoriesCard from './Stories/StoriesCard';
import ImageBackside from './Stories/ImageBackside';
import { storiesData } from '@/constants/pages/home/stories';

const Stories = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <>
    <div className='stories'>
        <div className='stories__header-wrapper'>
            <div className='stories__header'>
                {storiesData.header}
            </div>
            <div className='stories__content'>
                {storiesData.subheader}
                <span className='stories__content-number'>{storiesData.expertCount}</span> {storiesData.expertText}
            </div>
        </div>
        
        {isMobile ? (
          <div className='stories__body-mobile'>
            <StoriesCard
              testimonial={storiesData.testimonials[0].testimonial}
              highlightedText={storiesData.testimonials[0].highlightedText}
              additionalText={storiesData.testimonials[0].additionalText}
              name={storiesData.testimonials[0].name}
              role={storiesData.testimonials[0].role}
              organization={storiesData.testimonials[0].organization}
              profileImage={storiesData.testimonials[0].profileImage}
            />
            <StoriesCard
              testimonial={storiesData.testimonials[2].testimonial}
              highlightedText={storiesData.testimonials[2].highlightedText}
              name={storiesData.testimonials[2].name}
              role={storiesData.testimonials[2].role}
              organization={storiesData.testimonials[2].organization}
              profileImage={storiesData.testimonials[2].profileImage}
            />
            <div className='stories__body-mobile-image'>
              <img src={storiesData.images.image2} alt="Soul AI community member" />
            </div>
          </div>
        ) : (
          <div className='stories__body'>
              <div className='stories__body-left'>
                  <div className='stories__body-left-top'>
                      <a 
                        href="https://www.linkedin.com/feed/update/urn:li:activity:7298324135418478592/?actorCompanyId=96882481" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="linkedin-link"
                      >
                        <img className='stories__body-left-top-img hover-effect' src={storiesData.images.linkedinPost}/>
                      </a>
                      <div className="flip-card">
                        <div className="flip-card-inner">
                          <div className="flip-card-front">
                            <img className='stories__body-left-top-img-2' src={storiesData.images.image1}/>
                          </div>
                          <div className="flip-card-back">
                            <ImageBackside 
                              content={storiesData.flipCards.image1.content}
                            />
                          </div>
                        </div>
                      </div>
                  </div>
                  <div className='stories__body-left-bottom'>
                      <div className='stories__body-left-bottom-1'>
                          <img className='stories__body-left-bottom-img-1 hover-effect' src={storiesData.images.whatsapp}/>
                          <img className='stories__body-left-bottom-img-2 hover-effect' src={storiesData.images.woman}/>
                      </div>
                      <div className='stories__body-left-bottom-2'>
                          <StoriesCard
                              testimonial={storiesData.testimonials[0].testimonial}
                              highlightedText={storiesData.testimonials[0].highlightedText}
                              additionalText={storiesData.testimonials[0].additionalText}
                              name={storiesData.testimonials[0].name}
                              role={storiesData.testimonials[0].role}
                              organization={storiesData.testimonials[0].organization}
                              profileImage={storiesData.testimonials[0].profileImage}
                          />
                          <StoriesCard
                              testimonial={storiesData.testimonials[1].testimonial}
                              name={storiesData.testimonials[1].name}
                              organization={storiesData.testimonials[1].organization}
                              profileImage={storiesData.testimonials[1].profileImage}
                          />
                      </div>
                  </div>
              </div>
              <div className='stories__body-right'>
                  <div className='stories__body-right-space'>
                  </div>
                  <div className='stories__body-right-top'>
                      <StoriesCard
                          testimonial={storiesData.testimonials[2].testimonial}
                          highlightedText={storiesData.testimonials[2].highlightedText}
                          name={storiesData.testimonials[2].name}
                          role={storiesData.testimonials[2].role}
                          organization={storiesData.testimonials[2].organization}
                          profileImage={storiesData.testimonials[2].profileImage}
                      />
                      <img className='stories__body-right-top-img hover-effect' src={storiesData.images.linkedinMsg}/>
                  </div>
                  <div className='stories__body-right-middle'>
                      <div className="flip-card">
                        <div className="flip-card-inner">
                          <div className="flip-card-front">
                            <img className='stories__body-right-bottom-img-1' src={storiesData.images.image2}/>
                          </div>
                          <div className="flip-card-back">
                            <ImageBackside 
                              content={storiesData.flipCards.image2.content}
                            />
                          </div>
                        </div>
                      </div>
                      <StoriesCard
                          testimonial={storiesData.testimonials[3].testimonial}
                          highlightedText={storiesData.testimonials[3].highlightedText}
                          name={storiesData.testimonials[3].name}
                          organization={storiesData.testimonials[3].organization}
                          profileImage={storiesData.testimonials[3].profileImage}
                      />
                  </div>
                  <div className='stories__body-right-bottom'>
                      <a 
                        href="https://www.linkedin.com/feed/update/urn:li:activity:7286402295943024640/?actorCompanyId=96882481" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="linkedin-link"
                      >
                        <img className='stories__body-right-bottom-img-2 hover-effect' src={storiesData.images.linkedinBotRight}/>
                      </a>
                  </div>
              </div>
          </div>
        )}
    </div>
    <div className='stories__blur'></div>
    </>
  )
}

export default Stories;