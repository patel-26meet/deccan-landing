'use client';

import { TPreviousValue } from '@/interfaces/hooks/Previous.type';
import { useEffect, useRef } from 'react';

/**
 * Hook that returns the previous value of a variable
 * Useful for comparing previous vs current state
 *
 * @param value - The value to track
 * @returns The previous value (undefined on first render)
 */
export const usePrevious = <T>(value: T): TPreviousValue<T> => {
  const ref = useRef<TPreviousValue<T>>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
