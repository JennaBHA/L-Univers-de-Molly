//obligatoire pour chaque fichier
import React, { useState } from "react";
// sert a afficher les logos utiliser dans le site
import { ShoppingCart, Search, User } from "lucide-react";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <header>
      {/* PREMIÈRE PARTIE - Fond gris foncé (gray-800) */}
      <div className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Logo + Recherche + Actions */}
          <div className="flex items-center justify-between gap-4">
            {/* ... tout ton code du logo, recherche, panier ... */}

            {/* LOGO */}
            <div className="flex items-center gap-2">
              <a href="/">
                {/* Valeur specifique, propriete Tailwind + [valeur CSS] */}
                <img src="./../public/Logo_UDM.png" className="h-[40px]" />
              </a>
            </div>

            {/* Barre de recherche */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="flex w-full bg-white rounded-lg overflow-hidden">
                <select className="px-3 py-2 bg-gray-100 text-gray-800 border-none text-sm">
                  <option>Toutes les catégories</option>
                  <option>Alimentation</option>
                  <option>Jouets</option>
                  <option>Accessoires</option>
                  <option>Hygiène</option>
                </select>
                <input
                  type="text"
                  placeholder="Rechercher des produits..."
                  className="flex-1 px-4 py-2 text-gray-800 outline-none"
                />
                <button className="bg-orange-500 px-6 hover:bg-orange-600 transition">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Actions utilisateur */}
            <div className="flex items-center gap-4">
              <button className="hidden md:block hover:text-blue-400 transition text-sm">
                Identifiez-vous
              </button>
              <button className="hidden md:block hover:text-blue-400 transition text-sm">
                et Commandes
              </button>
              <button className="relative hover:text-blue-400 transition">
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
              <button className="hover:text-blue-400 transition">
                <User size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DEUXIÈME PARTIE - Fond NOIR (gray-900 ou bg-black) */}
      <nav className="bg-gray-900 text-white border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3">
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
        </div>
      </nav>
    </header>
  );
};

// EXPORT du composant
export default Header;
