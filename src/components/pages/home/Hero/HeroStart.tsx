"use client"

import Lottie from "react-lottie-player";
import { useState, useEffect, useRef } from "react";
import lottie1 from "../../../../../public/assets/hero-json/H1.json";
import lottie2 from "../../../../../public/assets/hero-json/H2.json";
import lottie3 from "../../../../../public/assets/hero-json/H3.json";
import lottiem1 from "../../../../../public/assets/hero-json/mobile/H1.json";
import lottiem2 from "../../../../../public/assets/hero-json/mobile/H2.json";
import lottiem3 from "../../../../../public/assets/hero-json/mobile/H3.json";
import lottiet1 from "../../../../../public/assets/hero-json/tablet/H1.json"; 
import lottiet2 from "../../../../../public/assets/hero-json/tablet/H2.json";
import lottiet3 from "../../../../../public/assets/hero-json/tablet/H3.json";
import Button from "@/components/shared/Button";
import HeroIconsLayout from "./HeroIconsLayout";
import { IAnimationState } from "@/interfaces/components/hero.type";
type DeviceType = 'desktop' | 'tablet' | 'mobile';

const HeroStart = () => {
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
    textFullyHighlighted: false
  });
  
  // Add state for text transition
  const [textTransitionProgress, setTextTransitionProgress] = useState(0);
  // Using scrollDirection to control animation behavior, so suppressing the linter warning
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  
  // Detect device type based on window width
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const width = window.innerWidth;
        if (width <= 493) {
          setDeviceType('mobile');
        } else if (width <= 1024) {
          setDeviceType('tablet');
        } else {
          setDeviceType('desktop');
        }
      };
      
      // Initial detection
      handleResize();
      
      // Add listener for window resize
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Get the appropriate Lottie animations based on device type
  const getLottieAnimation = (index: 1 | 2 | 3) => {
    if (deviceType === 'mobile') {
      return index === 1 ? lottiem1 : index === 2 ? lottiem2 : lottiem3;
    } else if (deviceType === 'tablet') {
      return index === 1 ? lottiet1 : index === 2 ? lottiet2 : lottiet3;
    } else {
      return index === 1 ? lottie1 : index === 2 ? lottie2 : lottie3;
    }
  };
  
  // Modified overlay text with span wrappers around "Future of AI" and "50+ domains"
  const overlayTextWords = "Shape the Future of AI with Flexible, High Impact Remote opportunities across 50+ domains tailored for your expertise!".split(" ");
  
  // Special texts that need gradient effects
  const futureOfAiText = "Future of AI";
  const domainsText = "50+ domains";

  // Modified render function for overlay text to handle special gradient text
  const renderOverlayText = () => {
    const result = [];
    let currentIndex = 0;
    
    for (let i = 0; i < overlayTextWords.length; i++) {
      const word = overlayTextWords[i];
      
      // Determine the word state
      let className = "text-word";
      if (i <= animState.textHighlightIndex) {
        className += " active";
      } else if (i === animState.textHighlightIndex + 1) { 
        // First intermediate state (closest to active)
        className += " transitioning-1";
      } else if (i === animState.textHighlightIndex + 2) {
        // Second intermediate state
        className += " transitioning-2";
      }
      
      // Check if this word is part of "Future of AI"
      if (word === "Future" && i + 2 < overlayTextWords.length && 
          overlayTextWords[i + 1] === "of" && overlayTextWords[i + 2] === "AI") {
        result.push(
          <span key={currentIndex} className={`${className} gradient-future-ai`}>
            {futureOfAiText}{' '}
          </span>
        );
        i += 2; // Skip the next two words
      }
      // Check if this word is "50+ domains"
      else if (word === "50+" && i + 1 < overlayTextWords.length && 
               overlayTextWords[i + 1] === "domains") {
        result.push(
          <span key={currentIndex} className={`${className} gradient-domains`}>
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

  // Handle first animation completion
  const handleFirstAnimComplete = () => {
    console.log("First animation completed");
    // Set initial text transition to fully visible
    setTextTransitionProgress(0);
    
    setAnimState((prev) => ({
      ...prev,
      showFirstAnim: false,
      firstAnimCompleted: true,
      showSecondAnim: true,
      showText: true,
    }));
    
    // Remove scroll lock after first animation completes
    document.body.classList.remove('scroll-disabled');
  };

  // Calculate text transition styles based on progress
  const getTextTransitionStyles = () => {
    
    const progress = textTransitionProgress;
    const scale = 1 - (progress * 0.03);
    const blur = progress * 4;
    const opacity = 1 - progress;
    
    return {
      transform: `translate(-50%, -50%) scale(${scale}, ${scale})`,
      filter: `blur(${blur}px)`,
      opacity
    };
  };

  // Log state changes for debugging
  useEffect(() => {
    console.log("Animation state updated:", animState);
    
    // Check if text is fully highlighted (all words are white)
    if (!animState.textFullyHighlighted && 
        animState.textHighlightIndex >= overlayTextWords.length - 1) {
      setAnimState(prev => ({
        ...prev,
        textFullyHighlighted: true
      }));
    }
  }, [animState, overlayTextWords.length]);

  // Check if user has scrolled past the hero section
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkScrollPosition = () => {
        const heroHeight = window.innerHeight;
        if (window.scrollY > heroHeight) {
          hasLeftSectionRef.current = true;
        } else if (window.scrollY < 100 && hasLeftSectionRef.current) {
          // User has returned to hero section
          hasLeftSectionRef.current = false;
          
          // Only reset if animation was completed before
          if (animState.animationCompleted && !animState.showFirstAnim) {
            console.log("Returning to hero section - resetting to animation 3 in reverse");
            
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
              textFullyHighlighted: true
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
            console.log("Scroll to control the reverse animation");
          }
        }
      };

      window.addEventListener('scroll', checkScrollPosition, { passive: true });
      return () => window.removeEventListener('scroll', checkScrollPosition);
    }
  }, [animState, overlayTextWords.length]);

  // Calculate icon layout position and opacity
  const getIconsLayoutStyle = () => {
    if (!animState.textFullyHighlighted) {
      return {
        transform: 'translateY(100%)',
        opacity: 0
      };
    }

    // After text is fully highlighted, start showing icons layout
    const progress = animState.iconsLayoutProgress;
    
    // Calculate starting position (100% = bottom of screen)
    // Move from 100% (bottom) to -30% (30% above the top)
    const translateY = 100 - (progress * 130);
    
    // Calculate opacity - fully visible in the middle of the journey
    let opacity = 0;
    if (progress < 0.3) {
      // Fade in from 0 to 1 during first 20% of progress
      opacity = progress / 0.2;
    } else if (progress > 0.7) {
      // Fade out from 1 to 0 during last 20% of progress
      opacity = 1 - ((progress - 0.8) / 0.2);
    } else {
      // Fully visible in the middle
      opacity = 1;
    }
    
    return {
      transform: `translateY(${translateY}%)`,
      opacity
    };
  };

  // Add a style that ensures the hero section covers the full viewport
  useEffect(() => {
    if(typeof document !== "undefined"){
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
        
        .gradient-future-ai {
          background: linear-gradient(85deg, #8591FF 34.63%, #D574E2 58.16%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        
        .gradient-domains {
          background: linear-gradient(90deg, #8591FF 17.98%, #D574E2 36.59%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
      `;
      document.head.appendChild(styleTag);
      
      return () => {
        document.head.removeChild(styleTag);
      };
    }

  }, []);

  // Modify the processScroll function for better scroll-based control
  const processScroll = () => {
    // Calculate new progress and text highlight based on accumulated scroll
    const scrollAmount = totalScrollRef.current;
    const scrollDirection = scrollAmount > 0 ? 1 : -1;
    
    // Reset the scroll accumulator
    totalScrollRef.current = 0;
    
    // Update the animation progress
    setAnimState((prev) => {
      // For smoother transitions, adjust the step size based on direction
      // Smaller steps when reversing for better control
      const progressMultiplier = scrollDirection < 0 ? 0.03 : 0.05;
      const progressStep = progressMultiplier * Math.sign(scrollAmount);
      const newThirdProgress = prev.thirdAnimProgress + progressStep;
      
      // Continuously update Lottie animation progress regardless of text highlighting
      const lottieMultiplier = scrollDirection < 0 ? 0.8 : 1.4;
      const newLottieProgress = Math.max(prev.lottieThirdProgress + (progressStep * lottieMultiplier), 0);
      
      // Calculate max highlight index
      const maxHighlightIndex = overlayTextWords.length - 1;
      
      // Handle different animation order for forward vs reverse
      let iconsProgress = prev.iconsLayoutProgress;
      let highlightIndex = prev.textHighlightIndex;
      
      if (scrollDirection > 0) {
        // FORWARD ANIMATION: First text highlight, then icons layout
        
        // Update text highlight index
        highlightIndex = Math.min(
          Math.floor(Math.min(newThirdProgress, 1) * overlayTextWords.length),
          maxHighlightIndex
        );
        
        // After text is fully highlighted, start icons layout animation
        const textIsFullyHighlighted = highlightIndex >= maxHighlightIndex;
        
        if (textIsFullyHighlighted) {
          // Text is fully highlighted, now animate icons layout
          iconsProgress = Math.min(iconsProgress + (progressStep * 0.6), 1);
        }
      } else {
        // REVERSE ANIMATION: First icons layout, then text highlight
        // Important change: Only unhighlight text after icons are fully retracted
        
        // When reversing, use a faster speed for icons layout
        // Changed from 0.5 to 0.8 for faster reverse movement
        const reverseIconStep = progressStep * 1.4;
        
        // First check if icons are fully retracted (if they were active)
        if (iconsProgress > 0) {
          // Handle the icons layout animation on reverse first
          iconsProgress = Math.max(iconsProgress + reverseIconStep, 0);
          
          // Keep text fully highlighted while icons are retracting
          highlightIndex = maxHighlightIndex;
        } else {
          // Only after icons are retracted (iconsProgress = 0), handle text unhighlighting
          // Unhighlight words one by one from end to beginning
          const textUnhighlightStep = progressStep * 5; // Adjust for desired speed
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
            behavior: 'auto'
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
            animationCompleted: false
          }));
          
          // Animate the text transition from blurred to clear
          setTimeout(() => {
            const duration = 500; // ms - longer for smoother transition
            const steps = 20; // more steps for smoother transition
            const interval = duration / steps;
            
            let step = 0;
            const animateTextAppearance = () => {
              step++;
              // Start from 0.8 blur and go to 0
              const newProgress = 0.8 * (1 - (step / steps));
              setTextTransitionProgress(newProgress);
              
              if (step < steps) {
                setTimeout(animateTextAppearance, interval);
              }
            };
            
            // Start the animation
            animateTextAppearance();
          }, 100);
        }, 300);
        
        return {
          ...prev,
          thirdAnimProgress: 0,
          lottieThirdProgress: 0,
          textHighlightIndex: -1,
          iconsLayoutProgress: 0,
          animationCompleted: false
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
            behavior: 'smooth' 
          });
        }, 300);
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
        iconsLayoutProgress: iconsProgress
      };
    });
  };

  // Handle scroll events for animation control and disable default scroll
  useEffect(() => {
    let isSecondAnimTransitioning = false;

    // Disable scrolling when first animation is running
    if (animState.showFirstAnim && typeof document !== "undefined") {
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
        
        // Determine scroll direction
        const touchDirection = deltaY > 0 ? 'down' : 'up';
        setScrollDirection(touchDirection);
        
        // Process touch for animation 2
        if (animState.showSecondAnim && !animState.showThirdAnim) {
          e.preventDefault();
          
          // Determine how to adjust the transition progress based on direction
          if (touchDirection === 'down') {
            // Scrolling down - increase progress
            textTransitionScrollAccRef.current += Math.abs(deltaY);
          } else {
            // Scrolling up - decrease progress
            textTransitionScrollAccRef.current = Math.max(0, textTransitionScrollAccRef.current - Math.abs(deltaY));
          }
          
          // Calculate transition progress based on accumulated scroll
          // We'll use 500 as the threshold for complete transition
          const scrollThreshold = 500;
          const progress = Math.min(Math.max(textTransitionScrollAccRef.current / scrollThreshold, 0), 1);
          
          // Update text transition
          setTextTransitionProgress(progress);
          
          // If the text has fully transitioned out, move to animation 3
          if (progress >= 1 && !isSecondAnimTransitioning && touchDirection === 'down') {
            isSecondAnimTransitioning = true;
            
            // Add scroll-disabled class to body
            document.body.classList.add('scroll-disabled');
            
            // Transition to animation 3 after text fade out
            setTimeout(() => {
              console.log("Transitioning to animation 3 after text fade (touch)");
              
              // Ensure we're at the top of the page for animation 3
              window.scrollTo({
                top: 0,
                behavior: 'auto'
              });
              
              // Clear any pending timeouts
              if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
              }
              
              // Reset accumulators
              textTransitionScrollAccRef.current = 0;
              totalScrollRef.current = 0;
              isScrollingRef.current = false;
              
              setAnimState((prev) => ({
                ...prev,
                showSecondAnim: false,
                showThirdAnim: true,
                showText: false,
                thirdAnimProgress: 0,
                lottieThirdProgress: 0,
                textHighlightIndex: -1,
                iconsLayoutProgress: 0,
                animationCompleted: false
              }));
              
              // Reset text transition
              setTextTransitionProgress(0);
              isSecondAnimTransitioning = false;
            }, 300);
          }
        } 
        else if (animState.showThirdAnim) {
          // Ensure we're at the top of the page during animation 3
          if (window.scrollY > 0) {
            window.scrollTo({
              top: 0,
              behavior: 'auto'
            });
          }
          
          // If we're already processing a scroll, accumulate the amount
          if (isScrollingRef.current) {
            totalScrollRef.current += deltaY;
            return;
          }
          
          isScrollingRef.current = true;
          totalScrollRef.current = deltaY;
          
          // Process accumulated scroll after a short delay
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
          
          scrollTimeoutRef.current = setTimeout(() => {
            processScroll();
            isScrollingRef.current = false;
          }, 50);
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
        
        // Determine how to adjust the transition progress based on direction
        if (wheelDirection === 'down') {
          // Scrolling down - increase progress
          textTransitionScrollAccRef.current += Math.abs(e.deltaY);
        } else {
          // Scrolling up - decrease progress
          textTransitionScrollAccRef.current = Math.max(0, textTransitionScrollAccRef.current - Math.abs(e.deltaY));
        }
        
        // Calculate transition progress based on accumulated scroll
        // We'll use 500 as the threshold for complete transition
        const scrollThreshold = 500;
        const progress = Math.min(Math.max(textTransitionScrollAccRef.current / scrollThreshold, 0), 1);
        
        // Update text transition
        setTextTransitionProgress(progress);
        
        // If the text has fully transitioned out, move to animation 3
        if (progress >= 1 && !isSecondAnimTransitioning && wheelDirection === 'down') {
          isSecondAnimTransitioning = true;
          
          // Add scroll-disabled class to body
          document.body.classList.add('scroll-disabled');
          
          // Transition to animation 3 after text fade out
          setTimeout(() => {
            console.log("Transitioning to animation 3 after text fade");
            
            // Ensure we're at the top of the page for animation 3
            window.scrollTo({
              top: 0,
              behavior: 'auto'
            });
            
            // Clear any pending timeouts
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current);
            }
            
            // Reset accumulators
            textTransitionScrollAccRef.current = 0;
            totalScrollRef.current = 0;
            isScrollingRef.current = false;
            
            setAnimState((prev) => ({
              ...prev,
              showSecondAnim: false,
              showThirdAnim: true,
              showText: false,
              // Reset animation progress to ensure it starts from the beginning
              thirdAnimProgress: 0,
              lottieThirdProgress: 0,
              textHighlightIndex: -1,
              iconsLayoutProgress: 0,
              animationCompleted: false
            }));
            
            // Reset text transition
            setTextTransitionProgress(0);
            isSecondAnimTransitioning = false;
          }, 300);
        }
      } 
      else if (animState.showThirdAnim) {
        // Custom scroll behavior for third animation
        e.preventDefault();
        
        // Ensure we're at the top of the page during animation 3
        if (window.scrollY > 0) {
          window.scrollTo({
            top: 0,
            behavior: 'auto'
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
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      // Add scroll, wheel, and touch event listeners
      const checkScrollPosition = () => {
        if (animState.animationCompleted) return;
        
        // Check if user has scrolled past animation section
        if (window.scrollY > window.innerHeight) {
          hasLeftSectionRef.current = true;
        } else if (window.scrollY < 100) {
          // Reset when back at top
          hasLeftSectionRef.current = false;
        }
      };
      
      window.addEventListener('scroll', checkScrollPosition, { passive: true });
      window.addEventListener('wheel', () => {}, { passive: true });
      window.addEventListener('wheel', handleWheel, { passive: false });
      
      // Add touch event listeners for mobile
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      return () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('wheel', () => {});
        window.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [animState, processScroll]);

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
            loop={true}
            animationData={getLottieAnimation(2)}
            play
            speed={animState.secondAnimSpeed}
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
              <div className="text-sentence">
                {renderOverlayText()}
              </div>
            </div>
          </div>
          
          <div 
            className="hero-icons-layout-container"
            style={getIconsLayoutStyle()}
          >
            <HeroIconsLayout />
          </div>
        </div>
      )}

      {animState.showText && !animState.showThirdAnim && (
        <div 
          className={`login-text ${animState.showText ? 'fade-in' : ''} transitioning`}
          style={getTextTransitionStyles()}
        >
          <h1 className="hero-start-title">
            Be Part of the AI Revolution
          </h1>
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