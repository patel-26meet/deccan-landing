import { ComponentType } from "react";

export interface IFilterOption {
    id: string;
    text: string;
}
  
export interface IFilterBarProps {
    options: IFilterOption[];
    selectedFilter: string;
    onFilterChange: (filterId: string) => void;
    className?: string;
    FilterIcon: ComponentType<{
      isSelected: boolean;
      text: string;
    }>;
}