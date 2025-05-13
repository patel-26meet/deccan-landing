'use client';

import { useRef, useState, useEffect } from 'react';
import Button from '@/components/shared/Button';
import Community from './Benefits/Community';
import EventsAndMeetups from './Benefits/EventsAndMeetups';
import LearningAndDev from './Benefits/LearningAndDev';
import Opportunities from './Benefits/Opportunities';
import Payments from './Benefits/Payments';
import WorkAndImpact from './Benefits/WorkAndImpact';
import FilterIcon from './Opportunities/filterIcon';
import OpportunitiesCard from './Opportunities/opportunitiesCard';
import { opportunitiesData } from '../../../constants/pages/home/opportunitiesData';
import { useState as useStateInternal, useMemo } from 'react';
import FilterBar from '@/components/shared/FilterBar';

const OpportunitiesAndBenifits = () => {
  const [selectedFilter, setSelectedFilter] = useStateInternal('All');

  // Reference to the section wrapper
  const sectionRef = useRef<HTMLDivElement>(null);
  // State to track visibility
  const [isVisible, setIsVisible] = useState(false);
  // State to track if we're coming from simulator (above) or statistics (below)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom intersection observer implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2, // Trigger when 20% visible - earlier than child components
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

  const handleFilterClick = (filterText: string) => {
    setSelectedFilter(filterText);
  };

  const filteredOpportunities = useMemo(() => {
    if (selectedFilter === 'All') {
      const specificOpportunities = [
        'Python Developer',
        'NLP Engineers',
        'Fitness Coach',
        'Gujarati expert',
        'Medical Experts',
        'React Developer',
      ];

      return opportunitiesData.filter(item => specificOpportunities.includes(item.header));
    } else {
      return opportunitiesData.filter(item => item.category === selectedFilter).slice(0, 6);
    }
  }, [selectedFilter]);

  const filterOptions = [
    { id: 'All', text: 'All' },
    { id: 'Coding and Software', text: 'Coding and Software' },
    { id: 'AI/ML', text: 'AI/ML' },
    { id: 'Specialist', text: 'Specialist' },
    { id: 'Linguistics', text: 'Linguistics' },
  ];

  return (
    <>
      <div
        ref={sectionRef}
        className={`opportunities-and-benefits-wrapper ${isVisible ? 'fade-in-visible' : 'fade-in-hidden'} ${scrollDirection === 'down' ? 'from-simulator' : 'from-statistics'}`}
      >
        <div className="opportunities-wrapper">
          <div className="opportunities__header">Opportunities </div>
          <div className="opportunities__text">
            {' '}
            Explore flexible, remote opportunities and shape the future of AI, all at your own pace
          </div>
          <FilterBar
            options={filterOptions}
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterClick}
            className="opportunities__filter-bar"
            FilterIcon={FilterIcon}
          />
          <div className="opportunities__cards">
            {filteredOpportunities.map((opportunity, index) => (
              <OpportunitiesCard
                key={index}
                header={opportunity.header}
                description={opportunity.description}
                rate={opportunity.rate}
                category={opportunity.category}
              />
            ))}
          </div>
          <Button
            text="Get Started"
            mode="dark"
            state="default"
            className="opportunities__button"
          />
        </div>
        <div className="benefits-wrapper">
          <div className="benefits-header">Benefits of Working with Us</div>
          <div className="benefits-text">Unlock your potential beyond geographic limitations</div>
          <div className="benefits-cards-wrapper">
            <div className="benefits-lnd-events">
              <LearningAndDev />
              <EventsAndMeetups />
            </div>
            <div className="benefits-others">
              <div className="benefits-payments-flexible">
                <WorkAndImpact />
                <Payments />
              </div>
              <div className="benefits-opportunities-community">
                <Opportunities />
                <Community />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpportunitiesAndBenifits;
