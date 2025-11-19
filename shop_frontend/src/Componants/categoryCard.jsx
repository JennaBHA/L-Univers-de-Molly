// ============================================
// COMPOSANT : CATEGORY CARD (Carte de catégorie)
// ============================================
import React from "react";
{
  /* Obligatoire en haut de chaque page */
}

const CategoryCard = ({ title, icon, bgColor }) => {
  // Ce composant REÇOIT des props (title, icon, bgColor)
  // et les utilise pour afficher la carte

  return (
    // Carte avec fond blanc, coins arrondis et ombre
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
      {/* ZONE COLORÉE avec l'icône */}
      <div
        className={`${bgColor} h-40 flex items-center justify-center text-6xl`}
      >
        {/* On affiche l'emoji/icône passé en prop */}
        {icon}
      </div>

      {/* ZONE DE TEXTE */}
      <div className="p-4">
        {/* Titre de la catégorie */}
        <h3 className="font-bold text-lg">{title}</h3>

        {/* Lien "Voir plus" */}
        <a href="#" className="text-blue-600 text-sm hover:underline">
          Voir plus
        </a>
      </div>
    </div>
  );
};

// EXPORT du composant
export default CategoryCard;
