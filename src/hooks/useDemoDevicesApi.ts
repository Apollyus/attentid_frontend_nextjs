import { useState, useEffect } from 'react';

// Device interface
export interface Device {
  macAddress: string;
  location: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const useDemoDevicesApi = (shouldFetch: boolean = true) => {
  const [data, setData] = useState<Device[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!shouldFetch) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate API response with Device data
        const mockDeviceData: Device[] = [
          { macAddress: '00:1A:2B:3C:4D:5E', location: 'Kancelář Teplice (API)', address: 'Masarykova třída 10, Teplice', coordinates: { lat: 50.6403, lng: 13.8275 } },
          { macAddress: 'F8:E7:D6:C5:B4:A3', location: 'Sklad Proboštov (API)', address: 'Přemyslova 25, Proboštov', coordinates: { lat: 50.6511, lng: 13.8382 } },
          { macAddress: '12:34:56:78:90:AB', location: 'Pobočka Dubí (API)', address: 'Ruská 150, Dubí', coordinates: { lat: 50.6800, lng: 13.7810 } },
          { macAddress: '98:76:54:32:10:FE', location: 'Centrála Ústí n.L. (API)', address: 'Revoluční 1, Ústí nad Labem', coordinates: { lat: 50.6607, lng: 14.0325 } },
          { macAddress: 'AB:CD:EF:12:34:56', location: 'Servisní Středisko Děčín (API)', address: 'Dlouhá jízda 123, Děčín', coordinates: { lat: 50.7753, lng: 14.2148 } },
        ];
        setData(mockDeviceData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shouldFetch]);

  return { data, loading, error };
};

export default useDemoDevicesApi;