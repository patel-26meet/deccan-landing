import { ILottieFile } from './lottie.type';

export interface IHeroLottieFiles {
  desktop: { [key: number]: ILottieFile };
  mobile: { [key: number]: ILottieFile };
  tablet: { [key: number]: ILottieFile };
} 