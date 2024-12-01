import axiosInstance from '../api/axiosConfig'; 
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get('/api/productos');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axiosInstance.post('/api/productos', productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/api/productos/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
