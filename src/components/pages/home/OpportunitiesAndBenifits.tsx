"use client"

import Community from "./Benefits/Community";
import EventsAndMeetups from "./Benefits/EventsAndMeetups";
import LearningAndDev from "./Benefits/LearningAndDev";
import Opportunities from "./Benefits/Opportunities";
import Payments from "./Benefits/Payments";
import WorkAndImpact from "./Benefits/WorkAndImpact";
import FilterIcon from "./Opportunities/filterIcon";
import OpportunitiesCard from "./Opportunities/opportunitiesCard";
import { useState } from "react";
import Statistics from "./Statistics/statistics";

const OpportunitiesAndBenifits = () => {
    const [selectedFilter, setSelectedFilter] = useState("All");
    
    const handleFilterClick = (filterText: string) => {
        setSelectedFilter(filterText);
    };

    return (
        <>
            <div className="opportunities-and-benefits-wrapper">
                <div className="opportunities-wrapper">
                    <div className="opportunities-header">Opportunities </div>
                        <div className="opportunities-text"> Explore flexible, remote opportunities and shape the future of AI, all at your own pace</div>
                        <div className="opportunities-bar">
                            <div onClick={() => handleFilterClick("All")}>
                                <FilterIcon isSelected={selectedFilter === "All"} text="All" />
                            </div>
                            <div onClick={() => handleFilterClick("Coding and Software")}>
                                <FilterIcon isSelected={selectedFilter === "Coding and Software"} text="Coding and Software" />
                            </div>
                            <div onClick={() => handleFilterClick("AI/ML")}>
                                <FilterIcon isSelected={selectedFilter === "AI/ML"} text="AI/ML" />
                            </div>
                            <div onClick={() => handleFilterClick("Specialist")}>
                                <FilterIcon isSelected={selectedFilter === "Specialist"} text="Specialist" />
                            </div>
                            <div onClick={() => handleFilterClick("Linguistics")}>
                                <FilterIcon isSelected={selectedFilter === "Linguistics"} text="Linguistics" />
                            </div>
                        </div>
                        <div className="opportunities-cards-wrapper">
                            <OpportunitiesCard header="Python Developer" description="Remote" rate="Starts $20/hr"/>
                            <OpportunitiesCard header="Python Developer" description="Remote" rate="Starts $20/hr"/>
                            <OpportunitiesCard header="Python Developer" description="Remote" rate="Starts $20/hr"/>
                            <OpportunitiesCard header="Python Developer" description="Remote" rate="Starts $20/hr"/>
                            <OpportunitiesCard header="Python Developer" description="Remote" rate="Starts $20/hr"/>
                            <OpportunitiesCard header="Python Developer" description="Remote" rate="Starts $20/hr"/>
                        </div>
                        <div className="opportunities-get-started">
                            <button className="get-started-button">Get Started</button>
                        </div>
                    </div>
                    <div className="benefits-wrapper">
                        <div className="benefits-header">Benefits of Working with Us</div>
                        <div className="benefits-text">Unlock your potential beyond geographic limitations</div>
                        <div className="benefits-cards-wrapper">
                            <div className="benefits-lnd-events">
                                <div>
                                    <LearningAndDev/>
                                </div>
                                <div>
                                    <EventsAndMeetups/>
                                </div>
                            </div>
                            <div className="benefits-others">
                                <div className="benefits-payments-flexible">
                                    <WorkAndImpact/>
                                    <Payments/>
                                </div>
                                <div className="benefits-opportunities-community">
                                    <Opportunities/>
                                    <Community/>
                                </div>
                            </div>
                        </div>
                    </div>
                
                <div className="stats">
                    <Statistics/>
                </div>
            </div>
        </>
    );
}

export default OpportunitiesAndBenifits;