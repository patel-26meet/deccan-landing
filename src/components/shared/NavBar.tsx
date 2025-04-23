"use client"

import { useEffect, useState, useRef } from 'react';

interface INavBarProps {
  initiallyTransparent?: boolean;
  initiallyVisible?: boolean;
}

const NavBar = ({ initiallyTransparent = false, initiallyVisible = true }: INavBarProps) => {
    const [visible, setVisible] = useState(false); // Start with invisible navbar
    const [isTransparent, setIsTransparent] = useState(initiallyTransparent);
    const [isDarkSection, setIsDarkSection] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);
    const lastScrollY = useRef(0);
    const navRef = useRef<HTMLDivElement>(null);
    const lastScrollDirection = useRef<'up' | 'down' | null>(null);

    useEffect(() => {
        // Initial delay before showing navbar to sync with hero animations
        const navbarTimer = setTimeout(() => {
            setVisible(initiallyVisible);
            console.log("Setting navbar visible:", initiallyVisible);
        }, 7000); // Delay showing navbar by 1 second
        
        // Set content to visible after a short delay for fade-in effect
        const contentTimer = setTimeout(() => {
            setContentVisible(true);
            console.log("Setting navbar content visible");
        }, 5000); // Show content slightly after navbar appears
        
        const handleScroll = () => {
            // Don't process scroll events if initially set to invisible
            if (!initiallyVisible && !visible) return;
            
            const currentScrollY = window.scrollY;
            const isScrollingDown = currentScrollY > lastScrollY.current;
            const isScrollingUp = currentScrollY < lastScrollY.current;
            
            // Only trigger visibility changes when direction changes or after threshold
            const scrollThreshold = 10;
            const directionChanged = 
                (isScrollingDown && lastScrollDirection.current !== 'down') ||
                (isScrollingUp && lastScrollDirection.current !== 'up');
            
            if (directionChanged || Math.abs(currentScrollY - lastScrollY.current) > scrollThreshold) {
                // Show/hide based on scroll direction with a smoother response
                if (isScrollingDown) {
                    lastScrollDirection.current = 'down';
                    setVisible(false);
                } else if (isScrollingUp) {
                    lastScrollDirection.current = 'up';
                    setVisible(true);
                }
            }
            
            // Handle transparency
            if (currentScrollY > 50) {
                setIsTransparent(false);
            } else if (initiallyTransparent) {
                setIsTransparent(true);
            }
            
            lastScrollY.current = currentScrollY;
            
            // Check background color of current section
            if (navRef.current) {
                const navElement = navRef.current;
                const navRect = navElement.getBoundingClientRect();
                const elementAtPoint = document.elementFromPoint(
                    navRect.left + navRect.width / 2,
                    navRect.bottom + 10
                );
                
                if (elementAtPoint) {
                    const bgColor = window.getComputedStyle(elementAtPoint).backgroundColor;
                    const colorValues = bgColor.match(/\d+/g);
                    if (colorValues && colorValues.length >= 3) {
                        const [r, g, b] = colorValues.map(Number);
                        // Check if background is dark (roughly)
                        const isDark = r < 50 && g < 50 && b < 50;
                        setIsDarkSection(isDark);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(navbarTimer);
            clearTimeout(contentTimer);
        };
    }, [initiallyTransparent, initiallyVisible]);

    // Update visibility when initiallyVisible prop changes
    useEffect(() => {
        // Use a timeout to sync with animation
        const timer = setTimeout(() => {
            setVisible(initiallyVisible);
        }, 500);
        
        return () => clearTimeout(timer);
    }, [initiallyVisible]);

    // CSS classes for navbar state
    const navbarClass = `nav-bar-wrapper ${visible ? 'visible' : 'hidden'} ${
        isTransparent ? 'transparent' : isDarkSection ? 'light-bg' : 'dark-bg'
    } ${contentVisible ? 'content-visible' : 'content-hidden'} ${initiallyVisible ? '' : 'initially-hidden'}`;

    // Always render the navbar, but control its visibility with CSS
    return (
        <div className={navbarClass} ref={navRef} aria-hidden={!visible}>
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
                <div>Login</div>
                <div>Sign Up</div>
            </div>
        </div>
    );
};

export default NavBar;