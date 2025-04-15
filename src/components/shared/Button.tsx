
import React from 'react';

interface ButtonProps {
  text: string;
  mode?: 'light' | 'dark';
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
  // Determine which icon to use based on state
  const iconSrc = state === 'default' || state === 'focused'
    ? '/assets/button/arrow-right-1.svg'
    : '/assets/button/arrow-right-2.svg';
  
  // Combine all classes
  const buttonClasses = [
    'button',
    mode,
    state !== 'default' ? state : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
    >
      <span>{text}</span>
      <img src={iconSrc} alt="arrow" className="button-icon" />
    </button>
  );
};

export default Button;