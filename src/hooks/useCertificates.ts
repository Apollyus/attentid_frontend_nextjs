// src/hooks/useCertificates.ts
import { useState } from 'react';
import apiClient from '../api/client';

export interface CertificateCreate {
  user_id?: string | null;
  raspberry_uuid: string;
  timestamp?: string | null;
  time_window_minutes?: number;
}

export interface CertificateResponse {
  raspberry_uuid: string;
  user_id: string | null;
  id: string;
  timestamp: string;
  verified: boolean;
}

export interface CertificateVerify {
  certificate_id: string;
}

export function useCertificates() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCertificate = async (certificateData: CertificateCreate) => {
    try {
      setLoading(true);
      const response = await apiClient.post<CertificateResponse>('/api/v1/certificates', certificateData);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create certificate');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserCertificates = async (skip = 0, limit = 100) => {
    try {
      setLoading(true);
      const response = await apiClient.get<CertificateResponse[]>(`/api/v1/certificates?skip=${skip}&limit=${limit}`);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch user certificates');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAllCertificates = async (skip = 0, limit = 100) => {
    try {
      setLoading(true);
      const response = await apiClient.get<CertificateResponse[]>(`/api/v1/certificates/all?skip=${skip}&limit=${limit}`);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch all certificates');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCertificateDetails = async (certificateId: string) => {
    try {
      setLoading(true);
      const response = await apiClient.get<CertificateResponse>(`/api/v1/certificates/${certificateId}`);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch certificate details');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyCertificate = async (certificateVerify: CertificateVerify) => {
    try {
      setLoading(true);
      const response = await apiClient.post<CertificateResponse>('/api/v1/certificates/verify', certificateVerify);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to verify certificate');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createCertificate,
    getUserCertificates,
    getAllCertificates,
    getCertificateDetails,
    verifyCertificate
  };
}