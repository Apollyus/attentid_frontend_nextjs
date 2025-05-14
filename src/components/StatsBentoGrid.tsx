'use client';

import React from 'react';
import useDemoApi from '../hooks/useDemoApi';
import useDemoDevicesApi from '../hooks/useDemoDevicesApi';
import LoadingSpinner from './LoadingSpinner'; // Assuming LoadingSpinner is in the same directory

interface StatCardProps {
  title: string;
  value: string | number;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, isLoading, error, className }) => {
  return (
    <div className={`p-4 rounded-lg border border-gray-300 flex flex-col justify-between ${className}`}>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      )}
    </div>
  );
};

const StatsBentoGrid: React.FC = () => {
  const { data: usersData, loading: usersLoading, error: usersError } = useDemoApi();
  const { data: devicesData, loading: devicesLoading, error: devicesError } = useDemoDevicesApi();

  const totalUsers = usersData ? usersData.length : 0;
  const activeUsers = totalUsers > 0 ? Math.floor(Math.random() * totalUsers) + 1 : 0;
  const totalCheckpoints = devicesData ? devicesData.length : 0;

  // Generate random average session duration (e.g., 1m to 9m 59s)
  const randomMinutes = Math.floor(Math.random() * 9) + 1;
  const randomSeconds = Math.floor(Math.random() * 60);
  const averageSessionDuration = `${randomMinutes}m ${randomSeconds < 10 ? '0' : ''}${randomSeconds}s`;

  const stats = [
    {
      title: "Aktivní Uživatelé",
      value: usersLoading ? 'Načítání...' : usersError ? 'Chyba' : activeUsers,
      isLoading: usersLoading,
      error: usersError ? 'Nepodařilo se načíst uživatele' : null,
      className: "md:col-span-2"
    },
    {
      title: "Celkem Uživatelů",
      value: usersLoading ? 'Načítání...' : usersError ? 'Chyba' : totalUsers,
      isLoading: usersLoading,
      error: usersError ? 'Nepodařilo se načíst uživatele' : null,
      className: ""
    },
    {
      title: "Celkem Checkpointů",
      value: devicesLoading ? 'Načítání...' : devicesError ? 'Chyba' : totalCheckpoints,
      isLoading: devicesLoading,
      error: devicesError ? 'Nepodařilo se načíst checkpointy' : null,
      className: ""
    },
    {
      title: "Prům. Doba Relace",
      value: averageSessionDuration,
      isLoading: false, // This is a placeholder, so no loading state
      error: null,
      className: "md:col-span-2"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.isLoading ? '...' : stat.error ? 'Chyba' : stat.value === 0 ? "0" : stat.value}
          isLoading={stat.isLoading}
          error={stat.error}
          className={stat.className}
        />
      ))}
    </div>
  );
};

export default StatsBentoGrid;