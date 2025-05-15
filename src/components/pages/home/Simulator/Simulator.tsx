'use client';

import { ISimulatorProps } from '@/interfaces/components/simulator.type';
import { ILottieAnimationData } from '@/interfaces/components/lottie.type';
import { FC, useState, useEffect, useRef, useCallback } from 'react';
import SimulatorText from './SimulatorText';
import dynamic from 'next/dynamic';

// Dynamically import Lottie to prevent SSR issues
const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

const Simulator: FC<ISimulatorProps> = ({ windowNames = ['SFT', 'RLHF'], simulatorTexts = [] }) => {
  // Initialize active window - default to "SFT" regardless of initialActiveWindow prop
  const [activeWindow, setActiveWindow] = useState<string>('SFT');

  // Initialize with the first header from the data if available
  const [activeHeader, setActiveHeader] = useState<string>(
    simulatorTexts.length > 0 ? simulatorTexts[0].header : ''
  );

  // Counter to force animation reset
  const [resetAnimation, setResetAnimation] = useState<number>(0);
  
  // Animation state
  const [currentAnimation, setCurrentAnimation] = useState<ILottieAnimationData | null>(null);
  const [isLottieLoading, setIsLottieLoading] = useState<boolean>(false);

  // Cache references for animations that persist between renders
  const animationCache = useRef<Record<string, ILottieAnimationData>>({});
  // Track which animations have already been requested to prevent duplicate requests
  const requestedAnimations = useRef<Set<string>>(new Set());

  const simulatorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animation paths based on window and header
  const getAnimationPath = useCallback((window: string, headerIndex: number) => {
    if (window === 'RLHF') {
      switch (headerIndex) {
        case 0: return '/assets/simulator/rlhf-lottie-1.json';
        case 1: return '/assets/simulator/rlhf-lottie-2.json';
        case 2:
        case 3: return '/assets/simulator/rlhf-lottie-3.json';
      }
    } else if (window === 'SFT') {
      switch (headerIndex) {
        case 0: return '/assets/simulator/sft-lottie-1.json';
        case 1: return '/assets/simulator/sft-lottie-2.json';
        case 2:
        case 3: return '/assets/simulator/sft-lottie-3.json';
        default: return '/assets/simulator/sft-lottie-1.json';
      }
    }
    return '/assets/simulator/sft-lottie-1.json';
  }, []);

  // Load and cache animation
  const loadAnimation = useCallback(async (window: string, headerIndex: number) => {
    const animKey = `${window}-${headerIndex}`;

    // Skip if already requested or cached
    if (requestedAnimations.current.has(animKey)) {
      return animationCache.current[animKey] || null;
    }

    try {
      setIsLottieLoading(true);
      // Mark as requested immediately to prevent parallel requests
      requestedAnimations.current.add(animKey);
      
      // Fetch the animation data
      const response = await fetch(getAnimationPath(window, headerIndex));
      const animationData = await response.json() as ILottieAnimationData;
      
      // Cache the loaded animation
      animationCache.current[animKey] = animationData;
      return animationData;
    } catch (error) {
      console.error('Failed to load animation:', error);
      return null;
    } finally {
      setIsLottieLoading(false);
    }
  }, [getAnimationPath]);

  // Effect to update current animation when component becomes visible
  useEffect(() => {
    if (!isVisible) return;

    const headerIndex = simulatorTexts.findIndex(text => text.header === activeHeader);
    const animKey = `${activeWindow}-${headerIndex}`;

    // If animation is cached, use it immediately
    if (animationCache.current[animKey]) {
      setCurrentAnimation(animationCache.current[animKey]);
      
      // Preload animations for other headers
      simulatorTexts.forEach((_, index) => {
        if (index !== headerIndex) {
          const nextKey = `${activeWindow}-${index}`;
          if (!requestedAnimations.current.has(nextKey)) {
            loadAnimation(activeWindow, index);
          }
        }
      });
      
      return;
    }

    // Otherwise load it
    loadAnimation(activeWindow, headerIndex).then(animation => {
      if (animation) {
        setCurrentAnimation(animation);
        
        // Preload animations for other headers
        simulatorTexts.forEach((_, index) => {
          if (index !== headerIndex) {
            const nextKey = `${activeWindow}-${index}`;
            if (!requestedAnimations.current.has(nextKey)) {
              loadAnimation(activeWindow, index);
            }
          }
        });
      }
    });
  }, [isVisible, activeWindow, activeHeader, loadAnimation, simulatorTexts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Ensure SFT is selected when it becomes visible
          setActiveWindow('SFT');
          // Set the first header (Coding)
          if (simulatorTexts.length > 0) {
            setActiveHeader(simulatorTexts[0].header);
          }
          setResetAnimation(prev => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
      }
    );

    if (simulatorRef.current) {
      observer.observe(simulatorRef.current);
    }

    return () => {
      if (simulatorRef.current) {
        observer.unobserve(simulatorRef.current);
      }
    };
  }, [simulatorTexts]);

  // Function to handle window change - keep the same header but trigger animation reset
  const handleWindowChange = (windowName: string) => {
    setActiveWindow(windowName);
    // We'll keep the same header, but we need to signal to SimulatorText to reset animation
    setResetAnimation(prev => prev + 1);
  };

  // Function to handle header change
  const handleHeaderChange = (header: string) => {
    // Special flag for window switching
    if (header === '__SWITCH_WINDOW__') {
      // Find the next window to switch to
      const currentWindowIndex = windowNames.findIndex(w => w === activeWindow);
      const nextWindowIndex = (currentWindowIndex + 1) % windowNames.length;

      // Switch to next window and reset to first header
      const nextWindow = windowNames[nextWindowIndex];
      setActiveWindow(nextWindow);

      // Set to first header
      if (simulatorTexts.length > 0) {
        setActiveHeader(simulatorTexts[0].header);
      }

      setResetAnimation(prev => prev + 1);
      return;
    }

    // Otherwise just change the header
    setActiveHeader(header);
  };

  return (
    <div className="simulator__frame-wrapper" ref={simulatorRef}>
      <div className="simulator__frame">
        <div className="simulator__window-bar-wrapper">
          {windowNames.map(windowName => (
            <div
              key={windowName}
              className={`simulator__window-bar ${activeWindow === windowName ? 'simulator__window-bar--active' : ''}`}
              onClick={() => handleWindowChange(windowName)}
            >
              <div className="simulator__window-bar-text">{windowName}</div>
            </div>
          ))}
        </div>
        <div className="simulator__frame-lottie">
          {isLottieLoading && !currentAnimation ? (
            <div className="simulator__lottie-loading">Loading...</div>
          ) : currentAnimation ? (
            <Lottie
              animationData={currentAnimation}
              loop
              play
              style={{ width: '100%', height: '100%' }}
              key={`${activeWindow}-${activeHeader}-${resetAnimation}`}
            />
          ) : (
            <div className="simulator__lottie-placeholder">Animation not found</div>
          )}
        </div>
      </div>
      <div className="simulator__frame-content">
        <SimulatorText
          isOpen={true}
          activeHeader={activeHeader}
          onHeaderClick={handleHeaderChange}
          resetAnimation={resetAnimation}
        />
      </div>
    </div>
  );
};
export default Simulator;
