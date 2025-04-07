/**
 * Type for a function that can be debounced
 */
export type TDebounceable = (...args: unknown[]) => unknown;

/**
 * Type for the debounced function with lodash debounce capabilities
 */
export interface IDebouncedFunction<T extends TDebounceable> {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
}
