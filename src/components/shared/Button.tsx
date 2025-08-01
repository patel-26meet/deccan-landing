'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ButtonProps {
  text: string;
  mode?: 'light' | 'dark' | 'hybrid' | 'navbar';
  state?: 'default' | 'hover' | 'focused' | 'selected';
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  mode = 'dark',
  state = 'default',
  onClick,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRippling, setIsRippling] = useState(false);
  const rippleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (rippleTimeoutRef.current) {
        clearTimeout(rippleTimeoutRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    if (mode === 'hybrid') {
      setIsRippling(true);

      // Reset ripple effect after animation completes
      // Use 1400ms to match the longest animation (1200ms + 200ms delay)
      rippleTimeoutRef.current = setTimeout(() => {
        setIsRippling(false);
      }, 1400);
    }

    if (onClick) {
      onClick();
    }
  };

  // Combine all classes
  const buttonClasses = [
    'button',
    mode,
    state !== 'default' ? state : '',
    isHovered ? 'hovered' : '',
    isRippling && mode === 'hybrid' ? 'ripple' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Determine which arrow images to use based on mode
  const defaultArrow =
    mode === 'hybrid'
              ? './assets/button/arrow-right-1-white.svg'
        : './assets/button/arrow-right-1.svg';
  const hoverArrow =
    mode === 'hybrid'
              ? './assets/button/arrow-right-2-white.svg'
        : './assets/button/arrow-right-2.svg';

  // Additional class for the white arrow to ensure consistent sizing
  const defaultArrowClass = `button-icon icon-default ${
    isHovered || state === 'hover' || state === 'selected' ? 'hidden' : ''
  } ${mode === 'hybrid' ? 'white-arrow' : ''}`;

  const hoverArrowClass = `button-icon icon-hover ${
    isHovered || state === 'hover' || state === 'selected' ? '' : 'hidden'
  } ${mode === 'hybrid' ? 'white-arrow' : ''}`;

  // Navbar mode has no icon, render a simpler button
  if (mode === 'navbar') {
    return (
      <button
        className={buttonClasses}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span>{text}</span>
      </button>
    );
  }

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{text}</span>
      <div className="button-icon-container">
        <img src={defaultArrow} alt="arrow" className={defaultArrowClass} loading="lazy" />
        <img src={hoverArrow} alt="arrow" className={hoverArrowClass} loading="lazy" />
      </div>
    </button>
  );
};

export default Button;
