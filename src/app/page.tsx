'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import PopupContainer from '@/components/shared/popup/PopupContainer';

const HomeContent = dynamic(() => import('../components/pages/home/HomeContent'), { ssr: false });

export default function Home() {
  return (
    <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
      <PopupContainer />
      <HomeContent />
    </Suspense>
  );
}
