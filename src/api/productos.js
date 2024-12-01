import axiosInstance from '../api';

export const fetchProductos = async () => {
  const response = await axiosInstance.get('/api/productos');
  return response.data;
};

export const createProducto = async (data) => {
  const response = await axiosInstance.post('/api/productos', data);
  return response.data;
};

export const updateProducto = async (id, data) => {
  const response = await axiosInstance.put(`/api/productos/${id}`, data);
  return response.data;
};

export const deleteProducto = async (id) => {
  const response = await axiosInstance.delete(`/api/productos/${id}`);
  return response.data;
};
