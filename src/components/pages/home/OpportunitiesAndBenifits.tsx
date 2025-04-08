"use client"

import FilterIcon from "./Opportunities/filterIcon";
import OpportunitiesCard from "./Opportunities/opportunitiesCard";

const OpportunitiesAndBenifits = () => {
    return (
        <div className="opportunities-and-benefits-wrapper">
            <h1 className="opportunities-header">Opportunities </h1>
            <div className="opportunities-text"> Explore flexible, remote opportunities and shape the future of AI, all at your own pace</div>
            <div className="opportunities-bar">
                <FilterIcon useGradient={true} icon={""} text="All" isWhiteText={true} />
                <FilterIcon useGradient={false} icon={""} text="Coding and Software" isWhiteText={false} />
                <FilterIcon useGradient={false} icon={""} text="AI/ML" isWhiteText={true} />
                <FilterIcon useGradient={false} icon={""} text="Specialist" isWhiteText={true} />
                <FilterIcon useGradient={false} icon={""} text="Linguistics" isWhiteText={true} />
            </div>
            <div>
                <OpportunitiesCard header="Python Developer" description="Remote" rate="Starts $20/hr"/>
            </div>
        </div>
    );
}

export default OpportunitiesAndBenifits;