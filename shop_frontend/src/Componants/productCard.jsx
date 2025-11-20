// PROPS (données qu'on lui passe) :
// - product : objet contenant toutes les infos du produit
//   {
//     id, name, price, rating, reviews,
//     image, isPremium, discount
//   }

import React from "react";
import { Star } from "lucide-react";

const ProductCard = ({ product }) => {
  // FONCTION pour afficher les étoiles de notation
  // rating = nombre d'étoiles pleines (0 à 5)
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {/* Boucle pour créer 5 étoiles */}
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            // Si i < rating, étoile pleine orange, sinon étoile vide grise
            className={
              i < rating ? "fill-orange-400 text-orange-400" : "text-gray-300"
            }
          />
        ))}
        {/* Nombre d'avis entre parenthèses */}
        <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
      </div>
    );
  };

  return (
    // Carte avec fond blanc, ombre et effet hover
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      {/* ZONE IMAGE avec badges */}
      <div className="relative">
        {/* Image du produit */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />

        {/* Badge de PROMOTION (affiché si product.discount existe) */}
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">
            x{product.discount}
          </div>
        )}

        {/* Badge "ULTRA PREMIUM" (affiché si product.isPremium est true) */}
        {product.isPremium && (
          <div className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded text-xs">
            ultra premium
          </div>
        )}
      </div>

      {/* ZONE INFORMATIONS du produit */}
      <div className="p-4">
        {/* NOM du produit (limité à 2 lignes) */}
        <h3 className="font-semibold text-sm mb-2 h-12 line-clamp-2">
          {product.name}
        </h3>

        {/* ÉTOILES de notation */}
        {renderStars(product.rating)}

        {/* PRIX */}
        <div className="mt-3">
          <p className="text-2xl font-bold text-orange-600">{product.price}</p>
        </div>

        {/* BOUTON ajouter au panier */}
        <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-medium">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

// EXPORT du composant
export default ProductCard;
