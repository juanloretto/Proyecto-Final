import axiosInstance from '../api';

export const fetchUsuarios = async () => {
  const response = await axiosInstance.get('/api/usuarios');
  return response.data;
};

export const createUsuario = async (data) => {
  const response = await axiosInstance.post('/api/usuarios', data);
  return response.data;
};

export const updateUsuario = async (id, data) => {
  const response = await axiosInstance.put(`/api/usuarios/${id}`, data);
  return response.data;
};

export const deleteUsuario = async (id) => {
  const response = await axiosInstance.delete(`/api/usuarios/${id}`);
  return response.data;
};
