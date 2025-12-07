import React, { useState, useEffect } from "react";
import { ShoppingCart, Search, User, Heart, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [favorisCount, setFavorisCount] = useState(0);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // MISE À JOUR DES COMPTEURS
  useEffect(() => {
    const updateCounts = () => {
      // Compter panier
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      } else {
        setCartCount(0);
      }

      // Compter favoris
      const savedFavoris = localStorage.getItem("favoris");
      if (savedFavoris) {
        setFavorisCount(JSON.parse(savedFavoris).length);
      } else {
        setFavorisCount(0);
      }
    };

    updateCounts();

    // Écouter les changements de localStorage
    window.addEventListener("storage", updateCounts);

    // Écouter un événement personnalisé pour forcer la mise à jour
    const handleUpdate = () => updateCounts();
    window.addEventListener("cartUpdated", handleUpdate);
    window.addEventListener("favorisUpdated", handleUpdate);

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("cartUpdated", handleUpdate);
      window.removeEventListener("favorisUpdated", handleUpdate);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-evenly">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-white shadow-lg p-2 flex items-center justify-center">
              <img
                src="./public/Molly.JPG"
                alt="Molly"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                L'Univers de Molly
              </h1>
              <p className="text-xs text-gray-500 italic">
                Tout pour vos compagnons adorés
              </p>
            </div>
          </Link>

          {/* BARRE DE RECHERCHE */}
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

          {/* ACTIONS */}
          <div className="flex items-center gap-6">
            {/* COMPTE - AFFICHAGE CONDITIONNEL */}
            {isAuthenticated ? (
              // SI CONNECTÉ
              <div className="flex items-center gap-4">
                <Link
                  to="/dashboard"
                  className="hidden md:flex items-center gap-2 text-gray-700 hover:text-purple-600 transition"
                >
                  <User size={20} />
                  <span className="text-sm font-medium">
                    Bonjour {user?.firstName || "Utilisateur"}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 transition"
                  title="Se déconnecter"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              // SI NON CONNECTÉ
              <Link
                to="/login"
                className="hidden md:flex items-center gap-2 text-gray-700 hover:text-purple-600 transition"
              >
                <User size={20} />
                <span className="text-sm font-medium">Se connecter</span>
              </Link>
            )}

            {/* FAVORIS */}
            <Link
              to="/favoris"
              className="relative hover:text-purple-600 transition"
            >
              <Heart size={24} className="text-gray-700" />
              {favorisCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {favorisCount}
                </span>
              )}
            </Link>

            {/* PANIER */}
            <Link
              to="/panier"
              className="relative hover:text-purple-600 transition"
            >
              <ShoppingCart size={24} className="text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* MENU NAVIGATION */}
      <nav className="border-t border-purple-100">
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex items-center justify-center gap-8 py-3">
            <li>
              <Link
                to="/alimentation"
                className="text-md font-medium text-gray-700 hover:text-orange-600 transition"
              >
                Alimentation
              </Link>
            </li>

            <li>
              <Link
                to="/jouets"
                className="text-md font-medium text-gray-700 hover:text-purple-600 transition"
              >
                Jouets
              </Link>
            </li>

            <li>
              <Link
                to="/accessoires"
                className="text-md font-medium text-gray-700 hover:text-blue-600 transition"
              >
                Accessoires
              </Link>
            </li>

            <li>
              <Link
                to="/habitat"
                className="text-md font-medium text-gray-700 hover:text-green-600 transition"
              >
                Habitat
              </Link>
            </li>

            <li>
              <Link
                to="/hygiene"
                className="text-md font-medium text-gray-700 hover:text-pink-600 transition"
              >
                Bien-être
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
