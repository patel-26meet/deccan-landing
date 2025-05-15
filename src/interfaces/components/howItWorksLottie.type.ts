import { ILottieAnimationData } from './lottie.type';

export interface ICampusPartnersHowItWorksProps {
  initialActiveCard?: number;
}

export interface IHowItWorksCardProps {
  header: string;
  subheader: string;
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
}

export interface ICampusPartnerLottieCache {
  [key: number]: ILottieAnimationData;
} 