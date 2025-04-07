"use client";

import { IScrollData } from "@/interfaces/hooks/scroll-position.type";
import { throttle } from "lodash";
import { useEffect, useState } from "react";

/**
 * Hook for tracking the scroll position and direction
 * @returns Object containing scroll data (position, direction, percentage)
 */
const useScrollPosition = (): IScrollData => {
  const [scrollData, setScrollData] = useState<IScrollData>({
    scrollY: 0,
    scrollX: 0,
    scrollDirection: "none",
    scrollPercentage: 0,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    // Create throttled handler to improve performance
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;

      // Calculate scroll direction
      const direction =
        currentScrollY > lastScrollY
          ? "down"
          : currentScrollY < lastScrollY
            ? "up"
            : "none";

      // Calculate percentage scrolled
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage =
        scrollHeight > 0 ? (currentScrollY / scrollHeight) * 100 : 0;

      setScrollData({
        scrollY: currentScrollY,
        scrollX: currentScrollX,
        scrollDirection: direction,
        scrollPercentage,
      });

      lastScrollY = currentScrollY;
    }, 100); // Throttle to 100ms for better performance

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Call once to initialize
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Cancel any pending throttled executions
      handleScroll.cancel();
    };
  }, []);

  return scrollData;
};

// Export both as default and named export to support both import styles
export default useScrollPosition;
