import React, { useState, useEffect } from "react";
import Header from "./Components/layout/header";
import HeroBanner from "./Components/layout/heroBanner";
import CategoryCard from "./Components/cards/categoryCard";
import ProductCard from "./Components/cards/productCard";
import Footer from "./Components/layout/footer";
import { getProducts } from "./services/api";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();

        // Transformer les données de l'API
        const formattedProducts = data.map((product) => ({
          id: product.id,
          name: product.name,
          price: `${product.price}€`,
          rating: 5,
          reviews: 2456,
          image: product.image_url,
          isPremium: product.stock > 50,
          discount: product.stock < 30 ? 24 : null,
        }));

        setProducts(formattedProducts);
        setLoading(false);
      } catch (err) {
        console.error("Erreur:", err);
        setError("Impossible de charger les produits");
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #fef3f7 0%, #f0e6f3 100%)",
      }}
    >
      {/* HEADER */}
      <Header />

      {/* CARROUSEL HERO BANNER */}
      <HeroBanner />

      {/* CONTENU PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* ========================================
            SECTION CATÉGORIES
        ======================================== */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold text-gray-800 mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Explorez nos univers
            </h2>
            <p className="text-gray-600">
              Tout ce dont votre animal a besoin, au même endroit
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard
              title="Alimentation"
              icon="🍖"
              bgColor="bg-gradient-to-br from-purple-400 to-pink-400"
            />
            <CategoryCard
              title="Jouets"
              icon="🎾"
              bgColor="bg-gradient-to-br from-pink-400 to-orange-400"
            />
            <CategoryCard
              title="Accessoires"
              icon="🦴"
              bgColor="bg-gradient-to-br from-purple-400 to-blue-400"
            />
            <CategoryCard
              title="Hygiène et soins"
              icon="🧴"
              bgColor="bg-gradient-to-br from-pink-400 to-purple-400"
            />
          </div>
        </section>

        {/* ========================================
            SECTION PRODUITS
        ======================================== */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2
                className="text-4xl font-bold text-gray-800 mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Les coups de cœur de Molly
              </h2>
              <p className="text-gray-600">
                Sélection spéciale pour gâter vos compagnons
              </p>
            </div>
            <button className="hidden md:block text-purple-600 font-medium hover:underline">
              Voir tout →
            </button>
          </div>

          {/* AFFICHAGE CONDITIONNEL */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
              <p className="text-xl text-gray-600 mt-4">
                Chargement des produits...
              </p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-xl text-red-600">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
