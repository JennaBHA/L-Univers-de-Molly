import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* GRILLE DE 4 COLONNES */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ========================================
              COLONNE 1 : À PROPOS
          ======================================== */}
          <div>
            <h3 className="font-bold text-lg mb-4">À propos</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition">
                  Qui sommes-nous
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Carrières
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Nos engagements
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Presse
                </a>
              </li>
            </ul>
          </div>

          {/* ========================================
              COLONNE 2 : SERVICE CLIENT
          ======================================== */}
          <div>
            <h3 className="font-bold text-lg mb-4">Service client</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition">
                  Aide & contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Livraison
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Retours
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* ========================================
              COLONNE 3 : INFORMATIONS
          ======================================== */}
          <div>
            <h3 className="font-bold text-lg mb-4">Informations</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition">
                  Conditions générales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Mentions légales
                </a>
              </li>
            </ul>
          </div>

          {/* ========================================
              COLONNE 4 : NOS SERVICES
          ======================================== */}
          <div>
            <h3 className="font-bold text-lg mb-4">Nos services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition">
                  Programme fidélité
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Carte cadeau
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Conseils vétérinaires
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ========================================
            COPYRIGHT (ligne de séparation + texte)
        ======================================== */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          ©2025 L'univers de Molly - Tous droits réservés
        </div>
      </div>
    </footer>
  );
};

// EXPORT du composant
export default Footer;
