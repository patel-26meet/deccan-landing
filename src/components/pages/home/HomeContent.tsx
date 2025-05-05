"use client"

import AboutUsFAQs from "@/components/pages/home/AboutUsFAQs";
import HowItWorks from "@/components/pages/home/campusPartnersHowItWorks";
import Footer from "@/components/pages/home/Footer/Footer";
import Hero from "@/components/pages/home/Hero/Hero";
import OpportunitiesAndBenifits from "@/components/pages/home/opportunitiesandbenifits";
import SimulatorPage from "@/components/pages/home/Simulator/SimulatorPage";
import Statistics from "@/components/pages/home/Statistics/statistics";
import Stories from "@/components/pages/home/stories";
import NavBar from "@/components/shared/NavBar";
import { useEffect, useState } from "react";

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
      <Hero/>
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