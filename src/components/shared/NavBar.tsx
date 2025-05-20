'use client';

import { useEffect, useState, useRef } from 'react';
import Button from './Button';
import { useRouter } from 'next/navigation';

// Define breakpoint constants
const BREAKPOINT_LG = 1024;

interface INavBarProps {
  initiallyTransparent?: boolean;
}

const NavBar = ({ initiallyTransparent = true }: INavBarProps) => {
  const [visible, setVisible] = useState(false); // Start hidden
  const [isTransparent, setIsTransparent] = useState(initiallyTransparent);
  const [contentVisible, setContentVisible] = useState(false);
  const [isResponsive, setIsResponsive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [initialFadeIn, setInitialFadeIn] = useState(true);
  const lastScrollY = useRef(0);
  const lastScrollDirection = useRef<'up' | 'down' | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if viewport width is mobile or tablet
    const checkIfResponsive = () => {
      setIsResponsive(window.innerWidth <= BREAKPOINT_LG);
    };

    // Initial check
    checkIfResponsive();

    // Listen for resize events
    window.addEventListener('resize', checkIfResponsive);

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
      if (typeof window === 'undefined' || typeof document === 'undefined') return;

      const currentScrollY = window.scrollY;
      const heroSectionHeight = window.innerHeight; // Assuming hero section is full viewport height
      const simulatorSectionHeight = 800; // Approximate height of simulator section

      // Check if we're in hero or simulator section
      const isInTransparentSection =
        currentScrollY < heroSectionHeight + simulatorSectionHeight ||
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
      window.removeEventListener('resize', checkIfResponsive);
      clearTimeout(navbarTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  const toggleMenu = () => {
    if (typeof document === 'undefined') return;

    setMenuOpen(!menuOpen);
    // Prevent body scrolling when menu is open
    if (!menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Close mobile menu if it's open
      if (menuOpen) {
        toggleMenu();
      }
      
      // Scroll to the section
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToLogin = () => {
    router.push('/login');
  };

  const navigateToSignup = () => {
    router.push('/login');
  };

  // CSS classes for navbar state
  const navbarClass = `nav-bar-wrapper${initialFadeIn ? ' initial-fade-in' : ''} ${visible ? 'visible' : 'hidden'} ${
    isTransparent ? 'transparent' : 'solid'
  } ${contentVisible ? 'content-visible' : 'content-hidden'} ${menuOpen ? 'menu-open' : ''}`;

  return (
    <div className={navbarClass} ref={navRef}>
      <div className="nav-bar-left">
        <img
          src={
            isTransparent ? '/assets/logos/deccan-logo.svg' : '/assets/logos/deccan-logo-black.svg'
          }
          alt="logo"
          loading="eager"
        />
      </div>
      <div className="nav-bar-middle">
        <div onClick={() => scrollToSection('opportunities-section')}>Opportunities</div>
        <div onClick={() => scrollToSection('stories-section')}>Testimonials</div>
        {/*No blogs for now*/}
        {/*<div>Blogs</div>*/}
        <div onClick={() => scrollToSection('about-us-section')}>About Us</div>
        <div onClick={() => scrollToSection('faqs-section')}>FAQs</div>
      </div>
      <div className="nav-bar-right">
        {isResponsive ? (
          <div className="menu-icon" onClick={toggleMenu}>
            <img
              src={
                menuOpen
                  ? '/assets/popup-close.svg'
                  : isTransparent
                    ? '/assets/menu.svg'
                    : '/assets/menu-black.svg'
              }
              alt="Menu"
              loading="eager"
            />
          </div>
        ) : (
          <>
            <div onClick={navigateToLogin}>Log In</div>
            <Button text="Sign Up" mode="navbar" className="nav-signup-button" onClick={navigateToSignup} />
          </>
        )}
      </div>

      {isResponsive && menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-items">
            <div className="main-nav-items">
              <div onClick={() => scrollToSection('opportunities-section')}>Opportunities</div>
              <div onClick={() => scrollToSection('stories-section')}>Testimonials</div>
              {/*No blogs for now*/}
              {/*<div>Blogs</div>*/}
              <div onClick={() => scrollToSection('about-us-section')}>About Us</div>
              <div onClick={() => scrollToSection('faqs-section')}>FAQs</div>
            </div>
            <div className="auth-nav-items">
              <div>Login</div>
              <Button text="Apply Now" mode="navbar" className="mobile-nav-signup-button" onClick={navigateToSignup} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
