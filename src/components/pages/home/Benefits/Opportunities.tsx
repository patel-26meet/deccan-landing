'use client';

import Lottie from 'react-lottie-player';
import moneyAnimation from '../../../../../public/assets/benefits/lottie/opportunities.json';
import { useInView } from 'react-intersection-observer';

const Opportunities = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px 200px 0px',
    threshold: 0.5
  });

  return (
    <div
      ref={ref}
      className={`benefits__opportunities ${inView ? 'fade-in-visible' : 'fade-in-hidden'}`}
    >
      <div className="benefits__opportunities__lottie">
        <Lottie
          animationData={moneyAnimation}
          loop
          play={inView}
          style={{ width: '100%', height: '100%', backgroundColor: 'transparent', opacity: '1' }}
          rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
        />
      </div>
      <div className="benefits__opportunities__title">Bigger Opportunities</div>
      <div className="benefits__opportunities__text">
        Build connections, find mentors, and unlock doors to top organizations.
      </div>
    </div>
  );
};

export default Opportunities;
