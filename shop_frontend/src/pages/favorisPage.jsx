import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Trash2, ShoppingCart } from "lucide-react";
import Header from "../Components/layout/header";
import Footer from "../Components/layout/footer";
import ProductCard from "../Components/cards/productCard";

const FavorisPage = () => {
  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavoris = () => {
      try {
        const savedFavoris = localStorage.getItem("favoris");
        if (savedFavoris) {
          setFavoris(JSON.parse(savedFavoris));
        }
        setLoading(false);
      } catch (err) {
        console.error("Erreur:", err);
        setLoading(false);
      }
    };
    loadFavoris();
  }, []);

  const removeFavori = (productId) => {
    const newFavoris = favoris.filter((item) => item.id !== productId);
    setFavoris(newFavoris);
    localStorage.setItem("favoris", JSON.stringify(newFavoris));
  };

  const clearAllFavoris = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vider vos favoris ?")) {
      setFavoris([]);
      localStorage.removeItem("favoris");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* HEADER DE PAGE */}
      <div>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 font-medium transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            Retour
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">Mes Favoris</h1>
              <Heart className="text-red-500" size={32} fill="currentColor" />
            </div>

            {favoris.length > 0 && (
              <button
                onClick={clearAllFavoris}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                <Trash2 size={16} />
                Vider les favoris
              </button>
            )}
          </div>

          <p className="text-gray-600 mt-2">
            {favoris.length} produit{favoris.length > 1 ? "s" : ""} en favoris
          </p>
        </div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : favoris.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <Heart className="mx-auto mb-4 text-gray-300" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun favori pour le moment
            </h3>
            <p className="text-gray-600 mb-6">
              Explorez nos produits et ajoutez-les à vos favoris !
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          <div>
            {/* GRILLE DE PRODUITS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {favoris.map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} />

                  {/* BOUTON SUPPRIMER */}
                  <button
                    onClick={() => removeFavori(product.id)}
                    className="absolute top-3 right-3 w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-md hover:bg-red-50 transition-colors z-10"
                    title="Retirer des favoris"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              ))}
            </div>

            {/* ACTIONS EN BAS */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Total : {favoris.length} produit
                    {favoris.length > 1 ? "s" : ""}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Ajoutez vos produits favoris au panier
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={clearAllFavoris}
                    className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                  >
                    <Trash2 size={16} />
                    Vider
                  </button>

                  <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                    <ShoppingCart size={16} />
                    Tout ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FavorisPage;
