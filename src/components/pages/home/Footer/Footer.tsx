"use client";

import Button from "@/components/shared/Button";
import { useRef, useState, useEffect } from "react";

const Footer = () => {
  // Reference to the footer section
  const footerRef = useRef<HTMLDivElement>(null);
  // State to track visibility
  const [isVisible, setIsVisible] = useState(false);
  
  // Custom intersection observer implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.3, // Trigger when 30% visible
        rootMargin: "0px"
      }
    );
    
    // Start observing when component mounts
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    // Clean up observer on unmount
    return () => {
      if (footerRef.current) {
        observer.disconnect();
      }
    };
  }, []);
  
  return (
    <div 
      ref={footerRef}
      className={`footer-container ${isVisible ? 'fade-in-visible' : 'fade-in-hidden'}`}
    >
      <div className='footer-get-started'>
        <span>Get Started with Soul AI now!</span>

      <div className='footer-button-wrapper'>
        <Button text="Apply Now" mode="hybrid" />
      </div>
      </div>
      <div className='footer-wrapper'>
        <div className='footer-body'>
          <div className='footer-content'>
            {/* Left column */}
            <div className='footer-left'>
              <div className='footer-logo'>
                <img src={"/assets/logos/deccan-logo.svg"} alt="Deccan AI Logo" />
              </div>
              
              <div className='footer-description'>
                At Soul AI, quality comes first. Every applicant undergoes a screening assessment and a domain-specific assessment to ensure high standards.
              </div>
              
              <div className='footer-social'>
                <div className='footer-follow'>
                  <span>Follow Us on:</span>
                  <div className='footer-social-icons'>
                    <div className='footer-social-icon'>
                        <img src={"/assets/logos/huggingface.svg"} alt="Huggingface Logo" />
                    </div>
                    <div className='footer-social-icon'>
                        <img src={"/assets/logos/linkedin.svg"} alt="LinkedIn Logo" />
                    </div>
                  </div>
                </div>
                <div className='footer-made-with'>
                  Made with 🫶 by SOUL AI
                </div>
              </div>
            </div>
            
            {/* Right column */}
            <div className='footer-right'>
              <div className='footer-sitemap'>
                <div className='footer-header'>Site Map</div>
                <div className='footer-link'>Home</div>
                <div className='footer-link'>About Us</div>
                <div className='footer-link'>Opportunities</div>
                <div className='footer-link'>FAQs</div>
                <div className='footer-link'>Testimonials</div>
              </div>
              
              <div className='footer-company-info'>
                <div className='footer-company'>
                  <div className='footer-header'>Company</div>
                  <div className='footer-link'>hey@soulhq.ai</div>
                </div>
                
                <div className='footer-location'>
                  <div className='footer-header'>Location</div>
                  <div className='footer-link'>Delaware</div>
                  <div className='footer-link'>Hyderabad</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className='footer-body-footer'>
            <div>Deccan AI Inc  |  Deccan AI Automation Private Limited</div>
            <div>Privacy Policy  |  Terms of Service</div>
            <div>Copyright © 2025. All rights reserved.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

