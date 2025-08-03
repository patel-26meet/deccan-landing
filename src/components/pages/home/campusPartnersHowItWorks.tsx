'use client';

import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import Button from '@/components/shared/Button';
import HowItWorksCard from './HowItWorks/HowItWorksCard';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { howItWorksData } from '@/constants/pages/home/how-it-works';
import useDeviceType from '@/lib/hooks/useDeviceType';
import { useInView } from 'react-intersection-observer';
import { 
  ICampusPartnersHowItWorksProps, 
  ICampusPartnerLottieCache 
} from '@/interfaces/components/howItWorksLottie.type';
import { ILottieAnimationData } from '@/interfaces/components/lottie.type';

// Dynamically import Lottie to prevent SSR issues
const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

// Generate array of campus partner icons (1-29)
const CAMPUS_PARTNER_ICONS = Array.from({ length: 29 }, (_, i) => `I${i + 1}.svg`);

const HowItWorks = ({initialActiveCard = 0}: ICampusPartnersHowItWorksProps = {}) => {
  const [activeCardIndex, setActiveCardIndex] = useState(initialActiveCard);
  const [animationKey, setAnimationKey] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState<ILottieAnimationData | null>(null);
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(false);
  const deviceType = useDeviceType();
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  // Cache persists between component mounts
  const animationCache = useRef<ICampusPartnerLottieCache>({});
  // Track which animations have already been requested to prevent duplicate requests
  const requestedAnimations = useRef<Set<number>>(new Set());
  
  // Use react-intersection-observer for the Lottie animation
  const { ref: lottieRef, inView } = useInView({
    triggerOnce: false,
    rootMargin: '0px 0px 200px 0px',
    threshold: 0.2
  });

  // Dynamic import paths for Lottie animations
  const animationPaths = useMemo(() => [
    './assets/how-it-works/selection-process-1-v2.json',
    './assets/how-it-works/selection-process-2-v2.json',
    './assets/how-it-works/selection-process-3-v2.json',
    './assets/how-it-works/selection-process-4-v2.json'
  ], []);

  // Memoize animation loading function to prevent recreation on each render
  const loadAnimation = useCallback(async (index: number) => {
    // Skip if already requested or cached
    if (requestedAnimations.current.has(index)) {
      return animationCache.current[index] || null;
    }

    try {
      setIsLoadingAnimation(true);
      // Mark as requested immediately to prevent parallel requests
      requestedAnimations.current.add(index);
      
      // Fetch the animation data
      const animationData = await fetch(animationPaths[index]).then(res => res.json()) as ILottieAnimationData;
      
      // Cache the loaded animation
      animationCache.current[index] = animationData;
      return animationData;
    } catch (error) {
      console.error('Failed to load animation:', error);
      return null;
    } finally {
      setIsLoadingAnimation(false);
    }
  }, [animationPaths]);

  // Effect to update current animation when active index changes or component comes into view
  useEffect(() => {
    if (!inView) return;

    // If animation is cached, use it immediately
    if (animationCache.current[activeCardIndex]) {
      setCurrentAnimation(animationCache.current[activeCardIndex]);
      
      // Preload the next animation
      const nextIndex = (activeCardIndex + 1) % howItWorksData.length;
      if (!requestedAnimations.current.has(nextIndex)) {
        loadAnimation(nextIndex);
      }
      return;
    }

    // Otherwise load it
    loadAnimation(activeCardIndex).then(animation => {
      if (animation) {
        setCurrentAnimation(animation);
        
        // Preload the next animation
        const nextIndex = (activeCardIndex + 1) % howItWorksData.length;
        if (!requestedAnimations.current.has(nextIndex)) {
          loadAnimation(nextIndex);
        }
      }
    });
  }, [inView, activeCardIndex, loadAnimation, howItWorksData.length]);

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
    if(deviceType === 'mobile') {
      if (activeCardIndex === 0) return '0rem';
      if (activeCardIndex === 1) return '4.625rem'; // First card height + margin
      if (activeCardIndex === 2) return '10.25rem'; // 2x (card height + margin)
      if (activeCardIndex === 3) return '14.875rem'; // 3x (card height + margin)
      return '0rem';
    } else {
      if (activeCardIndex === 0) return '0rem';
      if (activeCardIndex === 1) return '5.625rem'; 
      if (activeCardIndex === 2) return '11.25rem'; 
      if (activeCardIndex === 3) return '16.875rem'; 
      return '0rem';
    }
  };

  // Function to handle card click
  const handleCardClick = (index: number) => {
    if (index !== activeCardIndex) {
      setActiveCardIndex(index);
      setAnimationKey(prev => prev + 1);
    }
  };

  // Function to advance to the next card/animation
  const handleAnimationComplete = () => {
    const nextIndex = (activeCardIndex + 1) % howItWorksData.length;
    
    // Only advance if the next animation is ready
    if (animationCache.current[nextIndex]) {
      setActiveCardIndex(nextIndex);
      setAnimationKey(prev => prev + 1);
    } else {
      // If next animation isn't ready yet, start loading it and wait
      loadAnimation(nextIndex).then(() => {
        setActiveCardIndex(nextIndex);
        setAnimationKey(prev => prev + 1);
      });
    }
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
                    src={`./assets/campus-partners/${icon}`}
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
                    src={`./assets/campus-partners/${icon}`}
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
          {inView && currentAnimation && (
            <Lottie
              animationData={currentAnimation}
              loop={false}
              play={inView && !!currentAnimation}
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
          {inView && isLoadingAnimation && (
            <div className="animation-loading-placeholder" />
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
