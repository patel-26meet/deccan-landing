import React, { useState } from 'react';

interface ButtonProps {
  text: string;
  mode?: 'light' | 'dark' | 'hybrid';
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
  
  // Combine all classes
  const buttonClasses = [
    'button',
    mode,
    state !== 'default' ? state : '',
    isHovered ? 'hovered' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{text}</span>
      <div className="button-icon-container">
        <img 
          src="/assets/button/arrow-right-1.svg" 
          alt="arrow" 
          className={`button-icon icon-default ${isHovered || state === 'hover' || state === 'selected' ? 'hidden' : ''}`} 
        />
        <img 
          src="/assets/button/arrow-right-2.svg" 
          alt="arrow" 
          className={`button-icon icon-hover ${isHovered || state === 'hover' || state === 'selected' ? '' : 'hidden'}`} 
        />
      </div>
    </button>
  );
};

export default Button;