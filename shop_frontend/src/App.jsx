import React from "react";
import Header from "./Components/header";
import HeroBanner from "./Components/heroBanner";
import CategoryCard from "./Components/categoryCard";
import ProductList from "./Components/productList";
import Footer from "./Components/footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroBanner />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* SECTION CATÉGORIES */}
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

        {/* SECTION PRODUITS */}
        <section>
          <ProductList />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
