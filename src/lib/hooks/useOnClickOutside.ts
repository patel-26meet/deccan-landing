"use client";

import { TOutsideClickHandler } from "@/interfaces/hooks/OnClickOutside.type";
import { RefObject, useEffect } from "react";

/**
 * Hook that handles click events outside of the specified element
 * Useful for closing dropdown menus, modals, etc. when clicking outside
 *
 * @param ref - React ref to the element to detect clicks outside of
 * @param handler - Callback function to run when a click outside is detected
 */
export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: TOutsideClickHandler
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
