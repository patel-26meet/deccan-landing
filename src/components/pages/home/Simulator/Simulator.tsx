"use client"

import { ISimulatorProps } from "@/interfaces/components/simulator.type";
import { FC, useState } from "react";
import SimulatorText from "./SimulatorText";
import Lottie from "react-lottie-player";
import lottie1 from "../../../../../public/assets/simulator/rlhf-lottie-1.json"
import lottie2 from "../../../../../public/assets/simulator/rlhf-lottie-2.json"
import lottie3 from "../../../../../public/assets/simulator/rlhf-lottie-3.json"
import lottie4 from "../../../../../public/assets/simulator/rlhf-lottie-3.json"

import lottie5 from "../../../../../public/assets/simulator/sft-lottie-1.json"
import lottie6 from "../../../../../public/assets/simulator/sft-lottie-2.json"
import lottie7 from "../../../../../public/assets/simulator/sft-lottie-3.json"
import lottie8 from "../../../../../public/assets/simulator/sft-lottie-3.json"


const Simulator: FC<ISimulatorProps> = ({ 
    windowNames = ["SFT", "RLHF"],
    activeWindow: initialActiveWindow,
    simulatorTexts = []
}) => {
    // Initialize active window
    const [activeWindow, setActiveWindow] = useState<string>(
        initialActiveWindow || windowNames[0]
    );

    // Initialize with the first header from the data if available
    const [activeHeader, setActiveHeader] = useState<string>(
        simulatorTexts.length > 0 ? simulatorTexts[0].header : ''
    );
    
    // Counter to force animation reset
    const [resetAnimation, setResetAnimation] = useState<number>(0);
    
    // Function to handle window change - keep the same header but trigger animation reset
    const handleWindowChange = (windowName: string) => {
        setActiveWindow(windowName);
        // We'll keep the same header, but we need to signal to SimulatorText to reset animation
        setResetAnimation(prev => prev + 1);
    };
    
    // Function to handle header change
    const handleHeaderChange = (header: string) => {
        // Special flag for window switching
        if (header === '__SWITCH_WINDOW__') {
            // Find the next window to switch to
            const currentWindowIndex = windowNames.findIndex(w => w === activeWindow);
            const nextWindowIndex = (currentWindowIndex + 1) % windowNames.length;
            
            // Switch to next window and reset to first header
            const nextWindow = windowNames[nextWindowIndex];
            setActiveWindow(nextWindow);
            
            // Set to first header
            if (simulatorTexts.length > 0) {
                setActiveHeader(simulatorTexts[0].header);
            }
            
            setResetAnimation(prev => prev + 1);
            return;
        }
        
        // Otherwise just change the header
        setActiveHeader(header);
    };
    
    // Get the appropriate Lottie animation based on active window and header
    const getLottieAnimation = () => {
        // Get header index
        const headerIndex = simulatorTexts.findIndex(text => text.header === activeHeader);
        
        // Select lottie based on window and header
        if (activeWindow === "RLHF") {
            switch(headerIndex) {
                case 0: // Coding and Software
                    return lottie1;
                case 1: // Specialist
                    return lottie2;
                case 2: // Linguistics
                    return lottie3;
                case 3: // Generalist
                    return lottie4;
                default:
                    return lottie1;
            }
        } else if (activeWindow === "SFT") {
            switch(headerIndex) {
                case 0: // Coding and Software
                    return lottie5;
                case 1: // Specialist
                    return lottie6;
                case 2: // Linguistics
                    return lottie7;
                case 3: // Generalist
                    return lottie8;
                default:
                    return lottie5;
            }
        }
        
        // Default case
        return lottie1;
    };
    
    return (
        <div className="simulator__frame-wrapper">
            <div className="simulator__frame">
                <div className="simulator__window-bar-wrapper">
                    {windowNames.map(windowName => (
                        <div 
                            key={windowName}
                            className={`simulator__window-bar ${activeWindow === windowName ? 'simulator__window-bar--active' : ''}`}
                            onClick={() => handleWindowChange(windowName)}
                        >
                            <div className="simulator__window-bar-text">{windowName}</div>
                        </div>
                    ))}
                </div>
                <div className="simulator__frame-lottie">
                    <Lottie
                        animationData={getLottieAnimation()} 
                        loop 
                        play
                        style={{ width: '100%', height: '100%' }}
                        key={`${activeWindow}-${activeHeader}-${resetAnimation}`}
                    />
                </div>
            </div>
            <div className="simulator__frame-content">
                <SimulatorText 
                    isOpen={true} 
                    activeHeader={activeHeader}
                    onHeaderClick={handleHeaderChange}
                    resetAnimation={resetAnimation}
                />
            </div>
        </div>
    )
}
export default Simulator;