//src/pages/index.tsx
import React, { useState, useEffect } from 'react';
import Hero from "../components/Hero";
import Convincing from "../components/Convincing";
import CircularLoader from '@/components/CircularLoader';
import VotingSection from '@/components/VotingSection';

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const [showPricing, setShowPricing] = useState(false);
  const [contentClass, setContentClass] = useState('fade-in'); // Control animation

  useEffect(() => {
    if (!isVisible) {
      // Wait for 2 seconds before starting the fade-out animation
      setTimeout(() => {
        setContentClass('fade-out');
        // After the fade-out animation completes, change to the Pricing component
        setTimeout(() => {
          setShowPricing(true);
          setContentClass('fade-in'); // Start fade-in for Pricing component
        }, 500); // Time it takes to fade out
      }, 2000); // Loader visible for 2 seconds
    }
  }, [isVisible]);

  return (
    <main className="flex min-h-screen flex-col items-center">
      {isVisible ? (
        <div className={`flex flex-col items-center justify-center min-h-screen ${contentClass}`}>
          <Hero onButtonClick={() => setIsVisible(false)} />
          <div className="flex flex-col items-center justify-center min-h-screen -mt-32">
            <Convincing />
          </div>
        </div>
      ) : showPricing ? (
        <div className={`${contentClass}`}>
          <VotingSection />
        </div>
      ) : (
        <div className={`flex flex-col items-center pt-48 ${contentClass}`}>
          <p className="text-3xl font-medium text-center mb-4 text-black font-montserrat">
            Hold tight, we're connecting your account to your LunchBunch group and food delivery service!
          </p>
          <CircularLoader />
        </div>
      )}
    </main>
  );
}