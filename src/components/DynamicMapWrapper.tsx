"use client";

import dynamic from 'next/dynamic';

const MapSection = dynamic(() => import('@/components/MapSection'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});

export default function DynamicMapWrapper() {
  return <MapSection />;
}