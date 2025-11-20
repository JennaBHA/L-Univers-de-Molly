import axios from "axios";

const API_URL = "http://localhost:3001";

export const getProducts = async () => {
  //refactoriser pour une fonction get
  try {
    const response = await axios.get(`${API_URL}/product`);
    return response.data;
  } catch (error) {
    console.error("Erreur:", error);
    throw error;
  }
};
