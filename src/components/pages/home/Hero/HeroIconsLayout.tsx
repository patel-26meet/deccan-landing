'use client';

import { iconsMobile, iconsTablet, iconsWeb } from '@/constants/pages/home/hero';
import { IHeroIconsProps } from '@/interfaces/components/hero.type';
import { useState, useEffect } from 'react';

const HeroIcons = ({ text }: IHeroIconsProps) => {
  return (
    <div className="hero-icons">
      <div className="hero-icons-text">{text}</div>
    </div>
  );
};

type DeviceType = 'mobile' | 'tablet' | 'desktop';

const HeroIconsLayout = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
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

    // Initial check
    handleResize();

    // Set up listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Select the appropriate icon set based on device type
  const iconsToRender =
    deviceType === 'mobile' ? iconsMobile : deviceType === 'tablet' ? iconsTablet : iconsWeb;

  return (
    <div className="hero-icons-layout">
      {iconsToRender.map((icon, index) => (
        <div
          key={index}
          className="hero-icon-container"
          style={{
            position: 'absolute',
            ...icon.position,
          }}
        >
          <HeroIcons text={icon.text} />
        </div>
      ))}
    </div>
  );
};

export default HeroIconsLayout;
