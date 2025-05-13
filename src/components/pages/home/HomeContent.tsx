'use client';

import AboutUsFAQs from './AboutUsFAQs';
import HowItWorks from './campusPartnersHowItWorks';
import Footer from './Footer/Footer';
import Hero from './Hero/Hero';
import SimulatorPage from './Simulator/SimulatorPage';
import Statistics from './Statistics/statistics';
import Stories from './Stories';
import NavBar from '../../shared/NavBar';
import { useEffect, useState } from 'react';
import OpportunitiesAndBenifits from './Opportunitiesandbenifits';

const HomeContent = () => {
  // Use state to control rendering on the client side
  const [isClient, setIsClient] = useState(false);

  // Run once when component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return null during server-side rendering
  if (!isClient) {
    return null;
  }

  return (
    <div className="main-content">
      <NavBar initiallyTransparent={true} />
      <Hero />
      <SimulatorPage />
      <OpportunitiesAndBenifits />
      <Statistics />
      <Stories />
      <HowItWorks />
      <AboutUsFAQs />
      <Footer />
    </div>
  );
};

export default HomeContent;
