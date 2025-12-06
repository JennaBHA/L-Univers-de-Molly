import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../Components/layout/header";
import Footer from "../Components/layout/footer";
import ProductCard from "../Components/cards/productCard";
import api from "../services/api";

const HabitatPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const animalFilters = [
    { id: "all", label: "Tous" },
    { id: "chien", label: "Chiens" },
    { id: "chat", label: "Chats" },
    { id: "rongeur", label: "Rongeurs" },
    { id: "oiseau", label: "Oiseaux" },
    { id: "poisson", label: "Poissons" },
    { id: "reptile", label: "Reptiles" },
  ];

  const typeFilters = [
    { id: "all", label: "Tous types" },
    { id: "cage", label: "Cages" },
    { id: "aquarium", label: "Aquariums" },
    { id: "terrarium", label: "Terrariums" },
    { id: "niche", label: "Niches" },
    { id: "arbre", label: "Arbres à chat" },
    { id: "panier", label: "Paniers & Coussins" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        const habitat = response.data.filter(
          (product) => product.category?.toLowerCase() === "habitat"
        );
        setProducts(habitat);
        setFilteredProducts(habitat);
        setLoading(false);
      } catch (err) {
        console.error("Erreur:", err);
        setError("Impossible de charger les produits habitat.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedAnimal !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.animalType &&
          product.animalType.toLowerCase() === selectedAnimal.toLowerCase()
      );
    }

    if (selectedType !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.habitatType &&
          product.habitatType.toLowerCase() === selectedType.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [selectedAnimal, selectedType, products]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* HEADER DE PAGE */}
      <div>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            Retour
          </Link>
        </div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* FILTRES */}
        <div className="mb-8">
          {/* FILTRE ANIMAL */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Type d'animal
            </label>
            <div className="flex flex-wrap gap-2">
              {animalFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedAnimal(filter.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedAnimal === filter.id
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* FILTRE TYPE D'HABITAT */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Type d'habitat
            </label>
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedType(filter.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedType === filter.id
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BARRE DE RÉSULTATS */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-700">
              <span className="font-bold text-green-600">
                {filteredProducts.length}
              </span>{" "}
              {filteredProducts.length > 1 ? "produits" : "produit"}
            </p>

            {/* FILTRES ACTIFS */}
            {(selectedAnimal !== "all" || selectedType !== "all") && (
              <div className="flex gap-2 mt-2">
                {selectedAnimal !== "all" && (
                  <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs font-medium">
                    {animalFilters.find((f) => f.id === selectedAnimal)?.label}
                    <button
                      onClick={() => setSelectedAnimal("all")}
                      className="hover:text-green-900"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedType !== "all" && (
                  <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs font-medium">
                    {typeFilters.find((f) => f.id === selectedType)?.label}
                    <button
                      onClick={() => setSelectedType("all")}
                      className="hover:text-green-900"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* BOUTON RÉINITIALISER */}
          {(selectedAnimal !== "all" || selectedType !== "all") && (
            <button
              onClick={() => {
                setSelectedAnimal("all");
                setSelectedType("all");
              }}
              className="text-sm text-gray-600 hover:text-green-600 font-medium"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        {/* GRILLE DE PRODUITS */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Réessayer
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun produit habitat trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              Essayez de modifier vos filtres
            </p>
            <button
              onClick={() => {
                setSelectedAnimal("all");
                setSelectedType("all");
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Réinitialiser
            </button>
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

export default HabitatPage;
