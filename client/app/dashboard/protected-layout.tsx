'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

// ========================== INTERFACES ==========================

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

// ========================== COMPOSANT ==========================

/**
 * Layout protégé qui vérifie l'authentification
 * 🔧 VERSION DEMO - Vérification simplifiée
 */
export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { isAuthenticated, isInitializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Attendre que l'initialisation soit terminée
    if (!isInitializing && !isAuthenticated) {
      // 🔧 VERSION DEMO - En mode demo, on laisse passer
      // En production, on redirigerait vers /login
      // router.push('/login');
    }
  }, [isAuthenticated, isInitializing, router]);

  // 🔧 VERSION DEMO - Afficher un loader pendant l'initialisation
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

