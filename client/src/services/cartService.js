import api from './api';

export const cartService = {
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  addToCart: async (itemId, quantity) => {
    const response = await api.post('/cart/add', { itemId, quantity });
    return response.data;
  },

  updateQuantity: async (itemId, quantity) => {
    const response = await api.put(`/cart/update/${itemId}`, { quantity });
    return response.data;
  },

  removeFromCart: async (itemId) => {
    const response = await api.delete(`/cart/remove/${itemId}`);
    return response.data;
  },

  clearCart: async () => {
    const response = await api.delete('/cart/clear');
    return response.data;
  },

  getCartCount: async () => {
    const response = await api.get('/cart/count');
    return response.data;
  }
};
