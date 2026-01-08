import React from "react";
import Header from "../header";
import Footer from "../footer";

const CGV = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-8">
          Conditions Générales de Vente (CGV)
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            Le site <strong>L'univers de Molly</strong> est un site de commerce
            électronique spécialisé dans la vente de produits animaliers
            (alimentation, accessoires, hygiène, bien-être, etc.).
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">
            1. Commandes
          </h2>
          <p className="text-gray-700 mb-6">
            Toute commande implique l'acceptation des prix, produits et
            conditions de vente. Nous nous réservons le droit de refuser une
            commande en cas de problème avec un client ou d'indisponibilité des
            produits.
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">
            2. Prix
          </h2>
          <p className="text-gray-700 mb-6">
            Les prix sont indiqués en euros, toutes taxes comprises (TTC). Les
            frais de livraison sont ajoutés lors de la commande.
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">
            3. Paiement
          </h2>
          <p className="text-gray-700 mb-6">
            Le paiement se fait en ligne via des prestataires sécurisés. La
            commande est validée après confirmation du paiement.
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">
            4. Livraison
          </h2>
          <p className="text-gray-700 mb-6">
            Les produits sont livrés à l'adresse indiquée par le client. Les
            délais sont donnés à titre indicatif et L'univers de Molly n'est pas
            responsable des retards indépendants de sa volonté.
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">
            5. Droit de rétractation
          </h2>
          <p className="text-gray-700 mb-6">
            Conformément à la loi, le client dispose de 14 jours pour exercer
            son droit de rétractation et demander un remboursement pour les
            produits non ouverts et en état neuf.
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">
            6. Garanties
          </h2>
          <p className="text-gray-700 mb-6">
            Les produits vendus bénéficient de la garantie légale de conformité
            et de la garantie contre les vices cachés conformément aux
            dispositions légales en vigueur.
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">
            7. Responsabilité
          </h2>
          <p className="text-gray-700 mb-6">
            L'univers de Molly ne peut être tenu responsable d'une mauvaise
            utilisation des produits ou de problèmes liés à la livraison.
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">
            8. Propriété intellectuelle
          </h2>
          <p className="text-gray-700 mb-6">
            Tout le contenu du site (images, textes, logos) est protégé et ne
            peut être utilisé sans autorisation.
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">
            9. Droit applicable
          </h2>
          <p className="text-gray-700 mb-6">
            Les présentes CGV sont soumises au droit français. En cas de litige,
            une solution amiable sera recherchée avant toute action judiciaire.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CGV;
