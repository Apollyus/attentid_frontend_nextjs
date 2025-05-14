"use client";
import Link from 'next/link';
// Removed useState as it's now managed by the parent
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'; // Example icons

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  // Removed internal state:
  // const [isOpen, setIsOpen] = useState(true);
  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <>
      {/* Button to OPEN the sidebar (visible when sidebar is closed) */}
      {!isOpen && (
        <button
          onClick={toggleSidebar} // Use prop
          className="fixed top-5 left-5 z-50 p-2 bg-slate-700 text-white rounded-full shadow-lg hover:bg-slate-600 transition-colors flex items-center justify-center w-10 h-10"
          aria-label="Open sidebar"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      )}

      {/* The Sidebar itself, animated */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 w-64 bg-slate-800 text-slate-100 p-6 shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} // Use prop
      >
        {/* Button to CLOSE the sidebar (part of the sidebar, moves with it) */}
        <button
          onClick={toggleSidebar} // Use prop
          className="absolute top-5 right-5 z-10 p-2 bg-slate-700 text-white rounded-full shadow-lg hover:bg-slate-600 transition-colors flex items-center justify-center w-10 h-10 cursor-pointer"
          aria-label="Close sidebar"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        
        {/* Sidebar Content */}
        <div className="text-center w-full pt-12"> {/* Increased padding top */}
          <a href="./" className='p-4'>
            <h1 className="text-3xl font-semibold mb-6 text-sky-400">AttentID</h1>
          </a>
          <hr className="border-slate-600 mb-6" /> {/* Lighter separator */}
        </div>
        <nav className="w-full space-y-2">
          <Link href="/checkpoints" className="block py-2.5 px-4 rounded-lg hover:bg-slate-700 hover:text-sky-300 transition-colors duration-150 text-center text-slate-200">
            Checkpointy
          </Link>
          <Link href="/users" className="block py-2.5 px-4 rounded-lg hover:bg-slate-700 hover:text-sky-300 transition-colors duration-150 text-center text-slate-200">
            Uživatelé
          </Link>
          {/* Example of a navigation link, if you want to add them later */}
          {/* <a href="#" className="block py-2 px-3 rounded hover:bg-accent hover:text-white">Dashboard</a>
          <a href="#" className="block py-2 px-3 rounded hover:bg-accent hover:text-white mt-1">Settings</a> */}
        </nav>
      </aside>
    </>
  );
}