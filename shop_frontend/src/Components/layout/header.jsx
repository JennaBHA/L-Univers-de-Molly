import React, { useState } from "react";
import { ShoppingCart, Search, User, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [cartCount /*setCartCount*/] = useState(0);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* PARTIE PRINCIPALE */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Circle mascotte */}
            <div className="w-20 h-20 rounded-full bg-white shadow-lg p-2 flex items-center justify-center">
              <img
                src="./public/Molly.JPG"
                alt="Molly"
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            {/* Texte du logo */}
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                L'Univers de Molly
              </h1>
              <p className="text-xs text-gray-500 italic">
                Tout pour vos compagnons adorés
              </p>
            </div>
          </div>
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher un produit, une marque..."
                className="w-full px-6 py-3 rounded-full bg-gray-50 border-2 border-purple-200 focus:border-purple-400 focus:outline-none transition"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition">
                Rechercher
              </button>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 text-gray-700 hover:text-purple-600 transition"
            >
              <User size={20} />
              <span className="text-sm font-medium">Mon compte</span>
            </Link>
            {/* Bouton Favoris */}
            <button className="relative hover:text-purple-600 transition">
              <Heart size={24} className="text-gray-700" />
            </button>

            {/* Bouton Panier */}
            <button className="relative hover:text-purple-600 transition">
              <ShoppingCart size={24} className="text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>
      <nav className="border-t border-purple-100">
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex items-center justify-center gap-8 py-3">
            <li>
              <a
                href="#"
                className="text-md font-medium text-gray-700 hover:text-purple-600 transition flex items-center gap-2"
              >
                <span>🍖</span> Alimentation
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-md font-medium text-gray-700 hover:text-purple-600 transition flex items-center gap-2"
              >
                <span>🎾</span> Jouets
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-md font-medium text-gray-700 hover:text-purple-600 transition flex items-center gap-2"
              >
                <span>🦴</span> Accessoires
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-md font-medium text-gray-700 hover:text-purple-600 transition flex items-center gap-2"
              >
                <span>🏠</span> Habitat
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-md font-medium text-gray-700 hover:text-purple-600 transition flex items-center gap-2"
              >
                <span>💝</span> Bien-être
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-md font-medium bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-full hover:shadow-lg transition"
              >
                ✨ Promos
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
