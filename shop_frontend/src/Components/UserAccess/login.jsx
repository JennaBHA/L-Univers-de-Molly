// ============================================
// PAGE DE CONNEXION - L'UNIVERS DE MOLLY
// ============================================
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // ICI : logique de connexion (API)
    console.log("Connexion avec :", { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white flex items-center justify-center py-12 px-4">
      {/*CONTENEUR PRINCIPAL*/}
      <div className="max-w-md w-full">
        {/*CARTE DE CONNEXION*/}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-purple-200">
          {/* HEADER AVEC MOLLY */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 text-center relative overflow-hidden">
            {/* Décoration arrière-plan */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-300 rounded-full blur-3xl"></div>
            </div>

            {/* Mascotte Molly */}
            <div className="relative mb-4">
              <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
                <img
                  src="./public/Molly.JPG"
                  alt="Molly"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            {/* Titre */}
            <h1 className="text-3xl font-bold text-white mb-2">Bienvenue !</h1>
            <p className="text-white/90 text-sm">
              Connectez-vous à votre compte L'Univers de Molly
            </p>
          </div>

          {/* ========================================
              FORMULAIRE
          ======================================== */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* CHAMP EMAIL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={20} className="text-purple-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition"
                  />
                </div>
              </div>

              {/* CHAMP MOT DE PASSE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={20} className="text-purple-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition"
                  />
                </div>
              </div>

              {/* LIEN MOT DE PASSE OUBLIÉ */}
              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-purple-600 hover:text-pink-500 font-medium transition"
                >
                  Mot de passe oublié ?
                </a>
              </div>

              {/* BOUTON CONNEXION */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Se connecter
                <ArrowRight size={20} />
              </button>
            </form>

            {/* ========================================
                LIEN VERS INSCRIPTION
            ======================================== */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-3">
                Vous n'avez pas encore de compte ?
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-pink-500 transition"
              >
                Créer un compte
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================
            LIEN RETOUR ACCUEIL
        ======================================== */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-purple-600 transition text-sm font-medium"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
