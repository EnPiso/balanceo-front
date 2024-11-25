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

// Función en flecha para manejar la solicitud POST
export const  postData = async (url,data) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data // Guardar los datos de la respuesta
  } catch (err) {
    console.log(err); // Guardar cualquier error
  } finally {
    // setLoading(false); // Detener el indicador de carga
  }
};

export const postDataFile = async (url, data) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Necesario para manejar archivos
      },
    });
    return response.data; // Devuelve los datos de la respuesta
  } catch (err) {
    console.error('Error al enviar el archivo:', err.response || err); // Muestra el error
    throw err; // Lanza el error para manejarlo en el lugar donde se llame
  }
};




export const updateData = async (url,data) => {
  try {
    const response = await axios.patch(url, data);
    return response.data // Guardar los datos de la respuesta
  } catch (err) {
    console.log(err); // Guardar cualquier error
  } finally {
    // setLoading(false); // Detener el indicador de carga
  }
};


