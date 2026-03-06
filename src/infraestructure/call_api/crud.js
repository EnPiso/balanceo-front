// utils/api.js
import axios from 'axios';
import toast from 'react-hot-toast';

const token = localStorage.getItem('token');

const handleApiError = (error, fallbackMsg = 'Error de conexión') => {
  const status = error?.response?.status;
  let message = fallbackMsg;
  if (status === 401)      message = 'Sesión expirada. Inicia sesión nuevamente';
  else if (status === 403) message = 'Sin permisos para esta acción';
  else if (status === 404) message = 'Recurso no encontrado';
  else if (status === 422) message = 'Datos inválidos';
  else if (status >= 500)  message = 'Error del servidor. Intenta de nuevo';
  else if (!navigator.onLine) message = 'Sin conexión a internet';
  toast.error(message, { duration: 4000 });
};

export const fetchGetDataToken = async (url, tokenState) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenState}`
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error al cargar los datos');
    throw error;
  }
};

export const fetchGetData = async (url, params = {}) => {
  try {
    const response = await axios.get(url, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error al cargar los datos');
    throw error;
  }
};

export const postData = async (url, data) => {
  try {
    const response = await axios.post(url, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (err) {
    handleApiError(err, 'Error al guardar los datos');
    throw err;
  }
};

export const postDataToken = async (url, data, tokenState) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${tokenState ? tokenState : token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (err) {
    handleApiError(err, 'Error al guardar los datos');
    throw err;
  }
};

export const postDataFile = async (url, data) => {
  try {
    const response = await axios.post(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (err) {
    handleApiError(err, 'Error al subir el archivo');
    throw err;
  }
};

export const updateDataToken = async (url, data, tokenTemporal) => {
  try {
    const response = await axios.patch(url, data, {
      headers: {
        'Authorization': `Bearer ${tokenTemporal ? tokenTemporal : token}`,
      },
    });
    return response.data;
  } catch (err) {
    handleApiError(err, 'Error al actualizar los datos');
    throw err;
  }
};

export const updateData = async (url, data) => {
  try {
    const response = await axios.patch(url, data);
    return response.data;
  } catch (err) {
    handleApiError(err, 'Error al actualizar los datos');
    throw err;
  }
};

export const deleteData = async (url) => {
  try {
    const response = await axios.delete(url, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (err) {
    handleApiError(err, 'Error al eliminar el recurso');
    throw err;
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
      toast.error('El email o la contraseña están incorrectos');
      throw err;
    }
  };





export const fetchGetUser = async (url, params = {}) => {
  if (!token) return;
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error al cargar el usuario');
    throw error;
  }
};