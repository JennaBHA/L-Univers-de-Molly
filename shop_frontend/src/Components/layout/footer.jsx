import React from "react";
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-purple-900 text-white mt-16 overflow-hidden">
      {/* DÉCORATIONS DE FOND */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-5">
        <div className="text-center mb-7 pb-3 border-b border-white/20"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-1">
          {/* COLONNE 3 : INFORMATIONS LÉGALES */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-pink-400 rounded"></span>
              Informations
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <Link
                  to="/CGV"
                  className="hover:text-pink-300 transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  CGV
                </Link>
              </li>
              <li>
                <Link
                  to="/confidentialite"
                  className="hover:text-pink-300 transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link
                  to="/mention"
                  className="hover:text-pink-300 transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          {/* COLONNE 4 : CONTACT */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-pink-400 rounded"></span>
              Nous contacter
            </h3>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="text-pink-400 mt-0.5 flex-shrink-0"
                />
                <span>contact@universmolly.fr</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  size={18}
                  className="text-pink-400 mt-0.5 flex-shrink-0"
                />
                <span>01 23 45 67 89</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-5 text-center">
          <p className="text-sm text-white/70 flex items-center justify-center gap-2">
            2025 L'Univers de Molly - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
