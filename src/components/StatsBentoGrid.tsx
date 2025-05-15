'use client';

import React from 'react';
import useDemoApi from '../hooks/useDemoApi';
import useDemoDevicesApi from '../hooks/useDemoDevicesApi';
import LoadingSpinner from './LoadingSpinner';
import { ClockIcon, CheckCircleIcon, BoltIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, isLoading, error, className }) => {
  return (
    <div className={`p-5 rounded-xl border border-gray-100 bg-white shadow-sm flex flex-col justify-between ${className}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="p-2 rounded-full bg-gray-50">{icon}</div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner size="h-6 w-6" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <div>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
          {trend && <p className={`text-xs mt-1 ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{trend}</p>}
        </div>
      )}
    </div>
  );
};

const StatsBentoGrid: React.FC = () => {
  const { data: users, loading: usersLoading, error: usersError } = useDemoApi(true);
  const { data: devices, loading: devicesLoading, error: devicesError } = useDemoDevicesApi(true);
  
  // Calculate stats
  const totalUsers = users?.length || 0;
  const totalDevices = devices?.length || 0;
  const onlineUsers = Math.floor(totalUsers * 0.4); // simulate 40% of users being online
  const averageSessionDuration = "31min";

  const stats = [
    {
      title: "Celkem uživatelů",
      value: totalUsers,
      trend: "+8 tento týden",
      icon: <UserGroupIcon className="h-5 w-5 text-blue-500" />,
      isLoading: usersLoading,
      error: usersError,
      className: ""
    },
    {
      title: "Počet checkpointů",
      value: totalDevices,
      trend: "+3 tento měsíc",
      icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
      isLoading: devicesLoading,
      error: devicesError,
      className: ""
    },
    {
      title: "Online uživatelé",
      value: onlineUsers,
      icon: <BoltIcon className="h-5 w-5 text-amber-500" />,
      trend: "+6 za poslední hodinu",
      isLoading: usersLoading, 
      error: usersError,
      className: ""
    },
    {
      title: "Průměrný čas",
      value: averageSessionDuration,
      trend: "-6 minut",
      icon: <ClockIcon className="h-5 w-5 text-purple-500" />,
      isLoading: false, 
      error: null,
      className: ""
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          trend={stat.trend}
          isLoading={stat.isLoading}
          error={stat.error instanceof Error ? stat.error.message : stat.error}
          className={stat.className}
        />
      ))}
    </div>
  );
};

export default StatsBentoGrid;