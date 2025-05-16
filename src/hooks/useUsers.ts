// src/hooks/useUsers.ts
import { useState, useEffect } from 'react';
import apiClient from '../api/client';

export interface UserListResponse {
  id: string;
  name: string;
  email: string;
  created: string;
  active: string | null;
}

export interface UserCreateAdmin {
  email: string | null;
  name?: string;
  password: string;
  id?: string | null;
  roles?: number[];
}

export interface UserUpdateAdmin {
  email?: string | null;
  name?: string | null;
  password?: string | null;
  roles?: number[] | null;
}

export function useUsers() {
  const [users, setUsers] = useState<UserListResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (skip = 0, limit = 100) => {
    try {
      setLoading(true);
      const response = await apiClient.get<UserListResponse[]>(`/api/users?skip=${skip}&limit=${limit}`);
      setUsers(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch users');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getUserById = async (userId: string) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/api/users/${userId}`);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: UserCreateAdmin) => {
    try {
      setLoading(true);
      const response = await apiClient.post('/api/users', userData);
      await fetchUsers(); // Refresh the list
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId: string, userData: UserUpdateAdmin) => {
    try {
      setLoading(true);
      const response = await apiClient.put(`/api/users/${userId}`, userData);
      await fetchUsers(); // Refresh the list
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      setLoading(true);
      await apiClient.delete(`/api/users/${userId}`);
      await fetchUsers(); // Refresh the list
      return true;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  };
}