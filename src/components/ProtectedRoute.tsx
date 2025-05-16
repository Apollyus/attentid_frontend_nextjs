// src/components/ProtectedRoute.tsx
"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    
    // Pro přihlašovací stránku - pokud je uživatel přihlášen, přesměrovat na dashboard
    if (isAuthenticated && pathname === '/login') {
      router.push('/');
      return;
    }
    
    // Pro ostatní stránky - pokud uživatel není přihlášen, přesměrovat na login
    if (!isAuthenticated && pathname !== '/login') {
      router.push('/login');
      return;
    }
    
    // Kontrola admin role pro specifické cesty (volitelné)
    // Tuto podmínku můžete upravit podle vašich potřeb
    if (isAuthenticated && !isAdmin && pathname.startsWith('/admin')) {
      router.push('/');
    }
  }, [isAuthenticated, isAdmin, loading, router, pathname]);

  // Zobrazit loading stav během načítání
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Pro login stránku vždy zobrazit obsah
  if (pathname === '/login') {
    return <>{children}</>;
  }

  // Pro ostatní stránky zobrazit obsah jen když je uživatel přihlášen
  return isAuthenticated ? <>{children}</> : null;
}