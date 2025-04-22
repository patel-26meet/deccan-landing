"use client"

import { useState, useEffect, useRef } from "react";
import Button from "@/components/shared/Button";
import HowItWorksCard from "./HowItWorks/HowItWorksCard";
import Lottie from "react-lottie-player";
import lottie1 from "../../../../public/assets/how-it-works/selection-process-1.json";
import lottie2 from "../../../../public/assets/how-it-works/selection-process-2.json";
import lottie3 from "../../../../public/assets/how-it-works/selection-process-3.json";
import lottie4 from "../../../../public/assets/how-it-works/selection-process-4.json";

const HowItWorks = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0); // Add a key for forcing animation reset
  
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
      subheader: "Based on project <> skill match start your dream role."
    }
  ];

  const handleCardClick = (index: number) => {
    setActiveCardIndex(index);
    setAnimationKey(prev => prev + 1); // Force re-render of Lottie component
  };

  // Function to advance to the next card/animation
  const handleAnimationComplete = () => {
    // Calculate next index with loop back to first
    const nextIndex = (activeCardIndex + 1) % howItWorksData.length;
    setActiveCardIndex(nextIndex);
    setAnimationKey(prev => prev + 1); // Force re-render of Lottie component
  };

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
                    loop={false} // Important: Set to false to enable onComplete
                    play
                    key={`lottie-${activeCardIndex}-${animationKey}`}
                    onComplete={handleAnimationComplete}
                />
            </div>
        </div>   
    </div>
  )
}

export default HowItWorks;