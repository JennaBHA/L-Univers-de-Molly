import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../Components/layout/header";
import Footer from "../Components/layout/footer";
import ProductCard from "../Components/cards/productCard";
import productService from "../services/productService";

const JouetsPage = () => {
  const [products, setProducts] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const JOUETS_ID = 2;

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const animalsData = await productService.getAnimals();
        setAnimals(animalsData);
      } catch (err) {
        console.error("Error fetching filters:", err);
      }
    };
    fetchFilters();
  }, []);

  // 2. Fetch Products with Filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const filters = {
          categoryId: JOUETS_ID,
          animalId: selectedFilter !== "all" ? selectedFilter : null,
        };

        const data = await productService.getProducts(filters);
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement des jouets:", err);
        setError("Impossible de charger les jouets.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* HEADER DE PAGE */}
      <div>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 font-medium transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            Retour
          </Link>
        </div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* FILTRES */}
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Type d'animal
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              key="all"
              onClick={() => setSelectedFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tous
            </button>
            {animals.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === filter.id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        {/* BARRE DE RÉSULTATS */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-700">
              <span className="font-bold text-purple-600">
                {products.length}
              </span>{" "}
              {products.length > 1 ? "jouets" : "jouet"}
            </p>

            {/* FILTRE ACTIF */}
            {selectedFilter !== "all" && (
              <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 px-3 py-1 rounded-md text-xs font-medium mt-2">
                {animals.find((f) => f.id === selectedFilter)?.name}
                <button
                  onClick={() => setSelectedFilter("all")}
                  className="hover:text-purple-900"
                >
                  ×
                </button>
              </span>
            )}
          </div>

          {/* BOUTON RÉINITIALISER */}
          {selectedFilter !== "all" && (
            <button
              onClick={() => setSelectedFilter("all")}
              className="text-sm text-gray-600 hover:text-purple-600 font-medium"
            >
              Réinitialiser
            </button>
          )}
        </div>

        {/* GRILLE DE PRODUITS */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Réessayer
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun jouet trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              Essayez de modifier vos filtres
            </p>
            <button
              onClick={() => setSelectedFilter("all")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default JouetsPage;
