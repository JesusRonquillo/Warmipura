import React, { useState, useRef } from 'react';
import { AppIcon } from '../atoms/AppIcon';
import { Button } from '../atoms/Button';
import { cn } from '../../utils';

interface GuiaDigitalViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuiaDigitalViewer: React.FC<GuiaDigitalViewerProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(2); // Empezar en página 2 para mostrar doble página
  const [isFlipping, setIsFlipping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0); // Para forzar re-render de iframes
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const totalPages = 20; // Ajustar según el número real de páginas del PDF
  const pdfUrl = new URL('../../assets/documents/pdfs/GUÍA DIGITAL WARMIPURA ONG (5).pdf', import.meta.url).href;

  const handlePageChange = (newPage: number) => {
    if (newPage < 2 || newPage > totalPages || isFlipping) return;
    
    setIsFlipping(true);
    setIsLoading(true);
    
    // Efecto de libro - simular tiempo de volteo
    setTimeout(() => {
      setCurrentPage(newPage);
      setKey(prev => prev + 1); // Forzar re-render de iframes
      setTimeout(() => {
        setIsFlipping(false);
        setIsLoading(false);
      }, 100);
    }, 300);
  };

  const handleNextPage = () => {
    // Avanzar de 2 en 2 para mantener el formato de doble página
    const nextPage = currentPage + 2;
    if (nextPage <= totalPages - 1) { // -1 porque mostramos currentPage + 1
      handlePageChange(nextPage);
    }
  };

  const handlePrevPage = () => {
    // Retroceder de 2 en 2 para mantener el formato de doble página
    const prevPage = currentPage - 2;
    if (prevPage >= 2) {
      handlePageChange(prevPage);
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Contenedor del visor */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-ong-primary to-ong-secondary">
          <div className="flex items-center gap-3">
            <AppIcon icon="lucide:book-open" className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-bold text-white">Guía Digital Warmipura</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label="Cerrar visor"
          >
            <AppIcon icon="lucide:x" className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Controles de navegación */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage <= 2 || isFlipping}
              className="flex items-center gap-2"
            >
              <AppIcon icon="lucide:chevron-left" className="w-4 h-4" />
              Anterior
            </Button>
            
            <span className="text-sm text-gray-600 font-medium">
              Página {currentPage} de {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1 || isFlipping}
              className="flex items-center gap-2"
            >
              Siguiente
              <AppIcon icon="lucide:chevron-right" className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => window.open(pdfUrl, '_blank')}
              className="flex items-center gap-2"
            >
              <AppIcon icon="lucide:external-link" className="w-4 h-4" />
              Abrir en nueva pestaña
            </Button>
          </div>
        </div>

        {/* Contenedor del PDF con efecto de libro abierto */}
        <div className="relative h-[calc(90vh-140px)] overflow-hidden bg-gray-100">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ong-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando guía...</p>
              </div>
            </div>
          )}

          <div className={cn(
            "h-full transition-all duration-500 ease-in-out flex",
            isFlipping ? "transform scale-98 opacity-30" : "transform scale-100 opacity-100"
          )}>
            {/* Página izquierda */}
            <div className="w-1/2 h-full relative overflow-hidden flex items-center justify-center">
              <div className="w-full h-full overflow-hidden flex items-center justify-center">
                <iframe
                  key={`left-${key}`}
                  ref={iframeRef}
                  src={`${pdfUrl}#page=${currentPage}&toolbar=0&navpanes=0&scrollbar=0&zoom=50&view=FitV`}
                  className="border-0"
                  onLoad={handleIframeLoad}
                  title={`Página ${currentPage} - Guía Digital Warmipura`}
                  style={{ 
                    pointerEvents: 'none',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>    
              {/* Número de página izquierda */}
              <div className="absolute bottom-2 right-2 bg-white/80 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                {currentPage.toString().padStart(2, '0')}
              </div>
            </div>
            
            {/* División central del libro */}
            <div className="w-1 bg-gray-300 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-transparent"></div>
            </div>
            
            {/* Página derecha */}
            <div className="w-1/2 h-full relative overflow-hidden flex items-center justify-center">
              <div className="w-full h-full overflow-hidden flex items-center justify-center">
                <iframe
                  key={`right-${key}`}
                  src={`${pdfUrl}#page=${currentPage + 1}&toolbar=0&navpanes=0&scrollbar=0&zoom=50&view=FitV`}
                  className="border-0"
                  title={`Página ${currentPage + 1} - Guía Digital Warmipura`}
                  style={{ 
                    pointerEvents: 'none',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
              {/* Número de página derecha */}
              <div className="absolute bottom-2 right-2 bg-white/80 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                {(currentPage + 1).toString().padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Efecto de sombra de libro */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/10 to-transparent"></div>
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-black/10 to-transparent"></div>
          </div>
        </div>

        {/* Indicadores de página */}
        <div className="flex justify-center p-4 bg-gray-50">
          <div className="flex gap-2">
            {Array.from({ length: Math.min(10, Math.floor(totalPages / 2)) }, (_, i) => {
              const pageNum = (i * 2) + 2; // Páginas pares para doble página
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={isFlipping}
                  className={cn(
                    "w-8 h-8 rounded-full text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-ong-primary text-white" 
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  )}
                >
                  {pageNum}
                </button>
              );
            })}
            {Math.floor(totalPages / 2) > 10 && (
              <span className="flex items-center px-2 text-gray-500 text-sm">
                ...{totalPages}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
