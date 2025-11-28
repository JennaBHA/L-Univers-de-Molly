import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/layout/header";
import HeroBanner from "./Components/layout/heroBanner";
import CategoryCard from "./Components/cards/categoryCard";
import ProductList from "./Components/cards/productList";
import Footer from "./Components/layout/footer";
import Login from "./Components/UserAccess/login";
import Register from "./Components/UserAccess/register";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <Header />
      <HeroBanner />
      <main className="max-w-7xl mx-auto px-6 py-16">
        <section className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          {/* TITRE DE SECTION */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-3">
              Produits Populaires
            </h2>
            {/* <p className="text-gray-600 text-lg">
              Nos meilleures ventes sélectionnées avec amour 💜
            </p> */}
          </div>

          {/* LISTE DES PRODUITS */}
          <ProductList />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* PAGE D'ACCUEIL */}
      <Route path="/" element={<HomePage />} />

      {/* PAGE DE CONNEXION */}
      <Route path="/login" element={<Login />} />

      {/* PAGE D'INSCRIPTION */}
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
