'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import FaqCard from './Faqs/FaqCard';
import Button from '@/components/shared/Button';
import { aboutUsFaqsData } from '@/constants/pages/home/about-us-faqs';

export default function AboutUsFAQs() {
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);

  // Reference to the section
  const sectionRef = useRef<HTMLDivElement>(null);
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
        rootMargin: '0px',
      }
    );

    // Start observing when component mounts
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Clean up observer on unmount
    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqs(prevOpenFaqs => {
      if (prevOpenFaqs.includes(index)) {
        return prevOpenFaqs.filter(i => i !== index);
      } else {
        return [...prevOpenFaqs, index];
      }
    });
  };

  return (
    <div
      ref={sectionRef}
      className={`about-us-faqs-wrapper ${isVisible ? 'fade-in-visible' : 'fade-in-hidden'}`}
    >
      <div id="about-us-section" className="about-us-wrapper">
        <div className="about-us-header-wrapper">
          <div className="about-us-header">About Us</div>
          <div className="about-us-text">
            We&apos;re a young and lightning-fast team based out of San Francisco and Hyderabad.
            We&apos;re on a mission to build AI for Good.
          </div>
        </div>
        <div className="about-us-image-wrapper">
          <Image src="./assets/deccan-people.svg" alt="About Us" width={960} height={509} priority />
        </div>
        <div className="about-us-btn-wrapper">
          <Button text="Read More" mode="dark" state="default" className="read-more-btn" />
        </div>
      </div>

      <div id="faqs-section" className="faqs-wrapper">
        <div className="faqs-header">Frequently Asked Questions</div>
        <div className="faqs-cards-container">
          {aboutUsFaqsData.faqs.map((faq, index) => (
            <FaqCard
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFaqs.includes(index)}
              index={index}
              toggleFaq={toggleFaq}
            />
          ))}
        </div>
        <div className="faqs-btn-wrapper">
          <Button text="See All FAQs" mode="dark" state="default" className="faqs-btn" />
        </div>
      </div>
    </div>
  );
}
