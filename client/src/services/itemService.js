import api from './api';

export const itemService = {
  getItems: async (params = {}) => {
    const response = await api.get('/items', { params });
    return response.data;
  },

  getItem: async (id) => {
    const response = await api.get(`/items/${id}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/items/categories/list');
    return response.data;
  }
};
