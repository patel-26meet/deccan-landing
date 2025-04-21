import Simulator from "./Simulator"
import { simulatorText } from "@/constants/pages/home/simulator"

const SimulatorPage = () => {
    // Example window names - update these with your actual window names
    const windowNames = ["SFT", "RLHF"];
    
    return (
        <div className="simulator-page-wrapper">
            <div className="simulator-wrapper">
                <div className="simulator-page-header">
                    {simulatorText.headerText}
                </div>
                <div className="simulator-content-wrapper">
                    <Simulator 
                        windowNames={windowNames}
                        activeWindow="SFT"
                        simulatorTexts={simulatorText.contentText} 
                    />
                </div>
            </div>
        </div>
    )
}

export default SimulatorPage;