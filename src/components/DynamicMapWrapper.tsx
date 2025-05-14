"use client";

import dynamic from 'next/dynamic';
import LoadingSpinner from './LoadingSpinner'; // Import the spinner

const MapSection = dynamic(() => import('@/components/MapSection'), {
  ssr: false,
  loading: () => <LoadingSpinner /> // Use the spinner
});

export default function DynamicMapWrapper() {
  return <MapSection />;
}