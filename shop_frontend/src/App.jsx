import React from "react";
import Header from "./Componants/header";
import HeroBanner from "./Componants/heroBanner";
import CategoryCard from "./Componants/categoryCard"; // ← NOUVELLE LIGNE

function App() {
  return (
    <div>
      <Header />
      <HeroBanner />

      {/* Section pour tester les catégories */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Achetez par catégorie</h2>

        {/* Grille de 4 colonnes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Catégorie 1 : Alimentation */}
          <CategoryCard
            title="Alimentation"
            icon="🍖"
            bgColor="bg-purple-400"
          />

          {/* Catégorie 2 : Jouets */}
          <CategoryCard title="Jouets" icon="🎾" bgColor="bg-purple-400" />

          {/* Catégorie 3 : Accessoires */}
          <CategoryCard title="Accessoires" icon="🦴" bgColor="bg-purple-400" />

          {/* Catégorie 4 : Hygiène */}
          <CategoryCard
            title="Hygiène et soins"
            icon="🧴"
            bgColor="bg-purple-400"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
