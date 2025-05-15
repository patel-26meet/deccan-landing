export interface ILottieAsset {
  id?: string;
  w?: number;
  h?: number;
  u?: string;
  p?: string;
  e?: number;
  layers?: unknown[];
  [key: string]: unknown;
}

export interface ILottieLayer {
  ind?: number;
  ty?: number;
  nm?: string;
  ddd?: number;
  sr?: number;
  ks?: Record<string, unknown>;
  ao?: number;
  ip?: number;
  op?: number;
  st?: number;
  bm?: number;
  [key: string]: unknown;
}

export interface ILottieMarker {
  tm?: number;
  cm?: string;
  dr?: number;
  [key: string]: unknown;
}

export interface ILottieAnimationData {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm: string;
  ddd?: number;
  assets: ILottieAsset[];
  layers: ILottieLayer[];
  markers?: ILottieMarker[];
  [key: string]: unknown;
}

export interface ILottieFile {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm: string;
  assets: ILottieAsset[];
  layers: ILottieLayer[];
  markers?: ILottieMarker[];
  [key: string]: unknown;
} 