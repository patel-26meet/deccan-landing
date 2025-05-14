'use client';

import { iconsMobile, iconsTablet, iconsWeb } from '@/constants/pages/home/hero';
import { IHeroIconsProps } from '@/interfaces/components/hero.type';
import useDeviceType from '@/lib/hooks/useDeviceType';

const HeroIcons = ({ text }: IHeroIconsProps) => {
  return (
    <div className="hero-icons">
      <div className="hero-icons-text">{text}</div>
    </div>
  );
};

const HeroIconsLayout = () => {
  const deviceType = useDeviceType();

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
