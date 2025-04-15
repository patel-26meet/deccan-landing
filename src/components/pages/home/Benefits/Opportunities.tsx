import Lottie from "lottie-react";
import moneyAnimation from "../../../../../public/assets/benefits/lottie/opportunities.json";

const Opportunities = () => {
    return (
        <div className="opportunities-card-wrapper">
            <div className="opportunities-card-lottie">
                <Lottie 
                    animationData={moneyAnimation} 
                    loop={true}
                    style={{ backgroundColor: '#fffff', opacity: '1',  }}
                />  
            </div>
            <div className="opportunities-card-title">Bigger Opportunities</div>
            <div className="opportunities-card-text">Build connections, find mentors, and unlock doors to top organizations.</div>
        </div> 
    )
}

export default Opportunities;