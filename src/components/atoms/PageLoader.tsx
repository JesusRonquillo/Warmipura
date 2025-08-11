import React from 'react';
import { cn } from '../../utils/cn';

interface PageLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading,
  children,
  className
}) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <div className={cn(
      "fixed inset-0 bg-white z-50 flex items-center justify-center transition-all-smooth",
      className
    )}>
      <div className="text-center">
        {/* Logo o branding con animación */}
        <div className="mb-8 animate-pulse">
          <div className="text-4xl font-bold text-primary mb-2">Warmipura</div>
          <div className="text-lg text-gray-600">ONG</div>
        </div>
        
        {/* Spinner principal con animación mejorada */}
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Texto de carga con shimmer */}
        <div className="text-gray-600 mb-4 font-medium">Cargando recursos...</div>
        
        {/* Barra de progreso con animación */}
        <div className="w-48 bg-gray-200 rounded-full h-2 mx-auto mb-6">
          <div className="bg-primary h-2 rounded-full progress-fill" style={{ '--progress-width': '60%' } as React.CSSProperties}></div>
        </div>
        
        {/* Indicadores de estado con animación escalonada */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        {/* Texto adicional con skeleton loading */}
        <div className="mt-6 space-y-2">
          <div className="skeleton-text w-32 mx-auto"></div>
          <div className="skeleton-text w-24 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}; 