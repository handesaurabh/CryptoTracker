import React from 'react';
import './SortButtons.css';

const SortButtons = ({ sortByMarketCap, sortByPercentageChange }) => {
  return (
    <div className="sort-buttons">
      <button onClick={sortByMarketCap} className="sort-button">
        Sort by Market Cap
      </button>
      <button onClick={sortByPercentageChange} className="sort-button">
        Sort by % 
      </button>
    </div>
  );
};

export default SortButtons;