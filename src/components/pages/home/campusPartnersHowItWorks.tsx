"use client"

import { useState, useEffect, useRef } from "react";
import Button from "@/components/shared/Button";
import HowItWorksCard from "./HowItWorks/HowItWorksCard";
import Lottie from "react-lottie-player";
import lottie1 from "../../../../public/assets/how-it-works/selection-process-1.json";
import lottie2 from "../../../../public/assets/how-it-works/selection-process-2.json";
import lottie3 from "../../../../public/assets/how-it-works/selection-process-3.json";
import lottie4 from "../../../../public/assets/how-it-works/selection-process-4.json";
import { howItWorksData } from "@/constants/pages/home/how-it-works";

const HowItWorks = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0); 
  const [isMobile, setIsMobile] = useState(false);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  
  const lottieAnimations = [lottie1, lottie2, lottie3, lottie4];

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Calculates the position of the indicator based on activeCardIndex
  const getMobileIndicatorPosition = () => {
    if (activeCardIndex === 0) return '0rem';
    if (activeCardIndex === 1) return '5.625rem'; // First card height + margin
    if (activeCardIndex === 2) return '11.25rem'; // 2x (card height + margin)
    if (activeCardIndex === 3) return '16.875rem'; // 3x (card height + margin)
    return '0rem';
  };

  const handleCardClick = (index: number) => {
    setActiveCardIndex(index);
    setAnimationKey(prev => prev + 1); 
  };

  // Function to advance to the next card/animation
  const handleAnimationComplete = () => {
    const nextIndex = (activeCardIndex + 1) % howItWorksData.length;
    setActiveCardIndex(nextIndex);
    setAnimationKey(prev => prev + 1); 
  };

  return (
    <div className="campus-partners-how-it-works">
        <div className="campus-partners">
            <div className="campus-partners__header">
                Our Campus Partners
            </div>
            <div className="campus-partners__content">
                Icons
            </div>
        </div>
        
        <div className="how-it-works__wrapper">
            <div className={`how-it-works__content ${activeCardIndex !== null ? 'has-active-item' : ''}`}
                 style={{'--indicator-top': `${19 + activeCardIndex * 5.5}rem`} as React.CSSProperties}>
                <div className="how-it-works__header">
                    How it works?
                </div>
                <div className="how-it-works__description">
                    Open up doors to your dream opportunities with a single application
                </div>
                <Button
                    text="Apply Now"
                />
                {!isMobile && (
                  <div className="how-it-works__cards-container">
                    {howItWorksData.map((card, index) => (
                      <HowItWorksCard
                        key={index}
                        header={card.header}
                        subheader={card.subheader}
                        index={index}
                        isActive={index === activeCardIndex}
                        onClick={handleCardClick}
                      />
                    ))}
                  </div>
                )}
            </div>  
            <div className="how-it-works__lottie">
                <Lottie
                    animationData={lottieAnimations[activeCardIndex]}
                    loop={false}
                    play
                    key={`lottie-${activeCardIndex}-${animationKey}`}
                    onComplete={handleAnimationComplete}
                />
            </div>
            {isMobile && (
              <div 
                ref={cardsContainerRef}
                className="how-it-works__cards-container"
                style={{'--mobile-indicator-top': getMobileIndicatorPosition()} as React.CSSProperties}
              >
                {howItWorksData.map((card, index) => (
                  <HowItWorksCard
                    key={index}
                    header={card.header}
                    subheader={card.subheader}
                    index={index}
                    isActive={index === activeCardIndex}
                    onClick={handleCardClick}
                  />
                ))}
              </div>
            )}
        </div>   
    </div>
  )
}

export default HowItWorks;