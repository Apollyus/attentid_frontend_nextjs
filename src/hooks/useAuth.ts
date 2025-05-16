// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../api/client';

interface UserResponse {
  id: string;
  name: string;
  email: string;
  created: string;
  last_active: string;
  roles: Array<{ id_roles: number; description: string }>;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
}

export function useAuth() {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
  
    // Kontrola existujícího přihlášení při načtení
    useEffect(() => {
      const checkAuth = async () => {
        setLoading(true); // Ensure loading is true while checking
        
        const token = localStorage.getItem('auth_token');
        if (!token) {
          setLoading(false);
          return;
        }
  
        try {
          const response = await apiClient.get<UserResponse>('/api/users/me');
          setUser(response.data);
          setIsAdmin(response.data.roles.some(role => role.id_roles === 2));
        } catch (err) {
          // Token neplatný nebo expirovaný
          localStorage.removeItem('auth_token');
          setUser(null);
          setIsAdmin(false);
        } finally {
          setLoading(false);
        }
      };
  
      checkAuth();
    }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      
      // Použití správného API endpointu podle OpenAPI specifikace
      const response = await apiClient.post<TokenResponse>('/api/auth/login', credentials);
      
      // Uložení tokenu z odpovědi
      const { access_token } = response.data;
      localStorage.setItem('auth_token', access_token);
      
      // Získání dat uživatele
      const userResponse = await apiClient.get<UserResponse>('/api/users/me');
      setUser(userResponse.data);
      setIsAdmin(userResponse.data.roles.some(role => role.id_roles === 2));
      
      router.push('/');
      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Přihlášení se nezdařilo';
      setError(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    // Set loading to true during logout to prevent flashes
    setLoading(true);
    
    // Clear auth data
    localStorage.removeItem('auth_token');
    setUser(null);
    setIsAdmin(false);
    
    // Ensure state updates complete before navigation
    setTimeout(() => {
      setLoading(false);
      router.push('/login');
    }, 50); // Small delay to ensure state updates propagate
    
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin
  };
}