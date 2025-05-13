'use client';

import { useRef, useState, useEffect } from 'react';
import Simulator from './Simulator';
import { simulatorText } from '@/constants/pages/home/simulator';

const SimulatorPage = () => {
  // Example window names - update these with your actual window names
  const windowNames = ['SFT', 'RLHF'];

  // Reference to the simulator section
  const simulatorRef = useRef<HTMLDivElement>(null);
  // State to track visibility
  const [isVisible, setIsVisible] = useState(false);
  // State to track if we're coming from hero (above) or opportunities (below)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom intersection observer implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5, // Trigger when 50% visible
        rootMargin: '0px',
      }
    );

    // Start observing when component mounts
    if (simulatorRef.current) {
      observer.observe(simulatorRef.current);
    }

    // Clean up observer on unmount
    return () => {
      if (simulatorRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={simulatorRef}
      className={`simulator__page ${isVisible ? 'fade-in-visible' : 'fade-in-hidden'} ${scrollDirection === 'down' ? 'simulator__page--from-hero' : 'simulator__page--from-opportunities'}`}
    >
      <div className="simulator__container">
        <div className="simulator__header">
          <span className="simulator__header__gradient">Train AI </span> in Your Area of Expertise!
        </div>
        <div className="simulator__content-wrapper">
          <Simulator
            windowNames={windowNames}
            activeWindow="SFT"
            simulatorTexts={simulatorText.contentText}
          />
        </div>
      </div>
    </div>
  );
};

export default SimulatorPage;
