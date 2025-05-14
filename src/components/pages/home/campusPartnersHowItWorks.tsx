'use client';

import { useState, useRef, useMemo } from 'react';
import Button from '@/components/shared/Button';
import HowItWorksCard from './HowItWorks/HowItWorksCard';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import lottie1 from '../../../../public/assets/how-it-works/selection-process-1-v2.json';
import lottie2 from '../../../../public/assets/how-it-works/selection-process-2-v2.json';
import lottie3 from '../../../../public/assets/how-it-works/selection-process-3-v2.json';
import lottie4 from '../../../../public/assets/how-it-works/selection-process-4-v2.json';
import { howItWorksData } from '@/constants/pages/home/how-it-works';
import useDeviceType from '@/lib/hooks/useDeviceType';
import { useInView } from 'react-intersection-observer';

// Dynamically import Lottie to prevent SSR issues
const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

// Generate array of campus partner icons (1-29)
const CAMPUS_PARTNER_ICONS = Array.from({ length: 29 }, (_, i) => `I${i + 1}.svg`);

const HowItWorks = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const deviceType = useDeviceType();
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  
  // Use react-intersection-observer for the Lottie animation
  const { ref: lottieRef, inView } = useInView({
    triggerOnce: false,
    rootMargin: '0px 0px 200px 0px',
    threshold: 0.2
  });

  const lottieAnimations = [lottie1, lottie2, lottie3, lottie4];

  // Split icons into two different sets for top and bottom rows
  const topRowIcons = useMemo(() => {
    // First 15 icons for top row
    const icons = CAMPUS_PARTNER_ICONS.slice(0, 15);
    // Double the array for smooth infinite loop
    return [...icons, ...icons];
  }, []);

  // Use useMemo to ensure the shuffled array is stable across renders
  const bottomRowIcons = useMemo(() => {
    // Remaining 14 icons for bottom row, in reverse order for variety
    const icons = CAMPUS_PARTNER_ICONS.slice(15).reverse();
    // Double the array for smooth infinite loop
    return [...icons, ...icons];
  }, []);

  // Calculates the position of the indicator based on activeCardIndex
  const getIndicatorPosition = () => {
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

  // Check if we should use mobile/tablet layout
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isResponsiveLayout = isMobile || isTablet;

  return (
    <div className="campus-partners-how-it-works">
      <div className="campus-partners">
        <div className="campus-partners__header">Our Campus Partners</div>
        <div className="campus-partners__content">
          <div className="marquee-container">
            <div className="marquee">
              {topRowIcons.map((icon, index) => (
                <div key={`icon-${index}`} className="marquee-item">
                  <Image
                    src={`/assets/campus-partners/${icon}`}
                    alt={`Campus Partner ${(index % 15) + 1}`}
                    width={100}
                    height={60}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="marquee-container reverse">
            <div className="marquee marquee-reverse">
              {bottomRowIcons.map((icon, index) => (
                <div key={`icon-reverse-${index}`} className="marquee-item">
                  <Image
                    src={`/assets/campus-partners/${icon}`}
                    alt={`Campus Partner ${(index % 14) + 16}`}
                    width={100}
                    height={60}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="how-it-works__wrapper">
        <div
          className={`how-it-works__content ${activeCardIndex !== null ? 'has-active-item' : ''}`}
          style={{ '--indicator-top': `${19 + activeCardIndex * 5.5}rem` } as React.CSSProperties}
        >
          <div className="how-it-works__header">How it works?</div>
          <div className="how-it-works__description">
            Open up doors to your dream opportunities with a single application
          </div>

          {/* Apply Now button with conditional styling for tablet */}
          <div className={isTablet ? 'how-it-works__button-container-tablet' : ''}>
            <Button text="Apply Now" />
          </div>

          {!isResponsiveLayout && (
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
        <div ref={lottieRef} className="how-it-works__lottie">
          {inView && (
            <Lottie
              animationData={lottieAnimations[activeCardIndex]}
              loop={false}
              play={inView}
              key={`lottie-${activeCardIndex}-${animationKey}`}
              onComplete={handleAnimationComplete}
              style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                borderTopLeftRadius: isResponsiveLayout ? '8px' : '12px',
                borderBottomLeftRadius: isResponsiveLayout ? '8px' : '12px',
              }}
              rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
            />
          )}
        </div>
        {isResponsiveLayout && (
          <div
            ref={cardsContainerRef}
            className="how-it-works__cards-container"
            style={
              {
                [isMobile ? '--mobile-indicator-top' : '--tablet-indicator-top']:
                  getIndicatorPosition(),
              } as React.CSSProperties
            }
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
  );
};

export default HowItWorks;
