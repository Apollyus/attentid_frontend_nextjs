// src/hooks/useDevices.ts
import { useState, useEffect } from 'react';
import apiClient from '../api/client';

export interface Device {
  id_device: string;
  description: string | null;
  identification: string;
  mac_address: string | null;
  latitude: number | null;
  longitude: number | null;
  id_user: string;
}

export interface DeviceCreate {
  description?: string | null;
  identification: string;
  mac_address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export interface DeviceUpdate {
  description?: string | null;
  mac_address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export function useDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDevices = async (skip = 0, limit = 100) => {
    try {
      setLoading(true);
      const response = await apiClient.get<Device[]>(`/api/v1/devices/?skip=${skip}&limit=${limit}`);
      setDevices(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch devices');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const getDeviceById = async (deviceId: string) => {
    try {
      setLoading(true);
      const response = await apiClient.get<Device>(`/api/v1/devices/${deviceId}`);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch device');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createDevice = async (deviceData: DeviceCreate) => {
    try {
      setLoading(true);
      const response = await apiClient.post<Device>('/api/v1/devices/', deviceData);
      await fetchDevices(); // Refresh the list
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create device');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateDevice = async (deviceId: string, deviceData: DeviceUpdate) => {
    try {
      setLoading(true);
      const response = await apiClient.put<Device>(`/api/v1/devices/${deviceId}`, deviceData);
      await fetchDevices(); // Refresh the list
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update device');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    devices,
    loading,
    error,
    fetchDevices,
    getDeviceById,
    createDevice,
    updateDevice
  };
}