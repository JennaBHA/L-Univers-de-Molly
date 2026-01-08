import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowLeft,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Tag,
} from "lucide-react";

import Header from "../Components/layout/header";
import Footer from "../Components/layout/footer";
import { useCart } from "../context/CartContext";

const PanierPage = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const {
    cartItems,
    cartCount,
    updateQuantity,
    removeFromCart,
    clearCart,
    loading,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  //  PANIER

  const handleClearCart = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vider votre panier ?")) {
      clearCart();
    }
  };

  const handleRemoveFromCart = (productId) => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer cet article de votre panier ?"
      )
    ) {
      removeFromCart(productId);
    }
  };

  //  CHECKOUT

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert("Connectez-vous pour finaliser votre commande");
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

  //  CODE PROMO

  const applyPromoCode = () => {
    const codes = {
      MOLLY10: 10,
      BIENVENUE: 15,
      SOLDES20: 20,
    };

    const value = codes[promoCode.toUpperCase()];

    if (value) {
      setDiscount(value);
      alert(`Code promo appliqué : ${value}%`);
    } else {
      alert("Code promo invalide");
      setDiscount(0);
    }
  };

  //  HELPERS

  const getProductData = (item) => {
    if (item.product) {
      return {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        imageUrl: item.product.imageUrl,
        category: item.product.category?.name || "N/A",
        quantity: item.quantity,
      };
    }

    return {
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      category: item.category?.name || item.category || "N/A",
      quantity: item.quantity || 1,
    };
  };

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (typeof price === "string") {
      return parseFloat(price.replace("€", "").replace(",", ".")) || 0;
    }
    return 0;
  };

  //  CALCULS

  const subtotal = cartItems.reduce((sum, item) => {
    const data = getProductData(item);
    return sum + parsePrice(data.price) * data.quantity;
  }, 0);

  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal - discountAmount + shipping;

  //  RENDER

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-4"
        >
          <ArrowLeft size={18} />
          Retour
        </Link>

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            Mon Panier <ShoppingCart className="text-purple-600" />
          </h1>

          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-red-600 flex items-center gap-2"
            >
              <Trash2 size={16} />
              Vider le panier
            </button>
          )}
        </div>

        <p className="text-gray-600 mt-2">
          {cartCount} article{cartCount > 1 ? "s" : ""}
        </p>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-10 w-10 border-b-2 border-purple-600 rounded-full"></div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-lg border">
            <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold">Votre panier est vide</h3>
            <Link
              to="/"
              className="inline-block mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg"
            >
              Découvrir les produits
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ARTICLES */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const data = getProductData(item);
                const price = parsePrice(data.price);

                return (
                  <div
                    key={data.id}
                    className="bg-white p-4 rounded-lg border flex gap-4"
                  >
                    <img
                      src={data.imageUrl}
                      alt={data.name}
                      className="w-24 h-24 object-cover rounded"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold">{data.name}</h3>
                      <p className="text-sm text-gray-500">{data.category}</p>
                      <p className="font-bold text-purple-600">
                        {price.toFixed(2)} €
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <button
                        onClick={() => handleRemoveFromCart(data.id)}
                        className="text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>

                      <div className="flex items-center border rounded">
                        <button
                          onClick={() =>
                            updateQuantity(data.id, data.quantity - 1)
                          }
                          disabled={data.quantity <= 1}
                          className="px-2"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="px-3 font-semibold">
                          {data.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(data.id, data.quantity + 1)
                          }
                          className="px-2"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <p className="text-sm">
                        {(price * data.quantity).toFixed(2)} €
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RÉCAP */}
            <div className="bg-white p-6 rounded-lg border sticky top-24">
              <h3 className="font-bold mb-4">Récapitulatif</h3>

              <div className="flex gap-2 mb-4">
                <input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Code promo"
                  className="border px-3 py-2 rounded w-full"
                />
                <button
                  onClick={applyPromoCode}
                  className="bg-gray-100 px-3 rounded"
                >
                  <Tag size={16} />
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Réduction</span>
                    <span>-{discountAmount.toFixed(2)} €</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>{shipping === 0 ? "Gratuite" : `${shipping} €`}</span>
                </div>

                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span className="text-purple-600">{total.toFixed(2)} €</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg font-semibold"
              >
                Passer la commande
              </button>

              <Link
                to="/"
                className="block text-center text-sm text-gray-600 mt-4"
              >
                Continuer mes achats
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PanierPage;
