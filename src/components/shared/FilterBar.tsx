'use client';

import { IFilterBarProps } from '@/interfaces/components/filterbar.type';
import { FC } from 'react';

const FilterBar: FC<IFilterBarProps> = ({
  options,
  selectedFilter,
  onFilterChange,
  className = '',
  FilterIcon,
}) => {
  return (
    <div className={`filter-bar ${className}`}>
      {options.map(option => (
        <div key={option.id} onClick={() => onFilterChange(option.id)}>
          <FilterIcon isSelected={selectedFilter === option.id} text={option.text} />
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
