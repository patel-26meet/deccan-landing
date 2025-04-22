import Lottie from "react-lottie-player";
import moneyAnimation from "../../../../../public/assets/benefits/lottie/opportunities.json";

const Opportunities = () => {
    return (
        <div className="opportunities-card-wrapper">
            <div className="opportunities-card-lottie">
                <Lottie 
                    animationData={moneyAnimation} 
                    loop
                    play
                    style={{ width: '100%', height: '100%', backgroundColor: 'transparent', opacity: '1' }}
                />  
            </div>
            <div className="opportunities-card-title">Bigger Opportunities</div>
            <div className="opportunities-card-text">Build connections, find mentors, and unlock doors to top organizations.</div>
        </div> 
    )
}

export default Opportunities;