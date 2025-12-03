import React, { useState, useEffect } from "react";
import Header from "../Components/layout/header";
import Footer from "../Components/layout/footer";
import FilterBar from "../Components/common/FilterBar";
import ProductCard from "../Components/cards/productCard";
import api from "../services/api";

const JouetsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        const jouets = response.data.filter(
          (product) => product.category?.toLowerCase() === "jouets"
        );
        setProducts(jouets);
        setFilteredProducts(jouets);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des jouets:", err);
        setError("Impossible de charger les jouets.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedFilter === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.animalType &&
          product.animalType.toLowerCase() === selectedFilter.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [selectedFilter, products]);

  const handleFilterChange = (filterId) => {
    setSelectedFilter(filterId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <Header />

      <section className="relative bg-gradient-to-r from-purple-500 to-pink-500 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <div className="inline-block mb-4">
            <span className="text-8xl">🎾</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Jouets pour Animaux</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Découvrez notre collection de jouets interactifs pour le bonheur de
            vos compagnons ! 🐾
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <FilterBar
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
        />

        <div className="mb-6 text-center">
          <p className="text-gray-600">
            <span className="font-bold text-purple-600">
              {filteredProducts.length}
            </span>{" "}
            {filteredProducts.length > 1 ? "jouets trouvés" : "jouet trouvé"}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            <p className="text-xl mb-4">😕 {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition"
            >
              Réessayer
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Aucun jouet trouvé
            </h3>
            <p className="text-gray-600">
              Essayez un autre filtre ou revenez plus tard !
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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
