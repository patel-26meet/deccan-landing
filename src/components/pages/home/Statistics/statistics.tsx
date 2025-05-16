'use client';

import { statsData } from '@/constants/pages/home/stats';
import { FC } from 'react';
import CountUp from 'react-countup';

const Statistics: FC = () => {
  return (
    <div className="statistics">
      <div className="statistics__container">
        <div className="statistics__heading">Be a part of the Soul Community</div>
        <div className="statistics__display">
          {statsData.map((item, index) => {
            return (
              <div className="statistics__item" key={index}>
                <h1 className="statistics__item__value">
                  {item.isMillions ? (
                    <CountUp
                      enableScrollSpy
                      startVal={0}
                      end={Number(item.val)}
                      duration={5}
                      className="statistics__item__countup"
                      formattingFn={value => {
                        const prefix = item.prefix || '';
                        if (value < 1000) {
                          return `${prefix}${value}K+`;
                        } else {
                          if (value === Number(item.val)) {
                            return `${prefix}${Math.floor(value / 1000)}M+`;
                          }
                          return item.noDecimals
                            ? `${prefix}${Math.floor(value / 1000)}M+`
                            : `${prefix}${(value / 1000).toFixed(1)}M+`;
                        }
                      }}
                      decimals={item.noDecimals ? 0 : 1}
                    />
                  ) : (
                    <CountUp
                      enableScrollSpy
                      startVal={0}
                      end={Number(item.val)}
                      duration={5}
                      className="statistics__item__countup"
                      prefix={item.prefix}
                      suffix={item.suffix}
                    />
                  )}
                </h1>
                <p className="statistics__item__description">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
