// ============================================
// CARROUSEL D'IMAGES - L'UNIVERS DE MOLLY
// ============================================
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // IMAGES DU CARROUSEL
  const slides = [
    {
      id: 1,
      // image:
      //   "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1920&h=600&fit=crop",
      // alt: "Photo",
      image:
        "https://images.unsplash.com/photo-1606011334315-025e4baab810?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Photo",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Photo",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1575470887806-b77feadf85fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Photo",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1286&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Photo",
    },
  ];

  // AUTO-DÉFILEMENT
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // NAVIGATION
  // const goToSlide = (index) => setCurrentSlide(index);
  // const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  // const prevSlide = () =>
  // setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* IMAGES */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />

            {/* Texte */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
              <h2
                className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-2xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {slide.title}
              </h2>
              <p className="text-xl md:text-2xl drop-shadow-lg">
                {slide.subtitle}
              </p>
              {/* <button className="mt-8 bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition transform hover:scale-105">
                Découvrir
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {/* BOUTONS */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition shadow-lg z-20 text-purple-600"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition shadow-lg z-20 text-purple-600"
      >
        <ChevronRight size={28} />
      </button> */}

      {/* INDICATEURS */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all shadow-lg ${
              currentSlide === index
                ? "bg-white w-12"
                : "bg-white/60 hover:bg-white/90 w-3"
            }`}
          />
        ))}
      </div> */}
    </section>
  );
};

export default HeroBanner;
