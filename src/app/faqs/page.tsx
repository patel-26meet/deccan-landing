"use client";

import FaqSection from "@/components/pages/faqs/FaqSection";
import FilterIcon from "@/components/pages/home/Opportunities/filterIcon";
import FilterBar from "@/components/shared/FilterBar";
import { faqData, faqSectionHeaders } from "@/constants/pages/faqs/faq-content";
import { useState, useMemo } from "react";

export default function Faqs() {
    const filterOptions = [
        { id: "All", text: "All" },
        { id: "Application Process", text: "Application Process" },
        { id: "AI Training", text: "AI Training" },
        { id: "Project", text: "Project" },
        { id: "Account", text: "Account" },
        { id: "Refund", text: "Refund" },
    ];

    const [selectedFilter, setSelectedFilter] = useState("All");
    const handleFilterChange = (filterId: string) => {
        setSelectedFilter(filterId);
    };
    
    const filteredSections = useMemo(() => {
        if (selectedFilter === "All") {
            return Object.keys(faqData);
        }
        return [selectedFilter];
    }, [selectedFilter]);

    return (
    <div className="faqs-page">
        <div className="faqs-page-wrapper">
            <div className="faqs-page__header">
                <div className="faqs-page__header-text-wrapper">
                    <h1 className="faqs-page__header-text">Frequently Asked Questions</h1>
                    <p className="faqs-page__description-text">Quality drives impact—elevate AI with your skills, knowledge, and dedication.</p>
                </div>
                <div className="faqs-page__filter-container">
                    <FilterBar
                        options={filterOptions}
                        selectedFilter={selectedFilter}
                        onFilterChange={handleFilterChange}
                        className="faqs-page__header-filters"
                        FilterIcon={FilterIcon}
                    />
                </div>
            </div>
            <div className="faqs-page__faq-section">
                {filteredSections.map((section) => (
                    <FaqSection 
                        key={section}
                        header={faqSectionHeaders[section as keyof typeof faqSectionHeaders]}
                        data={faqData[section]}
                    />
                ))}
            </div>
        </div>
    </div>    
    );
}