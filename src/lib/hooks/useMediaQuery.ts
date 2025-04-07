"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect if a media query matches the current viewport
 * @param query - CSS media query string (e.g. '(min-width: 768px)')
 * @returns boolean - Whether the media query matches
 */
export const useMediaQuery = (query: string): boolean => {
  // Create a MediaQueryList object
  const getMatches = (): boolean => {
    // Check if window is defined (for SSR)
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  // State and setter for matched value
  const [matches, setMatches] = useState<boolean>(getMatches);

  // Handle change event
  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    // Set matches immediately
    handleChange();

    // Add event listener
    mediaQuery.addEventListener("change", handleChange);

    // Clean up
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};

// Predefined media queries based on common breakpoints
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
export const useIsTablet = () =>
  useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
export const useIsLargeDesktop = () => useMediaQuery("(min-width: 1440px)");

export default useMediaQuery;
