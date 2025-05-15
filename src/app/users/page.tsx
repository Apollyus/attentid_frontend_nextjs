"use client"; // Make this a Client Component
import UserListComponent from '@/components/UserListComponent';
import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

const UsersPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-start p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <header className="mb-8">
          <div className="flex justify-start items-center mb-4">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group">
              <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-medium">Zpět na hlavní menu</span>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 text-center">Přehled Uživatelů</h1>
          <p className="text-gray-600 mt-1 text-center mb-6">Seznam registrovaných uživatelů a jejich detailů.</p>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => alert("Funkce přidání uživatele bude implementována")}
              className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
            >
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Přidat uživatele
            </button>
          </div>
        </header>
        <UserListComponent />
      </div>
    </div>
  );
};

export default UsersPage;