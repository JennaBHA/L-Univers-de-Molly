import React from "react";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white mt-16 overflow-hidden">
      {/* DÉCORATIONS DE FOND */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-5">
        <div className="text-center mb-7 pb-3 border-b border-white/20">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
            <div className="text-left">
              <p className="text-m font-light">
                En mémoire de <b>Molly</b>
              </p>
            </div>
            <Heart className="text-pink-300" fill="currentColor" size={24} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* COLONNE 1 : À PROPOS */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-pink-400 rounded"></span>À propos
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <a
                  href="#"
                  className="hover:text-pink-300 transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  Qui sommes-nous
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-300 transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  Notre histoire
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-300 transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  Nos engagements
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-300 transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  Carrières
                </a>
              </li>
            </ul>
          </div>

          {/* COLONNE 2 : SERVICE CLIENT */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-pink-400 rounded"></span>
              Service client
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <a
                  href="#"
                  className="hover:text-pink-300 transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  Aide & contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-300 transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  Livraison & retours
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-300 transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  Suivi de commande
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-300 transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* COLONNE 3 : INFORMATIONS LÉGALES */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-pink-400 rounded"></span>
              Informations
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <a
                  href="#"
                  className="hover:text-pink-300 transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  CGV
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-300 transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  Confidentialité
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-300 transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  Cookies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-300 transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  Mentions légales
                </a>
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
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="text-pink-400 mt-0.5 flex-shrink-0"
                />
                <span>
                  123 Rue des Animaux
                  <br />
                  75000 Paris, France
                </span>
              </li>
            </ul>

            {/* RÉSEAUX SOCIAUX */}
            {/* <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition"
              > */}
            {/* <span>📘</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition"
              >
                <span>📷</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition"
              >
                <span>🐦</span> */}
            {/* </a>
            </div> */}
          </div>
        </div>
        <div className="border-t border-white/20 pt-5 text-center">
          <p className="text-sm text-white/70 flex items-center justify-center gap-2">
            Made with{" "}
            <Heart size={16} className="text-pink-400" fill="currentColor" />©
            2025 L'Univers de Molly - Tous droits réservés
          </p>
          {/* <p className="text-xs text-white/50 mt-2">
            Développé avec passion pour tous les amoureux des animaux 🐾
          </p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
