"use client";

import Lottie from "react-lottie-player";
import moneyAnimation from "../../../../../public/assets/benefits/lottie/Money-2.json";

const Payments = () => {
    return (
        <div className="payments-wrapper">
            <div className="payments-lottie">
                <Lottie 
                    animationData={moneyAnimation} 
                    loop
                    play
                    style={{ width: '100%', height: '100%', backgroundColor: 'transparent', opacity: '1' }}
                />  
            </div>
            <div className="payments-header">Get Payments</div>
            <div className="payments-text">Get paid for every hour of contribution, seamless bi-monthly payments in your bank account!</div>
        </div> 
    )
}

export default Payments;