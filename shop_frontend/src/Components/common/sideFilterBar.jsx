import React from "react";

const SideFilterBar = ({
  selectedAnimal,
  selectedType,
  onAnimalChange,
  onTypeChange,
}) => {
  const animalFilters = [
    { id: "all", label: "Tous" },
    { id: "chien", label: "Chiens" },
    { id: "chat", label: "Chats" },
    { id: "rongeur", label: "Rongeurs" },
    { id: "oiseau", label: "Oiseaux" },
    { id: "poisson", label: "Poissons" },
  ];

  const typeFilters = [
    { id: "all", label: "Tous types" },
    { id: "patee", label: "Pâtée" },
    { id: "croquettes", label: "Croquettes" },
    { id: "gourmet", label: "Gourmet" },
    { id: "friandises", label: "Friandises" },
    { id: "prix", label: "Petit prix" },
  ];

  return (
    <div className="space-y-6">
      {/* FILTRE HORIZONTAL : TYPE D'ANIMAL */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🐾</span>
          <h3 className="text-lg font-bold text-gray-800">
            Filtrer par animal
          </h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {animalFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onAnimalChange(filter.id)}
              className={`
                px-6 py-3 rounded-full font-medium text-sm transition-all duration-300
                flex items-center gap-2 border-2
                ${
                  selectedAnimal === filter.id
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-lg scale-105"
                    : "bg-white text-gray-700 border-orange-200 hover:border-orange-400 hover:shadow-md"
                }
              `}
            >
              <span className="text-lg">{filter.emoji}</span>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* LAYOUT AVEC SIDEBAR */}
      <div className="flex gap-6">
        {/* SIDEBAR VERTICAL : TYPE D'ALIMENTATION */}
        <aside className="w-64 flex-shrink-0">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-100 sticky top-24">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🍽️</span>
              <h3 className="text-lg font-bold text-gray-800">Type</h3>
            </div>
            <div className="space-y-2">
              {typeFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => onTypeChange(filter.id)}
                  className={`
                    w-full px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300
                    flex items-center gap-3 border-2
                    ${
                      selectedType === filter.id
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-lg"
                        : "bg-white text-gray-700 border-orange-100 hover:border-orange-300 hover:bg-orange-50"
                    }
                  `}
                >
                  <span className="text-xl">{filter.emoji}</span>
                  <span className="text-left flex-1">{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* CONTENU PRINCIPAL */}
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default SideFilterBar;
