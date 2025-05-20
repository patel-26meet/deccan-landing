'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  
  useEffect(() => {
    // Extract the requested path
    const path = window.location.pathname;
    
    // List of valid client-side routes
    const clientRoutes = ['/login', '/faqs', '/about'];
    
    // If the requested path is a valid client route, navigate to it
    if (clientRoutes.includes(path)) {
      router.push(path);
    } else {
      // For truly invalid routes, redirect to home after a short delay
      const timer = setTimeout(() => {
        router.push('/');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [router]);
  
  return (
    <div className="not-found-page">
      <h1>Page Loading</h1>
      <p>Please wait while we redirect you to the correct page...</p>
    </div>
  );
} 