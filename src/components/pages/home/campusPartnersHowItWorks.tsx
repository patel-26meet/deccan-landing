"use client"

import { useState, useEffect, useRef } from "react";
import Button from "@/components/shared/Button";
import HowItWorksCard from "./HowItWorks/HowItWorksCard";
import Lottie from "lottie-react";
import lottie1 from "../../../../public/assets/how-it-works/04_Selection process (1)/1_Selection process.json";
import lottie2 from "../../../../public/assets/how-it-works/04_Selection process (1)/2_Selection process.json";
import lottie3 from "../../../../public/assets/how-it-works/04_Selection process (1)/3_Selection process.json";
import lottie4 from "../../../../public/assets/how-it-works/04_Selection process (1)/4_Selection process.json";

const HowItWorks = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const lottieRef = useRef(null);
  
  const lottieAnimations = [lottie1, lottie2, lottie3, lottie4];
  
  const howItWorksData = [
    {
      header: "Application",
      subheader: "Create profile and apply for opportunities"
    },
    {
      header: "Screening Assessment",
      subheader: "Evaluate essential skills for global projects."
    },
    {
      header: "Skill specific Assessment(s)",
      subheader: "Assess expertise based on project requirements"
    },
    {
      header: "Become Our Top Expert",
      subheader: "If you qualify, start contributing to projects and get paid"
    }
  ];

  const handleCardClick = (index: number) => {
    setActiveCardIndex(index);
  };

  // Auto-advance to next card when animation completes
  useEffect(() => {
    // Instead of using addEventListener, we'll use the onComplete prop on Lottie
    // This will be handled in the JSX
  }, []);

  return (
    <div className="campus-partners-how-it-works-wrapper">
        <div className="campus-partners-wrapper">
            <div className="campus-partners-header">
                Our Campus Partners
            </div>
            <div className="campus-partners-content">
                Icons
            </div>
        </div>
        
        <div className="how-it-works-wrapper">
            <div className="how-it-works-content">
                <div className="how-it-works-header">
                    How it works?
                </div>
                <div className="how-it-works-description">
                    Open up doors to your dream opportunities with a single application
                </div>
                <Button
                    text="Apply Now"
                />
                <div className="how-it-works-cards-container">
                  {howItWorksData.map((card, index) => (
                    <HowItWorksCard
                      key={index}
                      header={card.header}
                      subheader={card.subheader}
                      index={index}
                      isActive={index === activeCardIndex}
                      onClick={handleCardClick}
                    />
                  ))}
                </div>
            </div>  
            <div className="how-it-works-lottie">
                <Lottie
                    animationData={lottieAnimations[activeCardIndex]}
                    loop={false}
                    ref={lottieRef}
                    onComplete={() => {
                      // Move to next card when animation completes
                      setActiveCardIndex((prevIndex) => (prevIndex + 1) % howItWorksData.length);
                    }}
                />
            </div>
        </div>   
    </div>
  )
}

export default HowItWorks;