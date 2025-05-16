"use client";
import { useState } from "react";
import { Poppins } from 'next/font/google' 
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { AuthProvider } from '../contexts/AuthContext';
import ProtectedRoute from "@/components/ProtectedRoute";

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
  variable: "--font-poppins",
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
        className={`${poppins.className} font-sans antialiased bg-gray-50 relative`}
      >
        <AuthProvider>
          <ProtectedRoute>
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
                  {children}
                </div>
              </main>
            </div>
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}