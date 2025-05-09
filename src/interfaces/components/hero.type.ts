export interface IHeroSectionProps {
  subtitle?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  label?: string;
}

export interface IHeroIconsProps {
    text: string;
}


export interface IIconData {
  text: string;
  position: {
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
  };
}

export interface IAnimationState {
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
  animationDirection: 'forward' | 'reverse'; // Direction of the 2nd animation
  hasScrolledDuringAnim2: boolean; // Track if user has scrolled during 2nd animation
  secondAnimProgress: number; // Track progress of the 2nd animation
}