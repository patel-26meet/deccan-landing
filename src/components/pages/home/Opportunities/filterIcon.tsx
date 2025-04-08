import { IFilterIconType } from "@/interfaces/components/filterIcon.type";
import { FC } from "react";
import { Code, MedalRibbon } from "@solar-icons/react";

const FilterIcon: FC<IFilterIconType> = ({
  useGradient,
  icon,
  text,
  isWhiteText
}) => {
  return (
    <div className={`filter-icon-button ${useGradient ? 'gradient-bg' : 'white-bg'}`}>
      {icon && <img src={icon} alt="" />}
      <div className={`filter-icon-text ${isWhiteText ? 'white-text' : 'dark-text'}`}>{text}</div>
    </div>
  );
};

export default FilterIcon;
