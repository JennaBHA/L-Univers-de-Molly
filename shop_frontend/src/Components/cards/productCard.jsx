// ============================================
// PRODUCT CARD - DESIGN PREMIUM
// ============================================
import React from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  // FONCTION pour afficher les étoiles
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
      </div>
    );
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-purple-100 hover:border-purple-300">
      {/* ========================================
          ZONE IMAGE avec badges et favoris
      ======================================== */}
      <div className="relative overflow-hidden">
        {/* IMAGE */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* OVERLAY GRADIENT AU HOVER */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* BADGE PROMOTION */}
        {product.discount && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
            -{product.discount}
          </div>
        )}

        {/* BADGE PREMIUM */}
        {product.isPremium && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
            <span>✨</span> PREMIUM
          </div>
        )}

        {/* BOUTON FAVORIS (apparaît au hover) */}
        <button className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg">
          <Heart size={20} className="text-pink-500" />
        </button>
      </div>

      {/* ========================================
          ZONE INFORMATIONS
      ======================================== */}
      <div className="p-5">
        {/* NOM DU PRODUIT */}
        <h3 className="font-semibold text-gray-800 mb-2 h-12 line-clamp-2 text-sm leading-tight">
          {product.name}
        </h3>

        {/* ÉTOILES */}
        <div className="mb-3">{renderStars(product.rating)}</div>

        {/* PRIX */}
        <div className="flex items-baseline gap-2 mb-4">
          <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            {product.price}
          </p>
          {product.oldPrice && (
            <p className="text-sm text-gray-400 line-through">
              {product.oldPrice}
            </p>
          )}
        </div>

        {/* BOUTON AJOUTER AU PANIER */}
        <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
          <ShoppingCart size={18} />
          Ajouter au panier
        </button>
      </div>

      {/* EFFET DE LUEUR */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-pink-400/0 group-hover:from-purple-400/5 group-hover:to-pink-400/5 transition-all duration-300 pointer-events-none rounded-2xl"></div>
    </div>
  );
};

export default ProductCard;
