'use client';

import Button from '@/components/shared/Button';
import { IAnimationState } from '@/interfaces/components/hero.type';
import { ILottieFile } from '@/interfaces/components/lottie.type';
import { IHeroLottieFiles } from '@/interfaces/components/heroLottie.type';
import useScrollPosition from '@/lib/hooks/useScrollPosition';
import useDeviceType from '@/lib/hooks/useDeviceType';
import { useCallback, useEffect, useRef, useState } from 'react';
import Lottie from 'react-lottie-player';
import HeroIconsLayout from './HeroIconsLayout';

const HeroStart = () => {
  // ======== HOOKS ========
  const { scrollY, scrollDirection: globalScrollDirection } = useScrollPosition();
  const deviceType = useDeviceType();

  // ======== STATE VARIABLES ========
  // Animation state
  const [animState, setAnimState] = useState<IAnimationState>({
    firstAnimCompleted: false, // Controls first animation state
    showSecondAnim: false,
    showThirdAnim: false,
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

  // Lottie animations state
  const [lottieFiles, setLottieFiles] = useState<IHeroLottieFiles>({
    desktop: {},
    mobile: {},
    tablet: {},
  });

  // Text transition state
  const [textTransitionProgress, setTextTransitionProgress] = useState(0);
  // Using scrollDirection to control animation behavior, so suppressing the linter warning
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

  // ======== REFS ========
  // Scroll tracking refs
  const wheelEventRef = useRef<WheelEvent | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const totalScrollRef = useRef<number>(0);
  const isScrollingRef = useRef<boolean>(false);
  const hasLeftSectionRef = useRef<boolean>(false);
  const textTransitionScrollAccRef = useRef<number>(0);

  // Animation control refs
  const anim2IntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAnim2TransitioningRef = useRef<boolean>(false);
  const isAtAnimationEndpointRef = useRef<boolean>(false);

  // ======== CONSTANTS ========
  // Text content
  const overlayTextWords =
    'Shape the Future of AI  with Flexible, High Impact Remote opportunities across 50+ domains tailored for your expertise!'.split(
      ' '
    );

  // Special texts that need gradient effects
  const futureOfAiText = 'Future of AI ';
  const domainsText = '50+ domains';

  // ======== EFFECTS ========
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
              1: lottie1.default as ILottieFile, 
              2: lottie2.default as ILottieFile, 
              3: lottie3.default as ILottieFile 
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
              1: lottiem1.default as ILottieFile, 
              2: lottiem2.default as ILottieFile, 
              3: lottiem3.default as ILottieFile 
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
              1: lottiet1.default as ILottieFile, 
              2: lottiet2.default as ILottieFile, 
              3: lottiet3.default as ILottieFile 
            }
          }));
        }
      } catch (error) {
        console.error('Failed to load Lottie animations:', error);
      }
    };

    loadAnimations();
  }, [deviceType]);

  // Set up CSS styles for hero section
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

        .login-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          width: 100%;
          max-width: 800px;
          transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out, filter 0.4s ease-in-out;
          will-change: opacity, transform, filter;
          z-index: 10;
        }

        .login-text.fade-in {
          animation: fadeInText 0.5s ease-in-out forwards;
        }

        @keyframes fadeInText {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `;
      document.head.appendChild(styleTag);

      return () => {
        document.head.removeChild(styleTag);
      };
    }
  }, []);

  // ======== UTILITY FUNCTIONS ========
  // Get appropriate Lottie animation based on device
  const getLottieAnimation = (index: 1 | 2 | 3) => {
    if (deviceType === 'mobile') {
      return lottieFiles.mobile[index];
    } else if (deviceType === 'tablet') {
      return lottieFiles.tablet[index];
    } else {
      return lottieFiles.desktop[index];
    }
  };

  // Render overlay text with gradient effects
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
            {isHighlighted && <img src="./assets/stars.svg" className="star-icon" loading="eager" />}
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
  
  // ======== ANIMATION HANDLERS ========
  // Handle first animation completion
  const handleFirstAnimComplete = () => {
    // Add a small delay before showing text to avoid potential flashing
    // This ensures DOM is ready for animations
    setTimeout(() => {
      setTextTransitionProgress(0);
      setAnimState(prev => ({
        ...prev,
        firstAnimCompleted: true,
        showSecondAnim: true,
        showText: true,
        animationDirection: 'forward',
        secondAnimSpeed: 1,
        secondAnimProgress: 0,
        hasScrolledDuringAnim2: false,
      }));
    }, 50); // Small delay to ensure DOM is ready

    console.log('handleFirstAnimComplete');

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

  // ======== ANIMATION HANDLERS ========
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

      // Force immediate direction change if we're at an endpoint
      if (isAtAnimationEndpointRef.current) {
        setAnimState(prev => {
          // If we're at end (1.0), prepare to go reverse
          if (prev.secondAnimProgress >= 0.99) {
            return {
              ...prev,
              animationDirection: 'reverse',
              secondAnimSpeed: -1,
            };
          } 
          // If we're at beginning (0.0), prepare to go forward
          else if (prev.secondAnimProgress <= 0.01) {
            return {
              ...prev,
              animationDirection: 'forward',
              secondAnimSpeed: 1,
            };
          }
          return prev;
        });
        
        // Reset the flag
        isAtAnimationEndpointRef.current = false;
      }

      // Set up new interval for animation loop with a more robust approach
      anim2IntervalRef.current = setInterval(() => {
        setAnimState(prev => {
          // Handle direction change at endpoints
          if (prev.animationDirection === 'forward' && prev.secondAnimProgress >= 0.99) {
            // Mark that we've reached an endpoint
            isAtAnimationEndpointRef.current = true;
            
            // Change to reverse when reaching the end
            return {
              ...prev,
              animationDirection: 'reverse',
              secondAnimSpeed: -1,
              // Force a small adjustment to ensure we continue moving
              secondAnimProgress: 0.99
            };
          } else if (prev.animationDirection === 'reverse' && prev.secondAnimProgress <= 0.01) {
            // Mark that we've reached an endpoint
            isAtAnimationEndpointRef.current = true;
            
            // Change to forward when reaching the beginning
            return {
              ...prev,
              animationDirection: 'forward',
              secondAnimSpeed: 1,
              // Force a small adjustment to ensure we continue moving
              secondAnimProgress: 0.01
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
          anim2IntervalRef.current = null;
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

  // Log state changes for debugging
  useEffect(() => {
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
      if (animState.animationCompleted && animState.firstAnimCompleted) {
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
      }
    }
  }, [scrollY, animState.animationCompleted, animState.firstAnimCompleted, overlayTextWords.length]);

  // ======== SCROLL HANDLING ========
  // Process accumulated scroll for animation 3
  const processScroll = useCallback(() => {
    // Calculate new progress and text highlight based on accumulated scroll
    const scrollAmount = totalScrollRef.current;
    const scrollDirection = scrollAmount > 0 ? 1 : -1;

    // Reset the scroll accumulator
    totalScrollRef.current = 0;

    // Update the animation progress
    setAnimState(prev => {
      // For smoother transitions, adjust the step size based on direction
      // Use balanced multipliers for touch-based interactions
      const progressMultiplier = scrollDirection < 0 ? 0.07 : 0.12; // Adjusted from 0.08/0.15
      const progressStep = progressMultiplier * Math.sign(scrollAmount);
      const newThirdProgress = prev.thirdAnimProgress + progressStep;

      // Continuously update Lottie animation progress regardless of text highlighting
      const lottieMultiplier = scrollDirection < 0 ? 1.8 : 2.5; // Adjusted from 2.0/2.8
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

        // Update text highlight index with balanced speed
        highlightIndex = Math.min(
          Math.floor(Math.min(newThirdProgress, 1) * overlayTextWords.length * 1.35), // Adjusted from 1.5
          maxHighlightIndex
        );

        // After text is fully highlighted, start icons layout animation
        const textIsFullyHighlighted = highlightIndex >= maxHighlightIndex;

        if (textIsFullyHighlighted) {
          // Text is fully highlighted, now animate icons layout
          iconsProgress = Math.min(iconsProgress + progressStep * 2.2, 1); // Adjusted from 2.5
        }
      } else {
        // REVERSE ANIMATION: First icons layout, then text highlight
        
        // When reversing, use a balanced speed for icons layout
        const reverseIconStep = progressStep * 5.2; // Adjusted from 6.0

        // First check if icons are fully retracted (if they were active)
        if (iconsProgress > 0) {
          // Handle the icons layout animation on reverse first
          iconsProgress = Math.max(iconsProgress + reverseIconStep, 0);

          // Keep text fully highlighted while icons are retracting
          highlightIndex = maxHighlightIndex;
        } else {
          // Unhighlight words one by one from end to beginning 
          const textUnhighlightStep = progressStep * 14; 
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
          setTextTransitionProgress(0.8);

          setAnimState(prev => ({
            ...prev,
            showThirdAnim: false,
            showSecondAnim: true,
            secondAnimSpeed: 1,
            showText: true,
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

  // Touch event handlers
  const handleTouchEnd = () => {
    touchStartYRef.current = null;
  };

  // Update touchStartY on touch moves to handle continuous gestures better
  const handleTouchUpdate = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      // Always update the touch position, regardless of scroll state
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  // Wheel event handler
  const handleWheel = (e: WheelEvent) => {
    // If animation is completed or user has scrolled past the section and back, allow normal scrolling
    if (animState.animationCompleted || hasLeftSectionRef.current) {
      return; // Allow normal scroll behavior
    }

    // Prevent scrolling during first animation
    if (!animState.firstAnimCompleted) {
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
        if (progress >= 1 && !isAnim2TransitioningRef.current && wheelDirection === 'down') {
          isAnim2TransitioningRef.current = true;

          // Add scroll-disabled class to body
          document.body.classList.add('scroll-disabled');

          // Transition to animation 3 after text fade out
          setTimeout(() => {
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
            isAnim2TransitioningRef.current = false;
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

  // Handle scroll events for animation control and disable default scroll
  useEffect(() => {
    let isSecondAnimTransitioning = false;

    // Disable scrolling when first animation is running
    if (!animState.firstAnimCompleted && typeof document !== 'undefined') {
      document.body.classList.add('scroll-disabled');
    }

    // Touch event handlers for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Only process if we have a valid starting touch position
      if (touchStartYRef.current === null) {
        return;
      }
      
      // If animation is completed or user has scrolled past the section, allow normal touch behavior
      if (animState.animationCompleted || hasLeftSectionRef.current) {
        return; // Allow normal behavior for completed animations
      }

      // Calculate deltaY equivalent for touch
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - currentY;
      
      // Only prevent default if we're actually handling the touch - adjusted threshold
      if (Math.abs(deltaY) > 3 && (!animState.firstAnimCompleted || animState.showSecondAnim || animState.showThirdAnim)) {
        e.preventDefault();

        // Apply a balanced multiplier for responsive but not too fast scrolling
        const touchSpeedMultiplier = 6.5; // Adjusted from 8.0 for slightly slower response
        const enhancedDeltaY = deltaY * touchSpeedMultiplier;

        // Use global scroll direction from hook, converting 'none' to null
        const touchDirection = deltaY > 0 ? 'down' : 'up';
        setScrollDirection(touchDirection as 'up' | 'down');

        // Process touch for animation 2
        if (animState.showSecondAnim && !animState.showThirdAnim) {
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
            const scrollThreshold = 150; // Adjusted from 120 for slightly slower response
            const progress = Math.min(
              Math.max(textTransitionScrollAccRef.current / scrollThreshold, 0),
              1
            );

            // Update text transition
            setTextTransitionProgress(progress);

            // Start controlling animation 2 after small threshold for touch
            if (textTransitionScrollAccRef.current > 20) { // Adjusted from 15 for slightly slower response
              handleSecondAnimScroll(enhancedDeltaY);
            }

            // If the text has fully transitioned out, move to animation 3
            if (progress >= 0.9 && !isSecondAnimTransitioning && touchDirection === 'down') { // Adjusted from 0.85
              isSecondAnimTransitioning = true;

              // Add scroll-disabled class to body
              document.body.classList.add('scroll-disabled');

              // Transition to animation 3 after text fade out
              setTimeout(() => {
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
              }, 175); // Adjusted from 150ms for slightly slower transition
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
          }, 15); // Adjusted from 10ms for slightly slower response
        }
      }
    };

    // At the end of useEffect, safely add event listeners with browser checks
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // Add wheel and touch event listeners
      window.addEventListener('wheel', () => {}, { passive: true });
      window.addEventListener('wheel', handleWheel, { passive: false });

      // Add touch event listeners for mobile with improved configuration
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });
      // Add an update handler that runs after each frame to improve continuous touch tracking
      window.addEventListener('touchmove', handleTouchUpdate, { passive: true });

      return () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('wheel', () => {});
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('touchmove', handleTouchUpdate);
      };
    }
  }, [animState, processScroll, globalScrollDirection]);

  return (
    <div className="hero-start-wrapper">
      {!animState.firstAnimCompleted && (
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
