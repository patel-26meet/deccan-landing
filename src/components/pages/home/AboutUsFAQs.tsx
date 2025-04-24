"use client"

import React, { useState, useRef, useEffect } from 'react'
import FaqCard from './Faqs/FaqCard'
import Button from '@/components/shared/Button';

// Sample FAQ data
const faqData = [
  {
    question: "How do I get started?",
    answer: "You can get started by signing up on our platform, completing your profile, and exploring available opportunities that match your skills and interests."
  },
  {
    question: "What kind of opportunities are available?",
    answer: "We offer a variety of opportunities including AI development, data annotation, content creation, and specialized roles that contribute to advancing AI technology."
  },
  {
    question: "Do I need specific qualifications?",
    answer: "While some opportunities may require specific skills or experience, we have roles suitable for various expertise levels. Our platform helps match you with opportunities that fit your profile."
  },
  {
    question: "How does payment work?",
    answer: "We offer flexible payment options based on the type of work and your contribution. Payments are processed securely through our platform according to the terms of each opportunity."
  }
]

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
        rootMargin: "0px"
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
        <div className='about-us-wrapper'>
            <div className='about-us-header'>About Us</div>
            <div className='about-us-text'>We&apos;re a young and lightning-fast team based out of San Francisco and Hyderabad.
            We&apos;re on a mission to build AI for Good.</div>
        </div>
        <div className='about-us-btn-wrapper'>
          <Button
              text="Read More"
              mode="dark"
              state="default"
              className="read-more-btn"
          />
        </div>
        
        <div className='faqs-wrapper'>
            <div className='faqs-header'>Frequently Asked Questions</div>
            <div className='faqs-cards-container'>
              {faqData.map((faq, index) => (
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
            <div className='faqs-btn-wrapper'>
              <Button
                  text="See All FAQs"
                  mode="dark"
                  state="default"
                  className="faqs-btn"
              />
            </div>
        </div>
        
    </div>
  )
}
