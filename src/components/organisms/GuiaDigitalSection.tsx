import React, { useState } from 'react';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { AppIcon } from '../atoms/AppIcon';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils';
import { GuiaDigitalViewer } from './GuiaDigitalViewer';

export const GuiaDigitalSection: React.FC = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <>
      <section id="guia-digital" className="bg-gradient-to-br from-ong-primary/5 to-ong-secondary/5 py-24">
        <div className="container mx-auto px-6">
          <div 
            ref={elementRef as React.RefObject<HTMLDivElement>}
            className={cn(
              "text-center mb-16 transition-all duration-1000",
              hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-8">
              Guía Digital Warmipura
            </h2>
            <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
              Una guía completa para conocer y defender tus derechos
            </p>
            <div className="inline-flex items-center gap-2 bg-ong-primary/10 text-ong-primary px-6 py-3 rounded-full">
              <AppIcon icon="lucide:book-open" className="w-5 h-5" />
              <span className="font-semibold">Haz clic para explorar la guía</span>
            </div>
          </div>

          {/* Tarjeta de la guía */}
          <div className="max-w-4xl mx-auto">
            <Card
              variant="outlined"
              className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer bg-white border-2 border-gray-200 hover:border-ong-primary"
              onClick={() => setIsViewerOpen(true)}
            >
              <div className="relative">
                {/* Preview de la primera página del PDF */}
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl bg-gray-100">
                  {/* Iframe con la primera página del PDF */}
                  <iframe
                    src={`${new URL('../../assets/documents/pdfs/GUÍA DIGITAL WARMIPURA ONG (5).pdf', import.meta.url).href}#page=1&toolbar=0&navpanes=0&scrollbar=0&zoom=FitH`}
                    className="w-full h-full border-0 pointer-events-none"
                    title="Página 1 - Guía Digital Warmipura"
                  />
                  
                  {/* Overlay con información */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                    <div className="p-6 w-full">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          Guía Digital Warmipura ONG
                        </h3>
                        <p className="text-white/90 mb-4">
                          Descubre y defiende tus derechos
                        </p>
                        <div className="inline-flex items-center gap-2 bg-ong-primary text-white px-6 py-3 rounded-full font-semibold">
                          <AppIcon icon="lucide:eye" className="w-5 h-5" />
                          Vista Previa
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Efecto de páginas superpuestas */}
                  <div className="absolute top-4 right-4 flex gap-1">
                    {[1, 2, 3].map((page) => (
                      <div
                        key={page}
                        className="w-8 h-10 bg-white/60 rounded-sm shadow-sm"
                        style={{
                          transform: `rotate(${page * 2}deg) translateX(${page * 2}px)`,
                          zIndex: 3 - page
                        }}
                      />
                    ))}
                  </div>

                  {/* Indicador de páginas */}
                  <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Páginas 2-3 de 20
                  </div>
                </div>

                {/* Información de la guía */}
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-ong-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <AppIcon icon="lucide:file-text" className="w-6 h-6 text-ong-primary" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Guía Completa</h4>
                      <p className="text-sm text-gray-600">Información detallada sobre derechos</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-ong-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <AppIcon icon="lucide:shield-check" className="w-6 h-6 text-ong-primary" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Protección Legal</h4>
                      <p className="text-sm text-gray-600">Recursos para defender tus derechos</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-ong-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <AppIcon icon="lucide:users" className="w-6 h-6 text-ong-primary" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Para la Comunidad</h4>
                      <p className="text-sm text-gray-600">Acceso gratuito para todas</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="primary"
                      size="lg"
                      className="flex items-center gap-2"
                    >
                      <AppIcon icon="lucide:eye" className="w-5 h-5" />
                      Ver Guía Completa
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex items-center gap-2"
                      onClick={(e) => {
                        e?.stopPropagation();
                        const pdfUrl = new URL('../../assets/documents/pdfs/GUÍA DIGITAL WARMIPURA ONG (5).pdf', import.meta.url).href;
                        window.open(pdfUrl, '_blank');
                      }}
                    >
                      <AppIcon icon="lucide:download" className="w-5 h-5" />
                      Descargar PDF
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Visor de la guía */}
      <GuiaDigitalViewer 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
      />
    </>
  );
};
