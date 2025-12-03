import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/UserAccess/login";
import Register from "./Components/UserAccess/register";

import DashboardLayout from "./Components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardProducts from "./pages/dashboard/DashboardProducts";
import DashboardOrders from "./pages/dashboard/DashboardOrders";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/UserAccess/ProtectedRoute";

// PAGES
import JouetsPage from "./pages/jouetPage"; // ← AJOUTE ÇA

// ========================================
// PAGE D'ACCUEIL (avec carrousel)
// ========================================
import Header from "./Components/layout/header";
import HeroBanner from "./Components/layout/heroBanner";
import ProductList from "./Components/cards/productList";
import Footer from "./Components/layout/footer";

function HomePage() {
  // ← CHANGE "HomePages" en "HomePage"
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <Header />
      <HeroBanner />
      <main className="max-w-7xl mx-auto px-6 py-16">
        <section className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
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
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* PAGE D'ACCUEIL */}
        <Route path="/" element={<HomePage />} />

        {/* AUTHENTIFICATION */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PAGE JOUETS */}
        <Route path="/jouets" element={<JouetsPage />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<DashboardProducts />} />
          <Route path="orders" element={<DashboardOrders />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
