import React from "react";

const CategoryCard = ({ title, icon, description, bgGradient }) => {
  return (
    <div className="group relative">
      {/* CARTE PRINCIPALE */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border border-purple-100 hover:border-purple-300">
        {/* CERCLE COLORÉ AVEC ICÔNE */}
        <div className="relative h-48 flex items-center justify-center overflow-hidden">
          {/* Cercle dégradé */}
          <div
            className={`absolute w-32 h-32 rounded-full bg-gradient-to-br ${bgGradient} blur-xl opacity-60 group-hover:scale-150 transition-transform duration-500`}
          ></div>

          {/* Cercle blanc avec icône */}
          <div className="relative w-28 h-28 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span className="text-6xl">{icon}</span>
          </div>
        </div>

        {/* ZONE DE TEXTE */}
        <div className="p-6 text-center">
          {/* TITRE */}
          <h3 className="font-bold text-xl mb-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            {title}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-sm text-gray-600 mb-4">{description}</p>

          {/* BOUTON */}
          <button className="inline-flex items-center gap-2 text-purple-600 font-medium text-sm group-hover:gap-3 transition-all">
            Découvrir
            <span className="text-lg">→</span>
          </button>
        </div>

        {/* EFFET DE LUEUR AU HOVER */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-pink-400/0 group-hover:from-purple-400/10 group-hover:to-pink-400/10 transition-all duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default CategoryCard;
