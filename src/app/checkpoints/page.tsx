"use client"; // Make this a Client Component
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import useDemoDevicesApi, { Device } from '@/hooks/useDemoDevicesApi'; // Import the new hook and Device interface
import LoadingSpinner from '@/components/LoadingSpinner'; // Import the new spinner

// Interface Device is now imported from the hook

// mockDevices is removed as we will use the hook

const CheckpointListPage = () => {
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const { data: devices, loading, error } = useDemoDevicesApi(shouldFetchData); // Use the new hook

  useEffect(() => {
    // Trigger fetch on component mount
    setShouldFetchData(true);
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <header className="mb-8">
          <div className="flex justify-start items-center mb-4"> {/* Changed justify-between to justify-start */}
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group">
              <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-medium">Zpět na hlavní menu</span>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 text-center">Přehled Checkpointů</h1>
          <p className="text-gray-600 mt-1 text-center mb-6">Seznam registrovaných zařízení a jejich detailů.</p> {/* Added mb-6 */}
          <div className="flex justify-end mb-4"> {/* New div for button, aligned to right */}
            <button
              onClick={() => alert("Funkce přidání zařízení bude implementována")}
              className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
            >
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Přidat zařízení
            </button>
          </div>
        </header>
        
        {loading && <LoadingSpinner />}
        {error && (
          <div className="text-center  bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Chyba!</strong>
            <span className="block sm:inline"> Nepodařilo se načíst data: {error.message}</span>
          </div>
        )}
        {!loading && !error && devices && (
          <div className="shadow-xl rounded-lg overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      MAC Adresa
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lokace
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Adresa
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Souřadnice (Lat, Lng)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {devices.map((device, index) => (
                    <tr key={device.macAddress} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{device.macAddress}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{device.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{device.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{`${device.coordinates.lat}, ${device.coordinates.lng}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
         {!loading && !error && !devices && shouldFetchData && (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500">Žádná data k zobrazení.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckpointListPage;