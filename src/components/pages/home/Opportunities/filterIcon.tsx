"use client"

import { IFilterIconType } from "@/interfaces/components/_Filtericon.type";
import { FC } from "react";

const FilterIcon: FC<IFilterIconType> = ({
  isSelected,
  text
}) => {
  const getIconPath = () => {
    const suffix = isSelected ? "-2" : "-1";
    
    switch(text) {
      case "All":
        return null; // No icon for "All"
      case "Coding and Software":
        return `/assets/opportunities/filter/coding${suffix}.svg`;
      case "AI/ML":
        return `/assets/opportunities/filter/ml${suffix}.svg`;
      case "Linguistics":
        return `/assets/opportunities/filter/linguistics${suffix}.svg`;
      case "Specialist":
        return `/assets/opportunities/filter/specialist${suffix}.svg`;
      default:
        return null; 
    }
  };

  const iconPath = getIconPath();

  return (
    <div className={`filter-icon-btn ${isSelected ? 'selected' : ''}`}>
      {iconPath && <img src={iconPath} alt="" />}
      <div className="filter-icon-text">{text}</div>
    </div>
  );
};

export default FilterIcon;
