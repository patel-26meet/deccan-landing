'use client';

import { useEffect, useState } from 'react';

// Define device types
export type DeviceType = 'desktop' | 'tablet' | 'mobile';

/**
 * Hook to detect the current device type based on screen width
 * @returns DeviceType - 'mobile', 'tablet', or 'desktop'
 */
export const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = (): void => {
      const width = window.innerWidth;
      if (width <= 493) {
        setDeviceType('mobile');
      } else if (width <= 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    // Initial detection
    handleResize();

    // Add listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
};

export default useDeviceType; 