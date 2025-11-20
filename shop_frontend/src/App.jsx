import React, { useState, useEffect } from "react";
import Header from "./Components/header";
import HeroBanner from "./Components/heroBanner";
import CategoryCard from "./Components/categoryCard";
import ProductCard from "./Components/productCard";
import Footer from "./Components/footer";
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroBanner />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Achetez par catégorie</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard
              title="Alimentation"
              icon="🍖"
              bgColor="bg-purple-400"
            />
            <CategoryCard title="Jouets" icon="🎾" bgColor="bg-purple-400" />
            <CategoryCard
              title="Accessoires"
              icon="🦴"
              bgColor="bg-purple-400"
            />
            <CategoryCard
              title="Hygiène et soins"
              icon="🧴"
              bgColor="bg-purple-400"
            />
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">Meilleures ventes</h2>

          {loading && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
