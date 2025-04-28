"use client"

import Lottie from "react-lottie-player";
import { useState, useEffect, useRef } from "react";
import lottie1 from "../../../../../public/assets/hero-json/H1.json";
import lottie2 from "../../../../../public/assets/hero-json/H2.json";
import lottie3 from "../../../../../public/assets/hero-json/H3.json";
import Button from "@/components/shared/Button";
import HeroIconsLayout from "./HeroIconsLayout";

interface IAnimationState {
  showFirstAnim: boolean;
  showSecondAnim: boolean;
  showThirdAnim: boolean;
  firstAnimCompleted: boolean;
  secondAnimSpeed: number;
  thirdAnimProgress: number;
  lottieThirdProgress: number; // Separate progress for Lottie animation
  showText: boolean;
  textHighlightIndex: number;
  animationCompleted: boolean;
  iconsLayoutProgress: number;
  textFullyHighlighted: boolean;
}

const HeroStart = () => {
  const [animState, setAnimState] = useState<IAnimationState>({
    showFirstAnim: true,
    showSecondAnim: false,
    showThirdAnim: false,
    firstAnimCompleted: false,
    secondAnimSpeed: 1,
    thirdAnimProgress: 0,
    lottieThirdProgress: 0, // Initialize separate Lottie progress
    showText: false,
    textHighlightIndex: -1,
    animationCompleted: false,
    iconsLayoutProgress: 0,
    textFullyHighlighted: false
  });
  
  // Split text into words for the word-by-word highlight effect
  const overlayTextWords = "Shape the Future of AI with Flexible, High Impact Remote opportunities across 50+ domains tailored for your expertise!".split(" ");
  
  const wheelEventRef = useRef<WheelEvent | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const totalScrollRef = useRef<number>(0);
  const isScrollingRef = useRef<boolean>(false);
  const hasLeftSectionRef = useRef<boolean>(false);

  // Handle first animation completion
  const handleFirstAnimComplete = () => {
    console.log("First animation completed");
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
    const checkScrollPosition = () => {
      const heroHeight = window.innerHeight;
      if (window.scrollY > heroHeight) {
        hasLeftSectionRef.current = true;
      }
    };

    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

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
    if (progress < 0.2) {
      // Fade in from 0 to 1 during first 20% of progress
      opacity = progress / 0.2;
    } else if (progress > 0.8) {
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
    // Add a style tag to ensure the hero section covers the full viewport
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
  }, []);

  // Handle scroll events for animation control and disable default scroll
  useEffect(() => {
    let isSecondAnimSpeeding = false;
    let secondAnimScrollAccumulator = 0;

    // Disable scrolling when first animation is running
    if (animState.showFirstAnim) {
      document.body.classList.add('scroll-disabled');
    }

    const handleWheel = (e: WheelEvent) => {
      // If animation is completed or user has scrolled past the section and back, allow normal scrolling
      if (animState.animationCompleted || hasLeftSectionRef.current) {
        // If user is scrolling up and has left the section before, enable the animation again
        // Only enable when fully back in the hero section (scrollY close to 0)
        if (e.deltaY < 0 && hasLeftSectionRef.current && window.scrollY < 100) {
          hasLeftSectionRef.current = false;
          
          // Re-enable animation controls when scrolling back up into the section
          if (animState.animationCompleted) {
            document.body.classList.add('scroll-disabled');
            e.preventDefault();
            
            // Ensure we're at the top of the page when re-entering the animation
            window.scrollTo({
              top: 0,
              behavior: 'auto'
            });
            
            // Reset state for re-entering animations
            isSecondAnimSpeeding = false;
            secondAnimScrollAccumulator = 0;
            
            // Process the scroll event for reverse animation
            if (!isScrollingRef.current) {
              isScrollingRef.current = true;
              totalScrollRef.current = e.deltaY;
              
              if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
              }
              
              scrollTimeoutRef.current = setTimeout(() => {
                processScroll();
                isScrollingRef.current = false;
              }, 50);
            } else {
              totalScrollRef.current += e.deltaY;
            }
            return;
          }
        } else {
          return; // Allow normal scroll behavior
        }
      }
      
      // Prevent scrolling during first animation
      if (animState.showFirstAnim) {
        e.preventDefault();
        return;
      }
      
      // Store the original wheel event for later use
      wheelEventRef.current = e;
      
      if (animState.showSecondAnim && !animState.showThirdAnim) {
        // Prevent default scrolling during second animation
        e.preventDefault();
        
        // Accumulate scroll amount for animation 2
        secondAnimScrollAccumulator += e.deltaY;
        
        // Always allow transition to animation 3 when scrolling down in animation 2
        if (!isSecondAnimSpeeding && secondAnimScrollAccumulator > 100) {
          isSecondAnimSpeeding = true;
          console.log("Speeding up second animation");
          
          // Add scroll-disabled class to body
          document.body.classList.add('scroll-disabled');
          
          // Speed up the second animation
          setAnimState((prev) => ({
            ...prev,
            secondAnimSpeed: 3,
          }));

          // After a short delay, transition to the third animation
          setTimeout(() => {
            console.log("Transitioning to third animation");
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
            secondAnimScrollAccumulator = 0;
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
            
            isSecondAnimSpeeding = false;
          }, 800);
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

    // Separate function to process scroll for third animation
    const processScroll = () => {
      // Calculate new progress and text highlight based on accumulated scroll
      const scrollAmount = totalScrollRef.current;
      const scrollDirection = scrollAmount > 0 ? 1 : -1;
      
      // Reset the scroll accumulator
      totalScrollRef.current = 0;
      
      // Update the animation progress
      setAnimState((prev) => {
        // Calculate new progress values - don't cap at 1.0 until icons are complete
        const progressStep = 0.05 * Math.sign(scrollAmount);
        const newThirdProgress = prev.thirdAnimProgress + progressStep;
        
        // Continuously update Lottie animation progress regardless of text highlighting
        // Further reduced multiplier to 0.5 for an even slower animation
        const newLottieProgress = Math.max(prev.lottieThirdProgress + (progressStep * 1.4), 0);
        
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
            // Slow down the icons animation
            iconsProgress = Math.min(iconsProgress + (progressStep * 0.7), 1);
          }
        } else {
          // REVERSE ANIMATION: First icons layout, then text highlight
          
          // Check if icons animation should be handled first
          if (iconsProgress > 0) {
            // First handle the icons layout animation on reverse
            iconsProgress = Math.max(iconsProgress + (progressStep * 0.7), 0);
            
            // Keep text highlighted while icons are animating
            highlightIndex = maxHighlightIndex;
          } else {
            // Icons animation is complete, now handle text unhighlighting word by word
            
            // Calculate new highlight index by decrementing from current position
            // This ensures words unhighlight one at a time from end to beginning
            highlightIndex = Math.max(highlightIndex + Math.floor(progressStep * 8), -1);
          }
        }
        
        // Only cap the third animation progress after checking animations
        const finalThirdProgress = Math.min(Math.max(newThirdProgress, 0), 1);
        
        // Check if animation is complete (icons animation must be complete)
        const isCompleted = scrollDirection > 0 && iconsProgress >= 1;
        
        // For debugging
        if (scrollDirection < 0 && iconsProgress === 0) {
          console.log("Unhighlighting text, current index:", highlightIndex);
        }
        
        // Handle reverse animation - transition back to animation 2 when scrolling up
        // and third animation progress reaches 0
        if (finalThirdProgress <= 0 && highlightIndex < 0 && scrollDirection < 0) {
          // At the beginning, prevent scrolling back
          document.body.classList.add('scroll-disabled');
          
          // Reset accumulators
          secondAnimScrollAccumulator = 0;
          totalScrollRef.current = 0;
          isScrollingRef.current = false;
          
          // Clear any pending timeouts
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
          
          // Transition back to animation 2
          setTimeout(() => {
            // Ensure we're at the top of the page for animation 2
            window.scrollTo({
              top: 0,
              behavior: 'auto'
            });
            
            setAnimState(prev => ({
              ...prev,
              showThirdAnim: false,
              showSecondAnim: true,
              secondAnimSpeed: 1,
              showText: true,
              animationCompleted: false
            }));
            
            // Reset the animation state variables
            isSecondAnimSpeeding = false;
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

    // Add scroll event listener to detect when user scrolls back to hero section
    const checkScrollPosition = () => {
      // If we've scrolled down past hero and now scrolling back up
      if (hasLeftSectionRef.current && window.scrollY < 100) {
        // Re-enable animation controls when scrolling back up into the section
        hasLeftSectionRef.current = false;
      } else if (window.scrollY > window.innerHeight) {
        hasLeftSectionRef.current = true;
      }
    };
    
    window.addEventListener('scroll', checkScrollPosition, { passive: true });

    // Passive wheel event listener (cannot prevent default) for tracking
    window.addEventListener('wheel', () => {}, { passive: true });
    
    // Non-passive wheel event listener for controlling scrolling
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('wheel', () => {});
      window.removeEventListener('scroll', checkScrollPosition);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      // Always make sure to remove any scroll lock when component unmounts
      document.body.classList.remove('scroll-disabled');
    };
  }, [animState.showFirstAnim, animState.showSecondAnim, animState.showThirdAnim, animState.animationCompleted, overlayTextWords.length]);

  return (
    <div className="hero-start-wrapper">
      {animState.showFirstAnim && (
        <Lottie
          loop={false}
          animationData={lottie1}
          play
          onComplete={handleFirstAnimComplete}
        />
      )}

      {animState.showSecondAnim && (
        <div className="second-animation-container">
          <Lottie
            loop={true}
            animationData={lottie2}
            play
            speed={animState.secondAnimSpeed}
          />
        </div>
      )}

      {animState.showThirdAnim && (
        <div className="third-animation-container">
          <Lottie
            loop={false}
            animationData={lottie3}
            play
            speed={0}
            goTo={animState.lottieThirdProgress * 100} // Use the separate Lottie progress
          />
          
          <div className={`hero-content-overlay ${animState.thirdAnimProgress > 0 ? 'visible' : ''}`}>
            <div className="overlay-text">
              <div className="text-sentence">
                {overlayTextWords.map((word, index) => (
                  <span
                    key={index}
                    className={`text-word ${index <= animState.textHighlightIndex ? 'active' : ''}`}
                  >
                    {word}{' '}
                  </span>
                ))}
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
        <div className={`login-text ${animState.showText ? 'fade-in' : ''}`}>
          <h1 className="hero-start-title">Be Part of the AI Revolution</h1>
          <p className="hero-start-description">
           Join a global network of experts training LLMs. Work remotely, earn in dollars, and 
           Shape the future of AI
          </p>
          <div className="hero-start-button">
            <Button text="Apply Now" mode="dark" onClick={() => {}} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroStart;