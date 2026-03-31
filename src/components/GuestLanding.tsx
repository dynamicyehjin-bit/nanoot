'use client';

import { useEffect, useState } from 'react';
import { Onboarding } from './Onboarding';
import { Intro } from './Intro';

export function GuestLanding() {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeen = localStorage.getItem('hasSeenOnboarding');
    setShowOnboarding(!hasSeen);
  }, []);

  if (showOnboarding === null) {
    // prevent hydration mismatch
    return null; 
  }

  if (showOnboarding) {
    return (
      <Onboarding 
        onComplete={() => {
          localStorage.setItem('hasSeenOnboarding', 'true');
          setShowOnboarding(false);
        }} 
      />
    );
  }

  return <Intro />;
}
