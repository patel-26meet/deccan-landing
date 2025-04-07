"use client";

import {
  IDebouncedFunction,
  TDebounceable,
} from "@/interfaces/hooks/Debounce.type";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";

/**
 * Hook that debounces a value to avoid frequent updates
 * @param value - The value to debounce
 * @param delay - Debounce delay in milliseconds
 * @returns The debounced value
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear the timeout if the value changes within the delay period
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook that uses lodash's debounce to create a debounced version of a function
 * @param fn - The function to debounce
 * @param delay - Debounce delay in milliseconds
 * @returns The debounced function
 */
export const useDebouncedCallback = <T extends TDebounceable>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  const debouncedFnRef = useRef<IDebouncedFunction<T> | undefined>(undefined);

  useEffect(() => {
    debouncedFnRef.current = debounce((...args: Parameters<T>) => {
      fn(...args);
    }, delay);

    return () => {
      if (debouncedFnRef.current) {
        debouncedFnRef.current.cancel();
      }
    };
  }, [fn, delay]);

  return (...args: Parameters<T>) => {
    if (debouncedFnRef.current) {
      debouncedFnRef.current(...args);
    }
  };
};
