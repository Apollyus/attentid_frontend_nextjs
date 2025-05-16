// src/hooks/useStatistics.ts
import { useState } from 'react';
import apiClient from '../api/client';

export interface RaspberryDeviceCount {
  raspberry_uuid: string;
  device_count: number;
}

export function useStatistics() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDevicesPerRaspberry = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<RaspberryDeviceCount[]>('/api/v1/statistics/devices_per_raspberry');
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch statistics');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getDevicesForSpecificRaspberry = async (raspberryUuid: string) => {
    try {
      setLoading(true);
      const response = await apiClient.get<RaspberryDeviceCount[]>(
        `/api/v1/statistics/devices_per_raspberry/${raspberryUuid}`
      );
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch statistics for specific raspberry');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getDevicesPerRaspberry,
    getDevicesForSpecificRaspberry
  };
}