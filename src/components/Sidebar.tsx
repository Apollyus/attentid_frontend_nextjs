"use client";
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon, HomeIcon, UserGroupIcon, ServerIcon, CloudIcon, DocumentTextIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-5 left-5 z-50 p-2 bg-white text-gray-700 rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center w-10 h-10"
          aria-label="Open sidebar"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-40 w-64 bg-blue-100 text-gray-800 p-6 shadow-lg flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-5 right-5 z-10 p-2 bg-gray-100 text-gray-700 rounded-full shadow hover:bg-gray-200 transition-colors flex items-center justify-center w-8 h-8 cursor-pointer"
          aria-label="Close sidebar"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        
        <div className="text-center w-full pt-6 pb-8">
          <Link href="/" className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-2">
                <span className="font-bold text-xl">A</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-800">AttentID</h1>
            </div>
          </Link>
        </div>

        <nav className="w-full space-y-1">
          <Link href="/" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-200 transition-colors duration-150 text-gray-700">
            <HomeIcon className="h-5 w-5 mr-3" />
            <span>Domů</span>
          </Link>
          <Link href="/checkpoints" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-200 transition-colors duration-150 text-gray-700">
            <ServerIcon className="h-5 w-5 mr-3" />
            <span>Checkpointy</span>
          </Link>
          <Link href="/users" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-200 transition-colors duration-150 text-gray-700">
            <UserGroupIcon className="h-5 w-5 mr-3" />
            <span>Uživatelé</span>
          </Link>
          <Link href="/mqtt" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-200 transition-colors duration-150 text-gray-700">
            <CloudIcon className="h-5 w-5 mr-3" />
            <span>MQTT</span>
          </Link>
          <Link href="#" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-200 transition-colors duration-150 text-gray-700">
            <DocumentTextIcon className="h-5 w-5 mr-3" />
            <span>Vystavit certifikát</span>
          </Link>
          <Link href="/test" className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-200 transition-colors duration-150 text-gray-700">
            <Cog6ToothIcon className="h-5 w-5 mr-3" />
            <span>Test</span>
          </Link>
        </nav>
      </aside>
    </>
  );
}