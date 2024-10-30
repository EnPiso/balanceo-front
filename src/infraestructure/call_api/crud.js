// utils/api.js
import axios from 'axios';

export const fetchGetData = async (url, params = {}) => {
  try {
    // Realizamos la petición usando axios
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Retornamos los datos de la respuesta
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
