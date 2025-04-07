"use client";

import { TLocalStorageHookReturn } from "@/interfaces/hooks/local-storage.type";
import { isFunction } from "lodash";
import { useEffect, useState } from "react";

/**
 * Hook for managing state that persists in localStorage
 * @param key - localStorage key to store the value under
 * @param initialValue - initial value to use if no value exists in localStorage
 * @returns [storedValue, setValue] - Tuple of the stored value and a function to update it
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): TLocalStorageHookReturn<T> => {
  // Get value from localStorage or use initialValue
  const getStoredValue = (): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // Update localStorage whenever storedValue changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    }
  }, [key, storedValue]);

  // Return a wrapped version of useState's setter function that also updates localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function to match useState's API
      const valueToStore = isFunction(value)
        ? (value as (val: T) => T)(storedValue)
        : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.error(
        `Error setting value for localStorage key "${key}":`,
        error
      );
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
