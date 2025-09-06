import React from 'react';
import { cn } from '../../utils/cn';
import PumaFace from '../../assets/icons/Personaje/Carita de puma full color.svg';
import Logo from '../../assets/logo/ong/Logotipo secundario .svg';

interface PageLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  message?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading,
  children,
  className,
  message = 'Cargando...'
}) => {
  if (!isLoading) return <>{children}</>;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-white',
        className
      )}
    >
      {/* Fondo sutil con gradiente del color principal */}
      <div className="absolute inset-0 bg-gradient-to-br from-ong-primary/5 via-white to-ong-primary/5" />

      <div className="relative z-10 flex flex-col items-center select-none">
        {/* Marca */}
        <div className="flex items-center gap-3 mb-6">
          <img src={Logo} alt="Warmipura" className="h-8 opacity-90" />
        </div>

        {/* Cara del puma animada */}
        <div className="relative mb-8">
          {/* halo animado */}
          <div className="absolute inset-0 rounded-full blur-2xl bg-ong-primary/20 animate-ping" />
          <div className="absolute inset-0 rounded-full blur-md bg-ong-primary/10" />
          <div className="relative w-24 h-24 rounded-full ring-4 ring-ong-primary/20 flex items-center justify-center shadow-xl bg-white">
            <img src={PumaFace} alt="Puma Chaski" className="w-16 h-16 animate-[pulse_1.8s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Línea de progreso minimal */}
        <div className="w-56 h-1.5 rounded-full bg-gray-200 overflow-hidden mb-4">
          <div className="h-full bg-ong-primary animate-[progress_1.8s_ease-in-out_infinite]" />
        </div>

        {/* Mensaje */}
        <div className="text-sm font-medium text-gray-600">
          {message}
        </div>
      </div>

      {/* Animaciones clave */}
      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); width: 30%; }
          50% { transform: translateX(25%); width: 50%; }
          100% { transform: translateX(100%); width: 30%; }
        }
      `}</style>
    </div>
  );
}; 