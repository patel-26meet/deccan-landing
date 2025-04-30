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