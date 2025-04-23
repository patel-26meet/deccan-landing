"use client"

import { useState } from "react";
import AboutUsFAQs from "@/components/pages/home/AboutUsFAQs";
import HowItWorks from "@/components/pages/home/campusPartnersHowItWorks";
import Footer from "@/components/pages/home/Footer/Footer";
import Hero from "@/components/pages/home/Hero/Hero";
import OpportunitiesAndBenifits from "@/components/pages/home/opportunitiesandbenifits";
import SimulatorPage from "@/components/pages/home/Simulator/SimulatorPage";
import Statistics from "@/components/pages/home/Statistics/statistics";
import Stories from "@/components/pages/home/stories";
import NavBar from "@/components/shared/NavBar";

export default function Home() {
  // Since we're not changing the navbar visibility state, we can just use a constant
  const navbarVisible = true;

  return (
    <div className="main-content">
      <NavBar initiallyTransparent={true} initiallyVisible={navbarVisible} />
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
}
