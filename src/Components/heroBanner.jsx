import React from "react"; //obligatoire pour chaque fichier
//Bannière principal

const HeroBanner = () => {
  return (
    //section avec fond dégrader (que je vais remplacer par des images dans le futur)
    <section className="bg-gradiant-to-r from-gray-700-to-gray-800 text-white py-16">
      {/* Container centrer avec padding */}
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* TITRE PRINCIPAL */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Tout pour vos animaux de compagnie
        </h2>

        {/* SOUS-TITRE */}
        <p className="text-xl text-gray-300">
          Découvrez notre sélection de produits de qualité - Livraison rapide
        </p>
      </div>
    </section>
  );
};

// EXPORT du composant
export default HeroBanner;
