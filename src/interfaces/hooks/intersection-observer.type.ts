/**
 * Options for the IntersectionObserver configuration
 */
export interface IIntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * Return type for the useIntersectionObserver hook
 */
export interface IIntersectionObserverHookReturn {
  entry: IntersectionObserverEntry | null;
  isIntersecting: boolean;
  isFullyInView: boolean;
}
