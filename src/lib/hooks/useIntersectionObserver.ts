"use client";

import {
  IIntersectionObserverHookReturn,
  IIntersectionObserverOptions,
} from "@/interfaces/hooks/intersection-observer.type";
import { get } from "lodash";
import { RefObject, useEffect, useState } from "react";

/**
 * Hook that tracks when an element intersects with the viewport using IntersectionObserver
 * Useful for lazy loading images, infinite scrolling, or triggering animations
 *
 * @param elementRef - React ref to the element to observe
 * @param options - IntersectionObserver options
 * @returns Object containing entry, isIntersecting, and isFullyInView
 */
export const useIntersectionObserver = <T extends Element>(
  elementRef: RefObject<T>,
  {
    threshold = 0,
    root = null,
    rootMargin = "0%",
  }: IIntersectionObserverOptions = {}
): IIntersectionObserverHookReturn => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  // Compute these values from the entry
  const isIntersecting = get(entry, "isIntersecting", false);
  const isFullyInView = get(entry, "intersectionRatio", 0) === 1;

  useEffect(() => {
    const element = elementRef?.current;

    if (!element || typeof IntersectionObserver !== "function") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, threshold, root, rootMargin]);

  return { entry, isIntersecting, isFullyInView };
};

export default useIntersectionObserver;
