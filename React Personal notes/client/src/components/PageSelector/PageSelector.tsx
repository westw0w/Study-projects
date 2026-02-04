import { FC } from "react";
import "./PageSelector.css";

interface IPageSelectorProps {
  currentPage: number;
  pageCount: number;
  canSelectNext: boolean;
  canSelectPrev: boolean;
  onNextClick: () => void;
  onPrevClick: () => void;
}

export const PageSelector: FC<IPageSelectorProps> = ({
  currentPage,
  pageCount,
  onNextClick,
  onPrevClick,
  canSelectNext,
  canSelectPrev,
}) => {
  return (
    <div className="page-selector">
      <button
        disabled={!canSelectPrev}
        className="page-selector__button"
        onClick={onPrevClick}
      >
        {"<"}
      </button>
      <span className="page-selector__page">{currentPage} / {pageCount}</span>

      <button
        disabled={!canSelectNext}
        className="page-selector__button"
        onClick={onNextClick}
      >
        {">"}
      </button>
    </div>
  );
};
