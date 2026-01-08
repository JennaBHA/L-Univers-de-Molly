import React, { useRef } from "react"; //useRef sert a poser un Post-it pour retrouver mon lego sans devoir le reconstruire
import { Routes, Route } from "react-router-dom";
import Login from "./Components/UserAccess/login";
import Register from "./Components/UserAccess/register";

import DashboardLayout from "./Components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardProducts from "./pages/dashboard/DashboardProducts";
import DashboardOrders from "./pages/dashboard/DashboardOrders";

import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/toastContext";
import { CartProvider } from "./context/CartContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import ProtectedRoute from "./Components/UserAccess/ProtectedRoute";
import AlimentationPage from "./pages/AlimentationPage";
import HabitatPage from "./pages/habitatPage";
import HygienePage from "./pages/hygienePage";
import AccessoirePage from "./pages/accessoiresPage";
import JouetsPage from "./pages/jouetPage";
import FavorisPage from "./pages/favorisPage";
import PanierPage from "./pages/panierPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

import CGVPage from "./Components/layout/legal/CGV";
import MentionPage from "./Components/layout/legal/mention";
import ConfidentialitePage from "./Components/layout/legal/confidentialite";

// PAGE D'ACCUEIL - COMPOSANTS
import Header from "./Components/layout/header";
import HeroBanner from "./Components/layout/heroBanner";
import ProductList from "./Components/cards/productList";
import Footer from "./Components/layout/footer";

function HomePage() {
  // CRÉER LA RÉFÉRENCE
  const produitsRef = useRef(null);

  // FONCTION POUR SCROLLER
  const scrollToProduits = () => {
    produitsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
    <div className="min-h-screen bg-white">
      <Header />

      {/* PASSE LA FONCTION AU HEROBANNER */}
      <HeroBanner onScrollToProduits={scrollToProduits} />

      {/* ATTACHE LA REF À MAIN */}
      <main ref={produitsRef} className="max-w-7xl mx-auto px-6 py-16">
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
      <ToastProvider>
        <CartProvider>
          <FavoriteProvider>
            <Routes>
              {/* PAGE D'ACCUEIL */}
              <Route path="/" element={<HomePage />} />

              {/* AUTHENTIFICATION */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* PAGES CATÉGORIES */}
              <Route path="/jouets" element={<JouetsPage />} />
              <Route path="/alimentation" element={<AlimentationPage />} />
              <Route path="/accessoires" element={<AccessoirePage />} />
              <Route path="/habitat" element={<HabitatPage />} />
              <Route path="/hygiene" element={<HygienePage />} />
              <Route path="/favoris" element={<FavorisPage />} />
              <Route path="/panier" element={<PanierPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation" element={<OrderSuccessPage />} />

              <Route path="/CGV" element={<CGVPage />} />
              <Route path="/mention" element={<MentionPage />} />
              <Route
                path="/confidentialite"
                element={<ConfidentialitePage />}
              />
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
          </FavoriteProvider>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
