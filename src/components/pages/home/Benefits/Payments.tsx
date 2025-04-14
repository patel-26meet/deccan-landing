"use client";

import Lottie from "lottie-react";
import moneyAnimation from "../../../../../public/assets/benefits/lottie/Money-2.json";

const Payments = () => {
    return (
        <div className="payments-wrapper">
            <div className="payments-lottie">
                <Lottie 
                    animationData={moneyAnimation} 
                    loop={true}
                    style={{ backgroundColor: '#fffff', opacity: '1',  }}
                />  
            </div>
            <div className="payments-header">Get Payments</div>
            <div className="payments-text">Get paid for every hour of contribution, seamless bi-monthly payments in your bank account!</div>
        </div> 
    )
}

export default Payments;