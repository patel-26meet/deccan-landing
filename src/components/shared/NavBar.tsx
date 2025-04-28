"use client"

import { useEffect, useState, useRef } from 'react';

interface INavBarProps {
  initiallyTransparent?: boolean;
}

const NavBar = ({ initiallyTransparent = true }: INavBarProps) => {
    const [visible, setVisible] = useState(false); // Start hidden
    const [isTransparent, setIsTransparent] = useState(initiallyTransparent);
    const [contentVisible, setContentVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [initialFadeIn, setInitialFadeIn] = useState(true);
    const lastScrollY = useRef(0);
    const lastScrollDirection = useRef<'up' | 'down' | null>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check if viewport width is mobile
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        // Initial check
        checkIfMobile();
        
        // Listen for resize events
        window.addEventListener('resize', checkIfMobile);
        
        // Initial delay before showing navbar (sync with lottie/hero)
        const navbarTimer = setTimeout(() => {
            setVisible(true);
            setTimeout(() => setInitialFadeIn(false), 2000); // Remove initial fade-in class after transition
        }, 5000); // Adjust this delay as needed

        // Initial delay before showing navbar content
        const contentTimer = setTimeout(() => {
            setContentVisible(true);
        }, 1000);
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const heroSectionHeight = window.innerHeight; // Assuming hero section is full viewport height
            const simulatorSectionHeight = 800; // Approximate height of simulator section
            
            // Check if we're in hero or simulator section
            const isInTransparentSection = currentScrollY < (heroSectionHeight + simulatorSectionHeight) ||
                currentScrollY > document.body.scrollHeight - window.innerHeight - 300; // Footer area
            
            setIsTransparent(isInTransparentSection);
            
            // Handle show/hide based on scroll direction
            const isScrollingDown = currentScrollY > lastScrollY.current;
            const isScrollingUp = currentScrollY < lastScrollY.current;
            
            // Only trigger visibility changes when direction changes or after threshold
            const scrollThreshold = 10;
            const directionChanged = 
                (isScrollingDown && lastScrollDirection.current !== 'down') ||
                (isScrollingUp && lastScrollDirection.current !== 'up');
            
            if (directionChanged || Math.abs(currentScrollY - lastScrollY.current) > scrollThreshold) {
                // Show/hide based on scroll direction
                if (isScrollingDown && currentScrollY > 100) {
                    lastScrollDirection.current = 'down';
                    setVisible(false);
                } else if (isScrollingUp) {
                    lastScrollDirection.current = 'up';
                    setVisible(true);
                }
            }
            
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkIfMobile);
            clearTimeout(navbarTimer);
            clearTimeout(contentTimer);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // CSS classes for navbar state
    const navbarClass = `nav-bar-wrapper${initialFadeIn ? ' initial-fade-in' : ''} ${visible ? 'visible' : 'hidden'} ${
        isTransparent ? 'transparent' : 'solid'
    } ${contentVisible ? 'content-visible' : 'content-hidden'}`;

    return (
        <div className={navbarClass} ref={navRef}>
            <div className="nav-bar-left">
                <img src="/assets/deccan-logo.svg" alt="logo" />
            </div>
            <div className="nav-bar-middle">
                <div>Opportunities</div>
                <div>Testimonials</div>
                <div>Blogs</div>
                <div>About Us</div>
                <div>FAQs</div>
            </div>
            <div className="nav-bar-right">
                {isMobile ? (
                    <div className="menu-icon" onClick={toggleMenu}>
                        <img 
                            src={isTransparent ? "/assets/menu-white.svg" : "/assets/menu-black.svg"} 
                            alt="Menu" 
                        />
                    </div>
                ) : (
                    <>
                        <div>Login</div>
                        <div>Sign Up</div>
                    </>
                )}
            </div>
            
            {isMobile && menuOpen && (
                <div className="mobile-menu">
                    <div className="mobile-menu-items">
                        <div>Opportunities</div>
                        <div>Testimonials</div>
                        <div>Blogs</div>
                        <div>About Us</div>
                        <div>FAQs</div>
                        <div>Login</div>
                        <div>Sign Up</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;