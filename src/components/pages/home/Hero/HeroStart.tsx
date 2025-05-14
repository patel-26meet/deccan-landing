'use client';

import Button from '@/components/shared/Button';
import { IAnimationState } from '@/interfaces/components/hero.type';
import useScrollPosition from '@/lib/hooks/useScrollPosition';
import useDeviceType from '@/lib/hooks/useDeviceType';
import { useCallback, useEffect, useRef, useState } from 'react';
import Lottie from 'react-lottie-player';
import HeroIconsLayout from './HeroIconsLayout';

// Define a type for Lottie animation JSON
interface LottieAsset {
  id?: string;
  w?: number;
  h?: number;
  u?: string;
  p?: string;
  e?: number;
  [key: string]: unknown;
}

interface LottieLayer {
  ind?: number;
  ty?: number;
  nm?: string;
  [key: string]: unknown;
}

interface LottieMarker {
  tm?: number;
  cm?: string;
  dr?: number;
  [key: string]: unknown;
}

type LottieFile = {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm: string;
  assets: LottieAsset[];
  layers: LottieLayer[];
  markers: LottieMarker[];
  [key: string]: unknown;
};

const HeroStart = () => {
  const { scrollY, scrollDirection: globalScrollDirection } = useScrollPosition();
  const [animState, setAnimState] = useState<IAnimationState>({
    showFirstAnim: true,
    showSecondAnim: false,
    showThirdAnim: false,
    firstAnimCompleted: false,
    secondAnimSpeed: 1,
    thirdAnimProgress: 0,
    lottieThirdProgress: 0,
    showText: false,
    textHighlightIndex: -1,
    animationCompleted: false,
    iconsLayoutProgress: 0,
    textFullyHighlighted: false,
    animationDirection: 'forward',
    hasScrolledDuringAnim2: false,
    secondAnimProgress: 0,
  });

  // State for dynamically loaded Lottie animations
  const [lottieFiles, setLottieFiles] = useState<{
    desktop: { [key: number]: LottieFile };
    mobile: { [key: number]: LottieFile };
    tablet: { [key: number]: LottieFile };
  }>({
    desktop: {},
    mobile: {},
    tablet: {},
  });

  // Add state for text transition
  const [textTransitionProgress, setTextTransitionProgress] = useState(0);
  // Using scrollDirection to control animation behavior, so suppressing the linter warning
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

  // Use the deviceType hook instead of managing device state manually
  const deviceType = useDeviceType();

  // Load Lottie animations dynamically based on device type
  useEffect(() => {
    const loadAnimations = async () => {
      try {
        if (deviceType === 'desktop') {
          // Load desktop animations
          const [lottie1, lottie2, lottie3] = await Promise.all([
            import('../../../../../public/assets/hero-json/H1-v3.json'),
            import('../../../../../public/assets/hero-json/H2.json'),
            import('../../../../../public/assets/hero-json/H3.json')
          ]);
          
          setLottieFiles(prev => ({
            ...prev, 
            desktop: { 
              ...prev.desktop, // Keep existing items in the desktop object
              1: lottie1.default as LottieFile, 
              2: lottie2.default as LottieFile, 
              3: lottie3.default as LottieFile 
            }
          }));
        } else if (deviceType === 'mobile') {
          // Load mobile animations
          const [lottiem1, lottiem2, lottiem3] = await Promise.all([
            import('../../../../../public/assets/hero-json/mobile/H1.json'),
            import('../../../../../public/assets/hero-json/mobile/H2.json'),
            import('../../../../../public/assets/hero-json/mobile/H3.json')
          ]);
          
          setLottieFiles(prev => ({
            ...prev, 
            mobile: { 
              ...prev.mobile, // Keep existing items in the mobile object
              1: lottiem1.default as LottieFile, 
              2: lottiem2.default as LottieFile, 
              3: lottiem3.default as LottieFile 
            }
          }));
        } else if (deviceType === 'tablet') {
          // Load tablet animations
          const [lottiet1, lottiet2, lottiet3] = await Promise.all([
            import('../../../../../public/assets/hero-json/tablet/H1.json'),
            import('../../../../../public/assets/hero-json/tablet/H2.json'),
            import('../../../../../public/assets/hero-json/tablet/H3.json')
          ]);
          
          setLottieFiles(prev => ({
            ...prev, 
            tablet: { 
              ...prev.tablet, // Keep existing items in the tablet object
              1: lottiet1.default as LottieFile, 
              2: lottiet2.default as LottieFile, 
              3: lottiet3.default as LottieFile 
            }
          }));
        }
      } catch (error) {
        console.error('Failed to load Lottie animations:', error);
      }
    };

    loadAnimations();
  }, [deviceType]);

  // Get the appropriate Lottie animations based on device type
  const getLottieAnimation = (index: 1 | 2 | 3) => {
    if (deviceType === 'mobile') {
      return lottieFiles.mobile[index];
    } else if (deviceType === 'tablet') {
      return lottieFiles.tablet[index];
    } else {
      return lottieFiles.desktop[index];
    }
  };

  // Modified overlay text with span wrappers around "Future of AI" and "50+ domains"
  const overlayTextWords =
    'Shape the Future of AI  with Flexible, High Impact Remote opportunities across 50+ domains tailored for your expertise!'.split(
      ' '
    );

  // Special texts that need gradient effects
  const futureOfAiText = 'Future of AI ';
  const domainsText = '50+ domains';

  // Modified render function for overlay text to handle special gradient text
  const renderOverlayText = () => {
    const result = [];
    let currentIndex = 0;

    for (let i = 0; i < overlayTextWords.length; i++) {
      const word = overlayTextWords[i];

      // Determine the word state
      let className = 'text-word';
      const isHighlighted = i <= animState.textHighlightIndex;

      if (isHighlighted) {
        className += ' active';
      } else if (i === animState.textHighlightIndex + 1) {
        // First intermediate state (closest to active)
        className += ' transitioning-1';
      } else if (i === animState.textHighlightIndex + 2) {
        // Second intermediate state
        className += ' transitioning-2';
      }

      // Check if this word is part of "Future of AI"
      if (
        word === 'Future' &&
        i + 2 < overlayTextWords.length &&
        overlayTextWords[i + 1] === 'of' &&
        overlayTextWords[i + 2] === 'AI'
      ) {
        result.push(
          <div className={`${className} ${isHighlighted ? 'gradient-future-ai-wrapper' : ''}`}>
            <span
              key={currentIndex}
              className={`${className} ${isHighlighted ? 'gradient-future-ai' : ''}`}
            >
              {futureOfAiText}{' '}
            </span>
            {isHighlighted && <img src="/assets/stars.svg" className="star-icon" loading="eager" />}
          </div>
        );
        i += 2; // Skip the next two words
      }
      // Check if this word is "50+ domains"
      else if (
        word === '50+' &&
        i + 1 < overlayTextWords.length &&
        overlayTextWords[i + 1] === 'domains'
      ) {
        result.push(
          <span
            key={currentIndex}
            className={`${className} ${isHighlighted ? 'gradient-domains' : ''}`}
          >
            {domainsText}{' '}
          </span>
        );
        i += 1; // Skip the next word
      }
      // Regular word
      else {
        result.push(
          <span key={currentIndex} className={className}>
            {word}{' '}
          </span>
        );
      }
      currentIndex++;
    }

    return result;
  };

  const wheelEventRef = useRef<WheelEvent | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const totalScrollRef = useRef<number>(0);
  const isScrollingRef = useRef<boolean>(false);
  const hasLeftSectionRef = useRef<boolean>(false);
  const textTransitionScrollAccRef = useRef<number>(0);

  // Track animation 2 loop with useRef
  const anim2IntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAnim2TransitioningRef = useRef<boolean>(false);

  // Handle animation 2 loop
  useEffect(() => {
    // Only run when animation 2 is active and user hasn't scrolled
    if (
      animState.showSecondAnim &&
      !animState.hasScrolledDuringAnim2 &&
      !isAnim2TransitioningRef.current
    ) {
      // Clear any existing intervals
      if (anim2IntervalRef.current) {
        clearInterval(anim2IntervalRef.current);
      }

      // Set up new interval for animation loop
      anim2IntervalRef.current = setInterval(() => {
        setAnimState(prev => {
          // Handle direction change at endpoints
          if (prev.animationDirection === 'forward' && prev.secondAnimProgress >= 0.99) {
            // Change to reverse when reaching the end
            return {
              ...prev,
              animationDirection: 'reverse',
              secondAnimSpeed: -1,
            };
          } else if (prev.animationDirection === 'reverse' && prev.secondAnimProgress <= 0.01) {
            // Change to forward when reaching the beginning
            return {
              ...prev,
              animationDirection: 'forward',
              secondAnimSpeed: 1,
            };
          }

          // Increment/decrement progress based on current direction
          const progressIncrement = prev.animationDirection === 'forward' ? 0.01 : -0.01;
          const newProgress = Math.min(Math.max(prev.secondAnimProgress + progressIncrement, 0), 1);

          return {
            ...prev,
            secondAnimProgress: newProgress,
          };
        });
      }, 100); // Adjust interval as needed for smooth animation

      // Clean up interval on unmount
      return () => {
        if (anim2IntervalRef.current) {
          clearInterval(anim2IntervalRef.current);
        }
      };
    } else if (!animState.showSecondAnim && anim2IntervalRef.current) {
      // Clear interval when not showing animation 2
      clearInterval(anim2IntervalRef.current);
      anim2IntervalRef.current = null;
    }
  }, [animState.showSecondAnim, animState.hasScrolledDuringAnim2]);

  // Reset scroll state when animation 2 is inactive
  useEffect(() => {
    if (!animState.showSecondAnim) {
      // Reset scroll state when transitioning away from animation 2
      setAnimState(prev => ({
        ...prev,
        hasScrolledDuringAnim2: false,
      }));
    }
  }, [animState.showSecondAnim]);

  // Handle first animation completion
  const handleFirstAnimComplete = () => {
    console.log('First animation completed');
    // Set initial text transition to fully visible
    setTextTransitionProgress(0);

    setAnimState(prev => ({
      ...prev,
      showFirstAnim: false,
      firstAnimCompleted: true,
      showSecondAnim: true,
      showText: true,
      animationDirection: 'forward',
      secondAnimSpeed: 1,
      secondAnimProgress: 0,
      hasScrolledDuringAnim2: false,
    }));

    // Remove scroll lock after first animation completes
    document.body.classList.remove('scroll-disabled');
  };

  // Calculate text transition styles based on progress
  const getTextTransitionStyles = () => {
    const progress = textTransitionProgress;
    const scale = 1 - progress * 0.03;
    const blur = progress * 4;
    const opacity = 1 - progress;

    return {
      transform: `translate(-50%, -50%) scale(${scale}, ${scale})`,
      filter: `blur(${blur}px)`,
      opacity,
    };
  };

  // Log state changes for debugging
  useEffect(() => {
    console.log('Animation state updated:', animState);

    // Check if text is fully highlighted (all words are white)
    if (
      !animState.textFullyHighlighted &&
      animState.textHighlightIndex >= overlayTextWords.length - 1
    ) {
      setAnimState(prev => ({
        ...prev,
        textFullyHighlighted: true,
      }));
    }
  }, [animState, overlayTextWords.length]);

  // Check if user has scrolled past the hero section
  useEffect(() => {
    const heroHeight = window.innerHeight;
    if (scrollY > heroHeight) {
      hasLeftSectionRef.current = true;
    } else if (scrollY < 100 && hasLeftSectionRef.current) {
      // User has returned to hero section
      hasLeftSectionRef.current = false;

      // Only reset if animation was completed before
      if (animState.animationCompleted && !animState.showFirstAnim) {
        console.log('Returning to hero section - resetting to animation 3 in reverse');

        // Place user at animation 3 with fully highlighted text and visible icons layout
        setAnimState(prev => ({
          ...prev,
          showSecondAnim: false,
          showThirdAnim: true,
          showText: false,
          thirdAnimProgress: 1.0,
          lottieThirdProgress: 1.0,
          textHighlightIndex: overlayTextWords.length - 1,
          iconsLayoutProgress: 1.0,
          animationCompleted: false,
          textFullyHighlighted: true,
        }));

        // Ensure the hero-content-overlay is visible
        setTimeout(() => {
          const overlay = document.querySelector('.hero-content-overlay');
          if (overlay) {
            (overlay as HTMLElement).style.opacity = '1';
          }
        }, 100);

        // Ensure scroll is disabled to control the animation
        document.body.classList.add('scroll-disabled');

        // Show a message to indicate user should scroll (optional)
        console.log('Scroll to control the reverse animation');
      }
    }
  }, [scrollY, animState.animationCompleted, animState.showFirstAnim, overlayTextWords.length]);

  // Calculate icon layout position and opacity
  const getIconsLayoutStyle = () => {
    if (!animState.textFullyHighlighted) {
      return {
        transform: 'translateY(100%)',
        opacity: 0,
      };
    }

    // After text is fully highlighted, start showing icons layout
    const progress = animState.iconsLayoutProgress;

    // Calculate starting position (100% = bottom of screen)
    // Move from 100% (bottom) to -30% (30% above the top)
    const translateY = 100 - progress * 130;

    // Calculate opacity - fully visible in the middle of the journey
    let opacity = 0;
    if (progress < 0.3) {
      // Fade in from 0 to 1 during first 20% of progress
      opacity = progress / 0.2;
    } else if (progress > 0.7) {
      // Fade out from 1 to 0 during last 20% of progress
      opacity = 1 - (progress - 0.8) / 0.2;
    } else {
      // Fully visible in the middle
      opacity = 1;
    }

    return {
      transform: `translateY(${translateY}%)`,
      opacity,
    };
  };

  // Add a style that ensures the hero section covers the full viewport
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const styleTag = document.createElement('style');
      styleTag.innerHTML = `
        .hero-start-wrapper {
          min-height: 100vh;
          position: relative; 
          overflow: hidden;
        }
        
        body.scroll-disabled {
          overflow: hidden;
        }
      `;
      document.head.appendChild(styleTag);

      return () => {
        document.head.removeChild(styleTag);
      };
    }
  }, []);

  // Modify the processScroll function for better scroll-based control
  const processScroll = useCallback(() => {
    // Calculate new progress and text highlight based on accumulated scroll
    const scrollAmount = totalScrollRef.current;
    const scrollDirection = scrollAmount > 0 ? 1 : -1;

    // Reset the scroll accumulator
    totalScrollRef.current = 0;

    // Update the animation progress
    setAnimState(prev => {
      // For smoother transitions, adjust the step size based on direction
      // Smaller steps when reversing for better control
      const progressMultiplier = scrollDirection < 0 ? 0.05 : 0.1; // Increased from 0.03/0.06
      const progressStep = progressMultiplier * Math.sign(scrollAmount);
      const newThirdProgress = prev.thirdAnimProgress + progressStep;

      // Continuously update Lottie animation progress regardless of text highlighting
      const lottieMultiplier = scrollDirection < 0 ? 1.5 : 2.2; // Increased from 1.0/1.6
      const newLottieProgress = Math.max(
        prev.lottieThirdProgress + progressStep * lottieMultiplier,
        0
      );

      // Calculate max highlight index
      const maxHighlightIndex = overlayTextWords.length - 1;

      // Handle different animation order for forward vs reverse
      let iconsProgress = prev.iconsLayoutProgress;
      let highlightIndex = prev.textHighlightIndex;

      if (scrollDirection > 0) {
        // FORWARD ANIMATION: First text highlight, then icons layout

        // Update text highlight index
        highlightIndex = Math.min(
          Math.floor(Math.min(newThirdProgress, 1) * overlayTextWords.length * 1.2), // Added 1.2 multiplier for faster text highlighting
          maxHighlightIndex
        );

        // After text is fully highlighted, start icons layout animation
        const textIsFullyHighlighted = highlightIndex >= maxHighlightIndex;

        if (textIsFullyHighlighted) {
          // Text is fully highlighted, now animate icons layout
          // Increased from 1.5 to 2.0
          iconsProgress = Math.min(iconsProgress + progressStep * 2.0, 1);
        }
      } else {
        // REVERSE ANIMATION: First icons layout, then text highlight
        // Important change: Only unhighlight text after icons are fully retracted

        // When reversing, use a faster speed for icons layout
        // Increased from 3.5 to 4.5
        const reverseIconStep = progressStep * 4.5;

        // First check if icons are fully retracted (if they were active)
        if (iconsProgress > 0) {
          // Handle the icons layout animation on reverse first
          iconsProgress = Math.max(iconsProgress + reverseIconStep, 0);

          // Keep text fully highlighted while icons are retracting
          highlightIndex = maxHighlightIndex;
        } else {
          // Only after icons are retracted (iconsProgress = 0), handle text unhighlighting
          // Unhighlight words one by one from end to beginning
          // Increased from 8 to 12 for faster text unhighlighting
          const textUnhighlightStep = progressStep * 12;
          highlightIndex = Math.max(highlightIndex + Math.floor(textUnhighlightStep), -1);
        }
      }

      // Only cap the third animation progress after checking animations
      const finalThirdProgress = Math.min(Math.max(newThirdProgress, 0), 1);

      // Check if animation is complete (icons animation must be complete)
      const isCompleted = scrollDirection > 0 && iconsProgress >= 1;

      // Handle reverse animation - transition back to animation 2 when scrolling up
      // and third animation progress reaches 0
      if (finalThirdProgress <= 0.05 && highlightIndex < 0 && scrollDirection < 0) {
        // At the beginning, prevent scrolling back
        document.body.classList.add('scroll-disabled');

        // Reset accumulators
        textTransitionScrollAccRef.current = 0;
        totalScrollRef.current = 0;
        isScrollingRef.current = false;

        // Clear any pending timeouts
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Transition back to animation 2 with reverse blur effect
        setTimeout(() => {
          // Ensure we're at the top of the page for animation 2
          window.scrollTo({
            top: 0,
            behavior: 'auto',
          });

          // Start with blurred text that gradually becomes clear
          setTextTransitionProgress(0.8); // Start partially blurred for smoother transition

          setAnimState(prev => ({
            ...prev,
            showThirdAnim: false,
            showSecondAnim: true,
            secondAnimSpeed: 1,
            showText: true,
            // Reset all progress values to prevent stuck states
            thirdAnimProgress: 0,
            lottieThirdProgress: 0,
            textHighlightIndex: -1,
            iconsLayoutProgress: 0,
            animationCompleted: false,
          }));

          // Animate the text transition from blurred to clear
          setTimeout(() => {
            const duration = 400; // ms - reduced from 500 for faster transition
            const steps = 15; // reduced from 20 for faster transition
            const interval = duration / steps;

            let step = 0;
            const animateTextAppearance = () => {
              step++;
              // Start from 0.8 blur and go to 0
              const newProgress = 0.8 * (1 - step / steps);
              setTextTransitionProgress(newProgress);

              if (step < steps) {
                setTimeout(animateTextAppearance, interval);
              }
            };

            // Start the animation
            animateTextAppearance();
          }, 100);
        }, 200);

        return {
          ...prev,
          thirdAnimProgress: 0,
          lottieThirdProgress: 0,
          textHighlightIndex: -1,
          iconsLayoutProgress: 0,
          animationCompleted: false,
        };
      }

      // If we've reached the end of the animation, allow normal scrolling
      if (isCompleted && scrollDirection > 0) {
        // Remove scroll lock permanently for scrolling down
        document.body.classList.remove('scroll-disabled');

        // After a short delay, let the actual page scroll happen
        setTimeout(() => {
          window.scrollBy({
            top: 100,
            behavior: 'smooth',
          });
        }, 200); // Reduced from 300ms for faster transition
      } else {
        // During animation, disable normal scrolling
        document.body.classList.add('scroll-disabled');
      }

      return {
        ...prev,
        thirdAnimProgress: finalThirdProgress,
        lottieThirdProgress: newLottieProgress,
        textHighlightIndex: highlightIndex,
        animationCompleted: isCompleted,
        iconsLayoutProgress: iconsProgress,
      };
    });
  }, [overlayTextWords.length]);

  // Handle animation 2 scroll control
  const handleSecondAnimScroll = (deltaY: number) => {
    // Mark that user has scrolled during animation 2
    if (!animState.hasScrolledDuringAnim2) {
      console.log('User started scrolling during animation 2');

      // Clear the auto-loop interval
      if (anim2IntervalRef.current) {
        clearInterval(anim2IntervalRef.current);
        anim2IntervalRef.current = null;
      }

      // Set flag to indicate user has scrolled
      setAnimState(prev => ({
        ...prev,
        hasScrolledDuringAnim2: true,
        secondAnimSpeed: 0, // Stop the automatic animation
      }));
    }

    // Process scroll based on direction
    const scrollDirection = deltaY > 0 ? 'down' : 'up';
    setScrollDirection(scrollDirection as 'up' | 'down');

    // Only proceed with animation control if scrolling down
    if (scrollDirection === 'down') {
      // Calculate text transition progress
      textTransitionScrollAccRef.current += Math.abs(deltaY);

      // Determine threshold based on current position - adjust the divisor to control sensitivity
      // Lower numbers = faster transition
      const scrollThreshold = 500;
      const textProgress = Math.min(
        Math.max(textTransitionScrollAccRef.current / scrollThreshold, 0),
        1
      );

      // Update text transition
      setTextTransitionProgress(textProgress);

      // Synchronize animation progress with text transition
      // This ensures both finish at the same time
      // const newAnimProgress = animState.secondAnimProgress + remainingProgress * (textProgress / 1);

      setAnimState(prev => {
        // Apply speed boost for animations that start further from completion
        // The lower the starting position, the faster it needs to move
        const speedBoost = 1 + (1 - prev.secondAnimProgress) * 0.5;
        const finalProgress = Math.min(
          prev.secondAnimProgress + (textProgress - prev.secondAnimProgress / 1) * speedBoost,
          1
        );

        // Check if animation has completed
        if (finalProgress >= 0.99 || textProgress >= 0.99) {
          // Transition to animation 3 when complete
          console.log('Animation 2 completed via scroll, transitioning to animation 3');
          isAnim2TransitioningRef.current = true;

          // Add scroll-disabled class to body
          if (typeof document !== 'undefined') {
            document.body.classList.add('scroll-disabled');
          }

          // Transition to animation 3 after a short delay
          setTimeout(() => {
            // Ensure we're at the top of the page for animation 3
            if (typeof window !== 'undefined') {
              window.scrollTo({
                top: 0,
                behavior: 'auto',
              });
            }

            // Reset accumulators
            textTransitionScrollAccRef.current = 0;
            totalScrollRef.current = 0;
            isScrollingRef.current = false;

            // Clear any pending timeouts
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current);
            }

            setAnimState(prev => ({
              ...prev,
              showSecondAnim: false,
              showThirdAnim: true,
              showText: false,
              thirdAnimProgress: 0,
              lottieThirdProgress: 0,
              textHighlightIndex: -1,
              iconsLayoutProgress: 0,
              animationCompleted: false,
              hasScrolledDuringAnim2: false,
            }));

            // Reset text transition
            setTextTransitionProgress(0);
            isAnim2TransitioningRef.current = false;
          }, 200);
        }

        return {
          ...prev,
          secondAnimProgress: finalProgress,
          animationDirection: 'forward',
        };
      });
    } else {
      // For scrolling up, maintain existing behavior
      // Calculate scroll impact on animation progress
      const scrollImpact = Math.abs(deltaY) * 0.001;

      // Calculate dynamic speed based on current progress position
      const calculateSpeedFactor = (progress: number) => {
        const distanceFromMiddle = Math.abs(0.5 - progress);
        return 1 - 0.6 * distanceFromMiddle; // Ranges from 0.4-1.0
      };

      setAnimState(prev => {
        // Current animation state
        const currentProgress = prev.secondAnimProgress;

        // Apply speed factor based on current progress
        const speedFactor = calculateSpeedFactor(currentProgress);
        const adjustedScrollImpact = scrollImpact * speedFactor;

        // Scrolling up - reduce progress
        const newProgress = Math.max(currentProgress - adjustedScrollImpact, 0);

        // Also reduce text transition progress
        textTransitionScrollAccRef.current = Math.max(
          0,
          textTransitionScrollAccRef.current - Math.abs(deltaY)
        );
        const textProgress = Math.min(Math.max(textTransitionScrollAccRef.current / 500, 0), 1);
        setTextTransitionProgress(textProgress);

        return {
          ...prev,
          secondAnimProgress: newProgress,
          animationDirection: newProgress <= 0 ? 'forward' : 'reverse',
        };
      });
    }
  };

  // Handle scroll events for animation control and disable default scroll
  useEffect(() => {
    let isSecondAnimTransitioning = false;

    // Disable scrolling when first animation is running
    if (animState.showFirstAnim && typeof document !== 'undefined') {
      document.body.classList.add('scroll-disabled');
    }

    // Touch event handlers for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // If animation is completed or user has scrolled past the section, allow normal touch behavior
      if (animState.animationCompleted || hasLeftSectionRef.current) {
        // Allow normal behavior for completed animations
        return;
      }

      // Prevent default touch behavior during animations
      if (animState.showFirstAnim || animState.showSecondAnim || animState.showThirdAnim) {
        e.preventDefault();

        if (touchStartYRef.current === null) {
          return;
        }

        // Calculate deltaY equivalent for touch
        const currentY = e.touches[0].clientY;
        const deltaY = touchStartYRef.current - currentY;

        // Apply a multiplier to make touch scrolling faster - 3x faster for touch
        const touchSpeedMultiplier = 3.0;
        const enhancedDeltaY = deltaY * touchSpeedMultiplier;

        // Use global scroll direction from hook, converting 'none' to null
        const touchDirection =
          globalScrollDirection === 'none' ? null : (globalScrollDirection as 'up' | 'down');
        setScrollDirection(touchDirection);

        // Process touch for animation 2
        if (animState.showSecondAnim && !animState.showThirdAnim) {
          e.preventDefault();

          // Handle animation 2 scroll
          if (animState.hasScrolledDuringAnim2) {
            // User already scrolling, continue controlling animation
            handleSecondAnimScroll(enhancedDeltaY);
          } else {
            // Determine how to adjust the transition progress based on direction
            if (touchDirection === 'down') {
              // Scrolling down - increase progress
              textTransitionScrollAccRef.current += Math.abs(enhancedDeltaY);
            } else {
              // Scrolling up - decrease progress
              textTransitionScrollAccRef.current = Math.max(
                0,
                textTransitionScrollAccRef.current - Math.abs(enhancedDeltaY)
              );
            }

            // Calculate transition progress based on accumulated scroll
            // We'll use a lower threshold for touch to make it faster
            const scrollThreshold = 300; // Reduced from 500 for faster touch response
            const progress = Math.min(
              Math.max(textTransitionScrollAccRef.current / scrollThreshold, 0),
              1
            );

            // Update text transition
            setTextTransitionProgress(progress);

            // Start controlling animation 2 after small threshold
            if (textTransitionScrollAccRef.current > 60) {
              // Reduced from 100 for faster response
              handleSecondAnimScroll(enhancedDeltaY);
            }

            // If the text has fully transitioned out, move to animation 3
            if (progress >= 1 && !isSecondAnimTransitioning && touchDirection === 'down') {
              isSecondAnimTransitioning = true;

              // Add scroll-disabled class to body
              document.body.classList.add('scroll-disabled');

              // Transition to animation 3 after text fade out
              setTimeout(() => {
                console.log('Transitioning to animation 3 after text fade (touch)');

                // Ensure we're at the top of the page for animation 3
                window.scrollTo({
                  top: 0,
                  behavior: 'auto',
                });

                // Clear any pending timeouts
                if (scrollTimeoutRef.current) {
                  clearTimeout(scrollTimeoutRef.current);
                }

                // Reset accumulators
                textTransitionScrollAccRef.current = 0;
                totalScrollRef.current = 0;
                isScrollingRef.current = false;

                setAnimState(prev => ({
                  ...prev,
                  showSecondAnim: false,
                  showThirdAnim: true,
                  showText: false,
                  thirdAnimProgress: 0,
                  lottieThirdProgress: 0,
                  textHighlightIndex: -1,
                  iconsLayoutProgress: 0,
                  animationCompleted: false,
                  hasScrolledDuringAnim2: false,
                }));

                // Reset text transition
                setTextTransitionProgress(0);
                isSecondAnimTransitioning = false;
              }, 200);
            }
          }
        } else if (animState.showThirdAnim) {
          // Ensure we're at the top of the page during animation 3
          if (window.scrollY > 0) {
            window.scrollTo({
              top: 0,
              behavior: 'auto',
            });
          }

          // If we're already processing a scroll, accumulate the amount
          if (isScrollingRef.current) {
            totalScrollRef.current += enhancedDeltaY;
            return;
          }

          isScrollingRef.current = true;
          totalScrollRef.current = enhancedDeltaY;

          // Process accumulated scroll with shorter delay for touch
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }

          scrollTimeoutRef.current = setTimeout(() => {
            processScroll();
            isScrollingRef.current = false;
          }, 30); // Reduced from 50ms for faster response
        }
      }
    };

    // Reset touch reference when touch ends
    const handleTouchEnd = () => {
      touchStartYRef.current = null;
    };

    const handleWheel = (e: WheelEvent) => {
      // If animation is completed or user has scrolled past the section and back, allow normal scrolling
      if (animState.animationCompleted || hasLeftSectionRef.current) {
        return; // Allow normal scroll behavior
      }

      // Prevent scrolling during first animation
      if (animState.showFirstAnim) {
        e.preventDefault();
        return;
      }

      // Store the original wheel event for later use
      wheelEventRef.current = e;

      // Determine scroll direction
      const wheelDirection = e.deltaY > 0 ? 'down' : 'up';
      setScrollDirection(wheelDirection);

      // Process wheel event for animation 2
      if (animState.showSecondAnim && !animState.showThirdAnim) {
        // Prevent default scrolling during second animation
        e.preventDefault();

        // Handle animation 2 scroll
        if (animState.hasScrolledDuringAnim2) {
          // User already scrolling, continue controlling animation
          handleSecondAnimScroll(e.deltaY);
        } else {
          // Determine how to adjust the transition progress based on direction
          if (wheelDirection === 'down') {
            // Scrolling down - increase progress
            textTransitionScrollAccRef.current += Math.abs(e.deltaY);
          } else {
            // Scrolling up - decrease progress
            textTransitionScrollAccRef.current = Math.max(
              0,
              textTransitionScrollAccRef.current - Math.abs(e.deltaY)
            );
          }

          // Calculate transition progress based on accumulated scroll
          // We'll use 500 as the threshold for complete transition
          const scrollThreshold = 500;
          const progress = Math.min(
            Math.max(textTransitionScrollAccRef.current / scrollThreshold, 0),
            1
          );

          // Update text transition
          setTextTransitionProgress(progress);

          // Start controlling animation 2 after small threshold
          if (textTransitionScrollAccRef.current > 100) {
            handleSecondAnimScroll(e.deltaY);
          }

          // If the text has fully transitioned out, move to animation 3
          if (progress >= 1 && !isSecondAnimTransitioning && wheelDirection === 'down') {
            isSecondAnimTransitioning = true;

            // Add scroll-disabled class to body
            document.body.classList.add('scroll-disabled');

            // Transition to animation 3 after text fade out
            setTimeout(() => {
              console.log('Transitioning to animation 3 after text fade');

              // Ensure we're at the top of the page for animation 3
              window.scrollTo({
                top: 0,
                behavior: 'auto',
              });

              // Clear any pending timeouts
              if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
              }

              // Reset accumulators
              textTransitionScrollAccRef.current = 0;
              totalScrollRef.current = 0;
              isScrollingRef.current = false;

              setAnimState(prev => ({
                ...prev,
                showSecondAnim: false,
                showThirdAnim: true,
                showText: false,
                // Reset animation progress to ensure it starts from the beginning
                thirdAnimProgress: 0,
                lottieThirdProgress: 0,
                textHighlightIndex: -1,
                iconsLayoutProgress: 0,
                animationCompleted: false,
                hasScrolledDuringAnim2: false,
              }));

              // Reset text transition
              setTextTransitionProgress(0);
              isSecondAnimTransitioning = false;
            }, 200);
          }
        }
      } else if (animState.showThirdAnim) {
        // Custom scroll behavior for third animation
        e.preventDefault();

        // Ensure we're at the top of the page during animation 3
        if (window.scrollY > 0) {
          window.scrollTo({
            top: 0,
            behavior: 'auto',
          });
        }

        // If we're already processing a scroll, accumulate the scroll amount
        if (isScrollingRef.current) {
          totalScrollRef.current += e.deltaY;
          return;
        }

        isScrollingRef.current = true;
        totalScrollRef.current = e.deltaY;

        // Process accumulated scroll after a short delay
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          processScroll();
          isScrollingRef.current = false;
        }, 50);
      }
    };

    // At the end of useEffect, safely add event listeners with browser checks
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // Add wheel and touch event listeners
      window.addEventListener('wheel', () => {}, { passive: true });
      window.addEventListener('wheel', handleWheel, { passive: false });

      // Add touch event listeners for mobile
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });

      return () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('wheel', () => {});
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [animState, processScroll, globalScrollDirection]);

  return (
    <div className="hero-start-wrapper">
      {animState.showFirstAnim && (
        <Lottie
          loop={false}
          animationData={getLottieAnimation(1)}
          play
          onComplete={handleFirstAnimComplete}
          style={{ width: '100vw', height: '100vh' }}
          rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
        />
      )}

      {animState.showSecondAnim && (
        <div className="second-animation-container">
          <Lottie
            loop={false}
            animationData={getLottieAnimation(2)}
            play
            speed={animState.secondAnimSpeed}
            goTo={animState.hasScrolledDuringAnim2 ? animState.secondAnimProgress * 100 : undefined}
            style={{ width: '100vw', height: '100vh' }}
            rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
          />
        </div>
      )}

      {animState.showThirdAnim && (
        <div className="third-animation-container">
          <Lottie
            loop={false}
            animationData={getLottieAnimation(3)}
            play
            speed={0}
            goTo={animState.lottieThirdProgress * 100}
            style={{ width: '100vw', height: '100vh' }}
            rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
          />

          <div className="hero-content-overlay visible">
            <div className="overlay-text">
              <div className="text-sentence">{renderOverlayText()}</div>
            </div>
          </div>

          <div className="hero-icons-layout-container" style={getIconsLayoutStyle()}>
            <HeroIconsLayout />
          </div>
        </div>
      )}

      {animState.showText && !animState.showThirdAnim && (
        <div
          className={`login-text ${animState.showText ? 'fade-in' : ''} transitioning`}
          style={getTextTransitionStyles()}
        >
          <h1 className="hero-start-title">Be Part of the AI Revolution</h1>
          <p className="hero-start-description">
            Join a global network of experts training LLMs. Work remotely, earn in dollars, and
            Shape the future of AI
          </p>
          <div className="hero-start-button">
            <Button text="Apply Now" mode="hybrid" onClick={() => {}} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroStart;
