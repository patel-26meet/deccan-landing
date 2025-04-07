"use client";

import { IHeroSectionProps } from '@/interfaces/components/hero.type';
import useScrollPosition from '@/lib/hooks/useScrollPosition';
import React from 'react';


const HeroSection: React.FC<IHeroSectionProps> = ({
    subtitle = 'Eco makes complex onchain actions a one-click stablecoin send. Unlock stablecoin liquidity, simplify UX, and boost yield.',
    primaryCTA = 'Get Early Access',
    secondaryCTA = 'Learn More',
    label = 'Seamless Digital Experience',
}) => {
    const { scrollY } = useScrollPosition();

    // Calculate parallax values based on scroll position
    const titleTransform = `translateY(${scrollY * 0.2}px)`;
    const subtitleTransform = `translateY(${scrollY * 0.1}px)`;
    const circle1Transform = `translate(${-scrollY * 0.05}px, ${-scrollY * 0.05}px) rotate(${scrollY * 0.05}deg)`;
    const circle2Transform = `translate(${scrollY * 0.03}px, ${-scrollY * 0.04}px) rotate(${-scrollY * 0.04}deg)`;
    const circle3Transform = `translateY(${Math.sin(scrollY * 0.005) * 10}px)`;

    return (
        <section className="hero-section">
            {/* Background decoration elements */}
            <div className="hero-decorations">
                <div className="circle circle-large" style={{ transform: circle1Transform }}></div>
                <div className="circle circle-medium" style={{ transform: circle2Transform }}></div>
                <div className="circle circle-small" style={{ transform: circle3Transform }}></div>
                <div className="gradient-overlay"></div>
            </div>

            <div className="hero-content">
                <div className="hero-label">
                    <span>{label}</span>
                </div>

                <h1 className="hero-title" style={{ transform: titleTransform }}>
                    <span className="gradient-text">One Click.</span>
                    <span>Full Send.</span>
                </h1>

                <p className="hero-subtitle" style={{ transform: subtitleTransform }}>
                    {subtitle}
                </p>

                <div className="hero-cta">
                    <button className="button-primary">{primaryCTA}</button>
                    <button className="button-secondary">{secondaryCTA}</button>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="scroll-dot"></div>
            </div>
        </section>
    );
};

export default HeroSection; 