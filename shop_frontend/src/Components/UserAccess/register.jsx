import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Vérification des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    // Validation du mot de passe (minimum 6 caractères)
    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères !");
      return;
    }

    setIsLoading(true);

    // Appel API d'inscription
    const result = await register(
      formData.prenom,
      formData.nom,
      formData.email,
      formData.telephone,
      formData.password
    );

    setIsLoading(false);

    if (result.success) {
      setSuccess("Inscription réussie ! Redirection vers la connexion...");
      // Redirection vers la page de connexion après 2 secondes
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setError(result.error || "Une erreur est survenue lors de l'inscription");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white flex items-center justify-center py-12 px-4">
      {/* CONTENEUR PRINCIPAL */}
      <div className="max-w-2xl w-full">
        {/* CARTE D'INSCRIPTION */}
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
            <h1 className="text-3xl font-bold text-white mb-2">
              Créer un compte
            </h1>
            <p className="text-white/90 text-sm">
              Rejoignez la communauté L'Univers de Molly 💜
            </p>
          </div>

          {/* FORMULAIRE */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* LIGNE 1 : NOM ET PRÉNOM */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* CHAMP NOM */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User size={20} className="text-purple-400" />
                    </div>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Dupont"
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition"
                    />
                  </div>
                </div>

                {/* CHAMP PRÉNOM */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prénom
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User size={20} className="text-purple-400" />
                    </div>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      placeholder="Marie"
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition"
                    />
                  </div>
                </div>
              </div>
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition"
                  />
                </div>
              </div>
              {/* CHAMP TÉLÉPHONE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Téléphone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone size={20} className="text-purple-400" />
                  </div>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="06 12 34 56 78"
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition"
                  />
                </div>
              </div>
              {/* LIGNE 2 : MOT DE PASSE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition"
                    />
                  </div>
                </div>

                {/* CHAMP CONFIRMER MOT DE PASSE */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock size={20} className="text-purple-400" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition"
                    />
                  </div>
                </div>
              </div>
              {/* MESSAGE D'ERREUR */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}
              {/* MESSAGE DE SUCCÈS */}
              {success && (
                <div className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
                  {success}
                </div>
              )}
              {/* BOUTON INSCRIPTION */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? "Création en cours..." : "Créer mon compte"}
                {!isLoading && <ArrowRight size={20} />}
              </button>
            </form>

            {/* LIEN VERS CONNEXION */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-3">Vous avez déjà un compte ?</p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-pink-500 transition"
              >
                Connectez-vous
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>
        {/* // LIEN RETOUR ACCUEIL */}
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

export default Register;
