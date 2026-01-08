import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../Components/layout/header";
import Footer from "../Components/layout/footer";
import ProductCard from "../Components/cards/productCard";
import productService from "../services/productService";

const HygienePage = () => {
  const [products, setProducts] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const productsSectionRef = useRef(null);
  const HYGIENE_ID = 5;

  // Fetch Filters
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

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const filters = {
          categoryId: HYGIENE_ID,
          animalId: selectedAnimal !== "all" ? selectedAnimal : null,
        };

        const data = await productService.getProducts(filters);
        setProducts(data);
        setError(null);
        setCurrentPage(1);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Impossible de charger les produits d'hygiène.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedAnimal]);

  // Scroll to products section
  const scrollToProducts = () => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setTimeout(() => scrollToProducts(), 100);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setTimeout(() => scrollToProducts(), 100);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 font-medium transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            Retour
          </Link>
        </div>
      </div>

      <main ref={productsSectionRef} className="max-w-7xl mx-auto px-6 py-8">
        {/* FILTRES */}
        <div className="mb-8">
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Type d'animal
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedAnimal("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedAnimal === "all"
                    ? "bg-pink-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tous
              </button>
              {animals.map((animal) => (
                <button
                  key={animal.id}
                  onClick={() => setSelectedAnimal(animal.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedAnimal === animal.id
                      ? "bg-pink-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {animal.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BARRE DE RÉSULTATS */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-700">
              <span className="font-bold text-pink-600">{products.length}</span>{" "}
              {products.length > 1 ? "produits" : "produit"}
            </p>

            {selectedAnimal !== "all" && (
              <div className="flex gap-2 mt-2">
                <span className="inline-flex items-center gap-1.5 bg-pink-100 text-pink-700 px-3 py-1 rounded-md text-xs font-medium">
                  {animals.find((f) => f.id === selectedAnimal)?.name}
                  <button
                    onClick={() => setSelectedAnimal("all")}
                    className="hover:text-pink-900"
                  >
                    ×
                  </button>
                </span>
              </div>
            )}
          </div>

          {selectedAnimal !== "all" && (
            <button
              onClick={() => setSelectedAnimal("all")}
              className="text-sm text-gray-600 hover:text-pink-600 font-medium"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        {/* GRILLE DE PRODUITS */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Réessayer
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun produit d'hygiène trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              Essayez de modifier vos filtres
            </p>
            <button
              onClick={() => setSelectedAnimal("all")}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-pink-600 text-white hover:shadow-lg hover:scale-105"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Précédent
                </button>

                <span className="text-lg font-semibold text-gray-700">
                  Page {currentPage} sur {totalPages}
                </span>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-pink-600 text-white hover:shadow-lg hover:scale-105"
                  }`}
                >
                  Suivant
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HygienePage;
