import React from "react";
import Header from "./Components/header";
import HeroBanner from "./Components/heroBanner";
import CategoryCard from "./Components/categoryCard";
import ProductCard from "./Components/productCard";
import Footer from "./Components/footer";

function App() {
  // DONNÉES DE TEST - Produits fictifs
  // const products = [
  //   {
  //     id: 1,
  //     name: "Croquette Premium pour chiens - Poulet & Riz 15kg",
  //     price: "39,99€",
  //     rating: 5,
  //     reviews: 2456,
  //     image:
  //       "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400",
  //     isPremium: true,
  //     discount: null,
  //   },
  //   {
  //     id: 2,
  //     name: "Croquette Premium pour chiens - Poulet & Riz 15kg",
  //     price: "39,99€",
  //     rating: 5,
  //     reviews: 2456,
  //     image:
  //       "https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=400",
  //     isPremium: false,
  //     discount: 24,
  //   },
  //   {
  //     id: 3,
  //     name: "Croquette Premium pour chiens - Poulet & Riz 15kg",
  //     price: "39,99€",
  //     rating: 4,
  //     reviews: 2456,
  //     image:
  //       "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400",
  //     isPremium: true,
  //     discount: null,
  //   },
  //   {
  //     id: 4,
  //     name: "Croquette Premium pour chiens - Poulet & Riz 15kg",
  //     price: "39,99€",
  //     rating: 5,
  //     reviews: 2456,
  //     image:
  //       "https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=400",
  //     isPremium: false,
  //     discount: 24,
  //   },
  //   {
  //     id: 5,
  //     name: "Croquette Premium pour chiens - Poulet & Riz 15kg",
  //     price: "39,99€",
  //     rating: 5,
  //     reviews: 2456,
  //     image:
  //       "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400",
  //     isPremium: true,
  //     discount: null,
  //   },
  //   {
  //     id: 6,
  //     name: "Croquette Premium pour chiens - Poulet & Riz 15kg",
  //     price: "39,99€",
  //     rating: 4,
  //     reviews: 2456,
  //     image:
  //       "https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=400",
  //     isPremium: false,
  //     discount: 24,
  //   },
  // ];

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
        {/* <section>
          <h2 className="text-3xl font-bold mb-8">Meilleures ventes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section> */}
      </main>

      {/* Catégorie 2 : Jouets */}
      <CategoryCard title="Jouets" icon="🎾" bgColor="bg-purple-400" />

      {/* Catégorie 3 : Accessoires */}
      <CategoryCard title="Accessoires" icon="🦴" bgColor="bg-purple-400" />

      {/* Catégorie 4 : Hygiène */}
      <CategoryCard
        title="Hygiène et soins"
        icon="🧴"
        bgColor="bg-purple-400"
      />
    </div>
  );
}

export default App;
