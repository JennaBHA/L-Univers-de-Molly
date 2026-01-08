import React, { useEffect } from "react";
import { X, CheckCircle, Heart } from "lucide-react";

const Toast = ({ message, type = "success", onClose, duration = 2000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    cart: <CheckCircle className="w-6 h-6 text-green-500" />,
    favorite: <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />,
    info: <CheckCircle className="w-6 h-6 text-purple-500" />,
  };

  const bgColors = {
    cart: "bg-green-50 border-green-200",
    favorite: "bg-pink-50 border-pink-200",
    info: "bg-purple-50 border-purple-200",
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${bgColors[type]} animate-slide-in`}
      style={{ animation: "slideIn 0.3s ease-out" }}
    >
      {icons[type]}
      <p className="text-gray-800 font-medium">{message}</p>

      <button
        onClick={onClose}
        className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;
