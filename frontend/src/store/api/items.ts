import { api } from './index';
import { Item } from '../types';

export const itemsApi = {
  getItems: async (params: { page?: number; search?: string; status?: string }) => {
    const response = await api.get('/items', { params });
    return response.data;
  },

  createItem: async (itemData: Omit<Item, '_id' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post('/items', itemData);
    return response.data;
  },

  updateItem: async (id: string, itemData: Partial<Item>) => {
    const response = await api.put(`/items/${id}`, itemData);
    return response.data;
  },

  deleteItem: async (id: string) => {
    await api.delete(`/items/${id}`);
    return id;
  },
};