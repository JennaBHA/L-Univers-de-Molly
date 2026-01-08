import React from "react";
import Header from "../header";
import Footer from "../footer";

const Confidentialite = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-8">
          Politique de confidentialité
        </h1>
        <div className="prose prose-lg max-w-none">
          <div className="bg-purple-50 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              Collecte des données
            </h2>
            <p className="text-gray-700">
              Nous collectons des données personnelles comme le nom, email,
              adresse et historique de commandes afin de gérer vos commandes et
              améliorer notre site.
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              Sécurité
            </h2>
            <p className="text-gray-700">
              Les données sont sécurisées et utilisées uniquement dans le cadre
              des services proposés.
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              Vos droits (RGPD)
            </h2>
            <p className="text-gray-700">
              Conformément au RGPD, vous avez des droits d'accès, de
              rectification et de suppression de vos données. Pour exercer ces
              droits, contactez-nous à contact@universmolly.fr
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Confidentialite;
