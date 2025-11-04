// utils/api.js
import axios from 'axios';
import toast from 'react-hot-toast';

const token = localStorage.getItem('token');

export const fetchGetDataToken = async (url, tokenState) => {
  try {
    // Realizamos la petición usando axios
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenState}`
      }
    });

    // Retornamos los datos de la respuesta
    
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


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

export const postDataToken = async (url,data, tokenState) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${tokenState ? tokenState : token}`,
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

export const updateDataToken = async (url,data, tokenTemporal) => {
  try {
    const response = await axios.patch(url, data, {
      headers: {
        'Authorization': `Bearer ${tokenTemporal ? tokenTemporal : token}`,
      },
    });
    return response.data // Guardar los datos de la respuesta
  } catch (err) {
    console.log(err); // Guardar cualquier error
  } finally {
    // setLoading(false); // Detener el indicador de carga
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


// Función para eliminar datos
export const deleteData = async (url) => {
  try {
    const response = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Devuelve los datos de la respuesta (si hay alguno)
  } catch (err) {
    console.error('Error al eliminar el recurso:', err.response || err);
    throw err; // Lanza el error para manejarlo en la llamada
  }
};


  export const postSession = async (url, data) => {
    try {
      const response = await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' }
      });

      let token;
      const authHeader = response.headers['authorization'] || response.headers['Authorization'];
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.split('Bearer ')[1].trim();
      }

      return {
        data: response.data,
        token
      };
    } catch (err) {
      console.error('Error en login:', err);
      toast.error('El email o la contraseña están incorrectos');
      throw err;
    }
  };





export const fetchGetUser = async (url, params = {}) => {
  if (!token) return;
  try {
    // Realizamos la petición usando axios
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    // Retornamos los datos de la respuesta
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};