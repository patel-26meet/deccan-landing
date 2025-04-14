"use client";

import { FC } from "react";
import CountUp from "react-countup";

const dataToDisplay = [
  {
    val: "3000",
    description: "Paid out to experts",
    isMillions: true
  },
  {
    val: "1000",
    description: "Tasks completed successfully",
    isMillions: true
  },
  {
    val: "700",
    description: "Professionals across 60+ domains",
    suffix: "K+"
  },
  {
    val: "53",
    description: "PhDs collaborating on AI projects",
    suffix: "K+"
  },
];

const Statistics: FC = () => {
  return (
    <div className="statistics-wrapper">
      <div className="statistics">
        <div className="statistics-heading">
          Be a part of the Soul Community
        </div>
        <div className="statistics-display">
          {dataToDisplay.map((item, index) => {
            return (
              <div className="statistics-item" key={index}>
                <h1 className="statistics-name">
                  {item.isMillions ? (
                    <CountUp
                      enableScrollSpy
                      startVal={0}
                      end={Number(item.val)}
                      duration={5}
                      className="count-up-text"
                      formattingFn={(value) => {
                        if (value < 1000) {
                          return `${value.toFixed(1)}K+`;
                        } else {
                          if (value === Number(item.val)) {
                            return `${Math.floor(value/1000)}M+`;
                          }
                          return `${(value/1000).toFixed(1)}M+`;
                        }
                      }}
                      decimals={1}
                    />
                  ) : (
                    <CountUp
                      enableScrollSpy
                      startVal={0}
                      end={Number(item.val)}
                      duration={5}
                      className="count-up-text"
                      suffix={item.suffix}
                    />
                  )}
                </h1>
                <p className="statistics-description">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
