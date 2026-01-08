import React from "react";
import Header from "../Components/layout/header";
import HeroBanner from "../Components/layout/heroBanner";
import ProductList from "../Components/cards/productList";
import Footer from "../Components/layout/footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <Header />
      <HeroBanner />
      <main className="max-w-7xl mx-auto px-6 py-16">
        <section
          id="pro"
          className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-3">
              Produits Populaires
            </h2>
          </div>
          <ProductList />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
