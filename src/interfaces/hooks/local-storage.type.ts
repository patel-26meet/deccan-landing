/**
 * Type definition for the setter function returned by useLocalStorage
 */
export type TLocalStorageSetter<T> = (value: T | ((val: T) => T)) => void;

/**
 * Type definition for the return value of useLocalStorage hook
 */
export type TLocalStorageHookReturn<T> = [T, TLocalStorageSetter<T>];
