'use client';

import Lottie from 'react-lottie-player';
import moneyAnimation from '../../../../../public/assets/benefits/lottie/Money-2.json';
import { useInView } from 'react-intersection-observer';

const Payments = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px 200px 0px',
    threshold: 0.2
  });

  return (
    <div ref={ref} className="benefits__payments">
      <div className="benefits__payments__lottie">
        <Lottie
          animationData={moneyAnimation}
          loop
          play={inView}
          style={{ width: '100%', height: '100%', backgroundColor: 'transparent', opacity: '1' }}
        />
      </div>
      <div className="benefits__payments__header">Get Payments</div>
      <div className="benefits__payments__text">
        Get paid for every hour of contribution, seamless bi-monthly payments in your bank account!
      </div>
    </div>
  );
};

export default Payments;
