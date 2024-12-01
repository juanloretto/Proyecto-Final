import axiosInstance from '../api';

export const fetchReservas = async () => {
  const response = await axiosInstance.get('/api/reservas');
  return response.data;
};

export const createReserva = async (data) => {
  const response = await axiosInstance.post('/api/reservas', data);
  return response.data;
};

export const updateReserva = async (id, data) => {
  const response = await axiosInstance.put(`/api/reservas/${id}`, data);
  return response.data;
};

export const deleteReserva = async (id) => {
  const response = await axiosInstance.delete(`/api/reservas/${id}`);
  return response.data;
};
