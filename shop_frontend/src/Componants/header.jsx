import React, { useState } from "react"; //obligatoire pour chaque fichier
import { ShoppingCart, Search, User } from "lucide-react"; // sert a afficher les logos utiliser dans le site

const Header = () => {
  // État pour gérer le nombre d'articles dans le panier
  const [cartCount /*setCartCount*/] = useState(0);

  return (
    <header className="bg-gray-900 text-white">
      {/* Container principal */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* PREMIÈRE LIGNE : Logo + Recherche + Actions */}
        <div className="flex items-center justify-between gap-4">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <a href="/">
              {/* Valeur specifique, propriete Tailwind + [valeur CSS] */}
              <img src="./../public/Logo_UDM.png" className="h-[40px]" />
            </a>
          </div>

          {/* BARRE DE RECHERCHE (cachée sur mobile) */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="flex w-full bg-white rounded-lg overflow-hidden">
              {/* Sélecteur de catégorie */}
              <select className="px-3 py-2 bg-gray-100 text-gray-800 border-none text-sm outline-none">
                <option>Toutes les catégories</option>
                <option>Alimentation</option>
                <option>Jouets</option>
                <option>Accessoires</option>
                <option>Hygiène</option>
              </select>

              {/* Champ de recherche */}
              <input
                type="text"
                placeholder="Rechercher des produits..."
                className="flex-1 px-4 py-2 text-gray-800 outline-none"
              />

              {/* Bouton recherche */}
              <button className="bg-orange-500 px-6 hover:bg-orange-600 transition">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* ACTIONS UTILISATEUR */}
          <div className="flex items-center gap-4">
            {/* Bouton Identifiez-vous */}
            <button className="hidden md:block hover:text-blue-400 transition text-sm">
              Identifiez-vous
            </button>

            {/* Bouton et Commandes */}
            <button className="hidden md:block hover:text-blue-400 transition text-sm">
              et Commandes
            </button>

            {/* Bouton PANIER avec badge */}
            <button className="relative hover:text-blue-400 transition">
              <ShoppingCart size={24} />
              {/* Badge rouge avec le nombre d'articles */}
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Bouton UTILISATEUR */}
            <button className="hover:text-blue-400 transition">
              <User size={24} />
            </button>
          </div>
        </div>

        {/* DEUXIÈME LIGNE : Menu de navigation */}
        <nav className="mt-4 border-t border-gray-700 pt-3">
          <ul className="flex flex-wrap gap-6 text-sm">
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                🍖 Alimentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                🎾 Jouets
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                🦴 Accessoires
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                🏠 Habitat
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                💊 Santé
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                🎁 Promos
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// EXPORT du composant
export default Header;
