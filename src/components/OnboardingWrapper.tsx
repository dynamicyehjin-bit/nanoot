'use client';

import { useEffect, useState } from 'react';
import { Onboarding } from './Onboarding';

export function OnboardingWrapper() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasSeen = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeen) {
      setShowOnboarding(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
  };

  if (!isMounted) return null;
  if (!showOnboarding) return null;

  return <Onboarding onComplete={handleComplete} />;
}
