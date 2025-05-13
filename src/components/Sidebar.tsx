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
          className="fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-md hover:bg-primary/80 flex items-center justify-center w-10 h-10"
          aria-label="Open sidebar"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      )}

      {/* The Sidebar itself, animated */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 w-64 bg-background text-foreground p-5 border-r border-secondary flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} // Use prop
      >
        {/* Button to CLOSE the sidebar (part of the sidebar, moves with it) */}
        <button
          onClick={toggleSidebar} // Use prop
          className="absolute top-4 right-4 z-10 p-2 bg-primary text-white rounded-md hover:bg-primary/80 flex items-center justify-center w-10 h-10"
          aria-label="Close sidebar"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        
        {/* Sidebar Content */}
        <div className="text-center w-full pt-10"> {/* Added pt-10 to provide space for the close button above */}
          <h1 className="text-3xl font-bold mb-5 text-primary inline-block">AttentID</h1>
          <hr className="border-gray-600 mb-5" /> {/* Separator line */}
        </div>
        <nav className="w-full">
          <Link href="/checkpoints" className="block py-2 px-3 rounded hover:bg-accent hover:text-white text-center">
            Checkpoints
          </Link>
          {/* Example of a navigation link, if you want to add them later */}
          {/* <a href="#" className="block py-2 px-3 rounded hover:bg-accent hover:text-white">Dashboard</a>
          <a href="#" className="block py-2 px-3 rounded hover:bg-accent hover:text-white mt-1">Users</a>
          <a href="#" className="block py-2 px-3 rounded hover:bg-accent hover:text-white mt-1">Settings</a> */}
        </nav>
      </aside>
    </>
  );
}