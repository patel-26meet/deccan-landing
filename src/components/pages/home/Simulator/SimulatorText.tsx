import { ISimulatorText } from '@/interfaces/components/simulator.type';
import { FC, useState, useEffect, useRef } from 'react';
import { simulatorText } from '@/constants/pages/home/simulator';

const SimulatorText: FC<ISimulatorText> = ({
    isOpen,
    activeHeader,
    onHeaderClick,
    resetAnimation = 0
}) => {
    // Get headers from the actual data
    const headers = simulatorText.contentText.map(item => item.header);
    
    // Animation key to force re-render when active header changes
    const [animationKey, setAnimationKey] = useState<number>(0);
    
    // Timer ref to keep track of the timeout
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    
    // Function to advance to the next header
    const advanceToNextHeader = () => {
        const currentIndex = headers.findIndex(header => header === activeHeader);
        
        // If we're at the last header, tell parent to switch window
        if (currentIndex === headers.length - 1) {
            // We pass a special flag to indicate we've reached the end
            onHeaderClick('__SWITCH_WINDOW__');
        } else {
            // Otherwise just advance to next header
            const nextIndex = currentIndex + 1;
            onHeaderClick(headers[nextIndex]);
        }
    };
    
    // Reset animation and set up timer when active header changes OR when resetAnimation changes
    useEffect(() => {
        // Clear any existing timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        
        // Reset animation key
        setAnimationKey(prev => prev + 1);
        
        // Set a new timer to advance to next header
        // Animation duration is 4s, so we set timer to 4s
        timerRef.current = setTimeout(() => {
            advanceToNextHeader();
        }, 4000);
        
        // Clean up timer on unmount or when dependencies change
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [activeHeader, resetAnimation]);

    // Handle manual header clicks
    const handleHeaderClick = (header: string) => {
        // Clear any existing timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        
        // Pass the clicked header up to parent
        onHeaderClick(header);
    };

    return (
        <div className="simulator__text-wrapper">
            {isOpen && (
                <>
                    <div className="simulator__headers">
                        {headers.map((header) => {
                            const isActive = activeHeader === header;
                            const description = simulatorText.contentText.find(
                                item => item.header === header
                            )?.description || '';
                            
                            return (
                                <div key={header} className="simulator__header-item">
                                    <h4 
                                        className={`simulator__item-header ${isActive ? 'simulator__item-header--active' : ''}`}
                                        onClick={() => handleHeaderClick(header)}
                                    >
                                        {header}
                                    </h4>
                                    
                                    {isActive && (
                                        <div className="simulator__text-content">
                                            {description}
                                        </div>
                                    )}
                                    
                                    {/* Add key to force re-render when active */}
                                    <div 
                                        key={isActive ? `active-${animationKey}` : `inactive-${header}`}
                                        className={`simulator__progress-bar ${isActive ? 'simulator__progress-bar--active' : ''}`} 
                                    />
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    )
}

export default SimulatorText;