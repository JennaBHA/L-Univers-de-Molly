import axios from 'axios';

//URL for backend API
const APi_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

//Create axios instance
const api = axios.create({
    baseURL: APi_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, //10sec
});

//Intercepteur requete
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Intercepteur reponse
api.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        if (error.response) {
            // Erreurs cotes serveur
            if (error.response.status === 401) {
                // Gérer l'erreur 401 (non autorisé)
                console.error('Erreur 401 : Non autorisé');
                // Par exemple, rediriger vers la page de connexion
            }
            else if (error.response.status === 403) {
                // Gérer l'erreur 403 (interdit)
                console.error('Erreur 403 : Accès interdit');
            }
            else {
                console.error(`Erreur ${error.response.status} : ${error.response.data.message || 'Erreur inconnue'}`);
            }
        }
        return Promise.reject(error);
    }
);

export default api;