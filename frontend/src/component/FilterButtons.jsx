import React from "react";
import { SlidersHorizontal } from 'lucide-react'; 

function FilterButtons({ selected, setSelected }) {
  const filters = ["All", "Buy", "Sell", "Hold"];

  return (
    <div className="filters-container">
      <SlidersHorizontal size={20} className="filter-icon" />
      <div className="filters">
        {filters.map((f) => (
          <button
            key={f}
            className={selected === f ? "active" : ""}
            onClick={() => setSelected(f)}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterButtons;