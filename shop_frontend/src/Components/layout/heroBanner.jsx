import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// AJOUTE { onScrollToProduits } EN PROPS
const HeroBanner = ({ onScrollToProduits }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // IMAGES DU CARROUSEL
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1606011334315-025e4baab810?q=80&w=2069&auto=format&fit=crop",
      alt: "Chat adorable",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?q=80&w=1974&auto=format&fit=crop",
      alt: "Chien heureux",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1575470887806-b77feadf85fa?q=80&w=2070&auto=format&fit=crop",
      alt: "Animal mignon",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1286&auto=format&fit=crop",
      alt: "Compagnon fidèle",
    },
  ];

  // AUTO-DÉFILEMENT (5 secondes)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* LAYOUT EN 2 COLONNES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* COLONNE GAUCHE : CONTENU TEXTE */}
        <div className="space-y-2">
          <h1 className="text-5xl md:text-5xl font-bold leading-tight">
            Le{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              bonheur
            </span>{" "}
            de vos
            <br />
            animaux commence ici
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Découvrez notre sélection premium de produits pour chats, chiens et
            tous vos compagnons. Qualité, confort et amour dans chaque produit.
          </p>

          {/* BOUTONS CTA */}
          <div className="flex gap-4 pt-4">
            <Link
              to="/alimentation"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-xl transition-all transform hover:scale-105"
            >
              Découvrir nos produits
            </Link>

            {/* UTILISE LA FONCTION onScrollToProduits */}
            <button
              onClick={onScrollToProduits}
              className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-full border-2 border-purple-500 hover:bg-purple-500 hover:text-white transition-all"
            >
              En savoir plus
            </button>
          </div>
        </div>

        {/* COLONNE DROITE : CARROUSEL */}
        <div className="relative">
          {/* CARROUSEL D'IMAGES */}
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* DÉCORATION : CERCLE EN ARRIÈRE-PLAN */}
          <div className="absolute -z-10 -top-10 -right-10 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-30" />
          <div className="absolute -z-10 -bottom-10 -left-10 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-30" />
        </div>
      </div>

      {/* SECTION FEATURES (sous le hero) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        <div className="bg-white p-6 rounded-2xl text-center border border-purple-500">
          <div className="text-4xl mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-car-icon lucide-car"
            >
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <path d="M9 17h6" />
              <circle cx="17" cy="17" r="2" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Livraison rapide</h3>
          <p className="text-sm text-gray-500">Sous 24-48h</p>
        </div>

        <div className="bg-white p-6 rounded-2xl text-center border border-purple-500">
          <div className="text-4xl mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-star-icon lucide-star"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Qualité premium</h3>
          <p className="text-sm text-gray-500">Produits sélectionnés</p>
        </div>

        <div className="bg-white p-6 rounded-2xl text-center border border-purple-500">
          <div className="text-4xl mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-hand-heart-icon lucide-hand-heart"
            >
              <path d="M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
              <path d="m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95" />
              <path d="m2 15 6 6" />
              <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Satisfaction</h3>
          <p className="text-sm text-gray-500">Retour 30 jours</p>
        </div>

        <div className="bg-white p-6 rounded-2xl text-center border border-purple-500">
          <div className="text-4xl mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-gift-icon lucide-gift"
            >
              <rect x="3" y="8" width="18" height="4" rx="1" />
              <path d="M12 8v13" />
              <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
              <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">
            Offres exclusives
          </h3>
          <p className="text-sm text-gray-500">Promos régulières</p>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
