import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export interface Item {
  _id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface ItemsState {
  items: Item[];
  totalItems: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  totalItems: 0,
  currentPage: 1,
  isLoading: false,
  error: null,
};

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async ({ page = 1, search = '', status = '' }) => {
    const response = await axios.get(
      `${API_URL}/items?page=${page}&search=${search}&status=${status}`
    );
    return response.data;
  }
);

export const createItem = createAsyncThunk(
  'items/createItem',
  async (itemData: Omit<Item, '_id' | 'createdAt' | 'updatedAt'>) => {
    const response = await axios.post(`${API_URL}/items`, itemData);
    return response.data;
  }
);

export const updateItem = createAsyncThunk(
  'items/updateItem',
  async ({ id, itemData }: { id: string; itemData: Partial<Item> }) => {
    const response = await axios.put(`${API_URL}/items/${id}`, itemData);
    return response.data;
  }
);

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (id: string) => {
    await axios.delete(`${API_URL}/items/${id}`);
    return id;
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.totalItems = action.payload.total;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch items';
      });
  },
});

export default itemsSlice.reducer;