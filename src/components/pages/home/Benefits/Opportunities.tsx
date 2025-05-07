"use client";

import { useRef, useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import moneyAnimation from "../../../../../public/assets/benefits/lottie/opportunities.json";

const Opportunities = () => {
    // Reference to the opportunities card
    const opportunitiesRef = useRef<HTMLDivElement>(null);
    // State to track visibility
    const [isVisible, setIsVisible] = useState(false);
    
    // Custom intersection observer implementation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update state when intersection status changes
                setIsVisible(entry.isIntersecting);
            },
            { 
                threshold: 0.5, // Trigger when 50% visible
                rootMargin: "0px"
            }
        );
        
        // Start observing when component mounts
        if (opportunitiesRef.current) {
            observer.observe(opportunitiesRef.current);
        }
        
        // Clean up observer on unmount
        return () => {
            if (opportunitiesRef.current) {
                observer.disconnect();
            }
        };
    }, []);
    
    return (
        <div 
            ref={opportunitiesRef} 
            className={`benefits__opportunities ${isVisible ? 'fade-in-visible' : 'fade-in-hidden'}`}
        >
            <div className="benefits__opportunities__lottie">
                <Lottie 
                    animationData={moneyAnimation} 
                    loop
                    play
                    style={{ width: '100%', height: '100%', backgroundColor: 'transparent', opacity: '1' }}
                    rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
                />  
            </div>
            <div className="benefits__opportunities__title">Bigger Opportunities</div>
            <div className="benefits__opportunities__text">Build connections, find mentors, and unlock doors to top organizations.</div>
        </div> 
    )
}

export default Opportunities;