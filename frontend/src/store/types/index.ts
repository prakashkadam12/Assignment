export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Item {
  _id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface ItemsState {
  items: Item[];
  totalItems: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
}