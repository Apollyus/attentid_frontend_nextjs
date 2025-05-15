"use client";
import { useState } from "react";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { HomeIcon, ArrowLeftOnRectangleIcon, BellIcon } from '@heroicons/react/24/outline';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 relative`}
      >
        {/* Background gradient blobs */}
        <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
          {/* Blue gradient blob */}
          <div className="absolute top-[10%] right-[15%] w-[30rem] h-[30rem] bg-blue-200/30 rounded-full blur-[100px] opacity-50" />
          
          {/* Second purple gradient blob */}
          <div className="absolute bottom-[5%] left-[10%] w-[28rem] h-[28rem] bg-indigo-200/30 rounded-full blur-[100px] opacity-40" />
          
          {/* Third smaller gradient blob */}
          <div className="absolute top-[35%] left-[20%] w-[20rem] h-[20rem] bg-teal-200/30 rounded-full blur-[80px] opacity-30" />
        </div>
        
        <div className="relative flex h-screen z-10">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <main
            className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
              isSidebarOpen ? "ml-64" : "ml-0"
            }`}
          >
            <div className="container mx-auto px-6 py-6">
              <div className="flex justify-end mb-6 gap-2">
                <button
                  className="bg-white hover:bg-gray-100 text-gray-700 rounded-full p-2 shadow-sm transition-colors border border-gray-100"
                  title="Notifications"
                >
                  <BellIcon className="h-5 w-5" />
                </button>
                <div className="bg-white rounded-full shadow-sm p-0.5 border border-gray-100">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    A
                  </div>
                </div>
              </div>
              
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}