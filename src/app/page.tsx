'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the home page content with ssr disabled
const HomeContent = dynamic(() => import('../components/pages/home/HomeContent'), { ssr: false });

export default function Home() {
  return (
    <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
