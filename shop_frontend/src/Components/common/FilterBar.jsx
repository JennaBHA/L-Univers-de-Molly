import React from "react";

const FilterBar = ({ selectedFilter, onFilterChange }) => {
  const filters = [
    { id: "all", label: "Tous" },
    { id: "chien", label: "Chiens" },
    { id: "chat", label: "Chats" },
    { id: "rongeur", label: "Rongeurs" },
    { id: "oiseau", label: "Oiseaux" },
    { id: "poisson", label: "Poissons" },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100 mb-8">
      {/* TITRE */}
      <div className="flex items-center gap-3 mb-4">
        {/* <span className="text-2xl">🔍</span> */}
        <h3 className="text-lg font-bold text-gray-800">Filtrer par animal</h3>
      </div>

      {/* BOUTONS DE FILTRES */}
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`
              px-6 py-3 rounded-full font-medium text-sm transition-all duration-300
              flex items-center gap-2 border-2
              ${
                selectedFilter === filter.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg scale-105"
                  : "bg-white text-gray-700 border-purple-200 hover:border-purple-400 hover:shadow-md"
              }
            `}
          >
            <span className="text-lg">{filter.emoji}</span>
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
