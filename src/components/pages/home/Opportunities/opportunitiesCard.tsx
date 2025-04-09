import { IOpportunitiesCard } from "@/interfaces/components/opportunitiesCard.type";
import { FC } from "react";

const OpportunitiesCard: FC<IOpportunitiesCard>= ({
    header,
    description,
    rate,
}) => {
    return (
        <div className="opportunities-card-container">
            <div className="opportunities-card">
                <div className="opportunities-card-zone">
                    <div className="opportunities-card-details">
                        <div className="opportunities-card-header">{header}</div>
                        <div className="opportunities-card-description">{description}</div>
                        <div className="opportunities-card-rate">{rate}</div>
                    </div>
                    <div className="opportunities-card-button">
                        <div className="opportunities-card-button-text">Apply Now</div>
                    </div>
                </div>
            </div>
            <div className="opportunities-card-image">
                <img src="/assets/solar_code-linear.svg" alt="" />
            </div>
        </div>
    )
}

export default OpportunitiesCard;