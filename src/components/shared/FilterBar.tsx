"use client"

import { FC, ComponentType } from 'react';

interface IFilterOption {
  id: string;
  text: string;
}

interface IFilterBarProps {
  options: IFilterOption[];
  selectedFilter: string;
  onFilterChange: (filterId: string) => void;
  className?: string;
  FilterIcon: ComponentType<{
    isSelected: boolean;
    text: string;
  }>;
}

const FilterBar: FC<IFilterBarProps> = ({
  options,
  selectedFilter,
  onFilterChange,
  className = '',
  FilterIcon
}) => {
  return (
    <div className={`filter-bar ${className}`}>
      {options.map((option) => (
        <div 
          key={option.id} 
          onClick={() => onFilterChange(option.id)}
        >
          <FilterIcon 
            isSelected={selectedFilter === option.id} 
            text={option.text} 
          />
        </div>
      ))}
    </div>
  );
};

export default FilterBar; 