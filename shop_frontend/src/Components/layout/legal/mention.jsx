import React from "react";
import Header from "../../layout/header";
import Footer from "../../layout/footer";

const MentionPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-8">
          Mentions légales
        </h1>
        <div className="prose prose-lg max-w-none space-y-6">
          <div className="bg-purple-50 p-6 rounded-lg">
            <p className="text-gray-700">
              <strong className="text-purple-600">Nom du site :</strong>{" "}
              L'univers de Molly
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <p className="text-gray-700">
              <strong className="text-purple-600">Statut juridique : </strong>
              SAS
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <p className="text-gray-700">
              <strong className="text-purple-600">Adresse email : </strong>{" "}
              contact@universmolly.fr
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <p className="text-gray-700">
              <strong className="text-purple-600">Téléphone :</strong>{" "}
              0123456789
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <p className="text-gray-700">
              <strong className="text-purple-600">Hébergeur du site : </strong>
              Vercel
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MentionPage;
