import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils';
import { AppIcon } from '../atoms/AppIcon';
import { GALLERY_IMAGES, getImageUrlFromConfig } from '../../config/images';
import { useNavigate } from 'react-router-dom';

interface GallerySectionProps {
  images?: any[]; // Mantener compatibilidad con props opcionales
}

export const GallerySection: React.FC<GallerySectionProps> = ({ images = GALLERY_IMAGES }) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Obtener una imagen destacada de cada categoría
  const categories = [
    'transparencia', 
    'navidad', 
    'fondo-consursable', 
    'festi-esperanza', 
    'evento-juvenil-cerreno', 
    'dia-del-padre', 
    'dia-de-la-madre', 
    'capa-cian'
  ];

  const categoryNames: Record<string, string> = {
    'transparencia': 'Transparencia',
    'navidad': 'Navidad',
    'fondo-consursable': 'Fondo Consursable',
    'festi-esperanza': 'Festi Esperanza',
    'evento-juvenil-cerreno': 'Evento Juvenil Cerreño',
    'dia-del-padre': 'Día del Padre',
    'dia-de-la-madre': 'Día de la Madre',
    'capa-cian': 'Capacitaciones CIAM'
  };

  // Obtener imagen destacada de cada categoría
  const featuredImages = categories.map(category => {
    const categoryImages = images.filter(img => img.category === category);
    return categoryImages.find(img => img.featured) || categoryImages[0];
  }).filter(Boolean);

  // Auto-play del carrusel
  useEffect(() => {
    if (!isAutoPlaying || featuredImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredImages.length);
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredImages.length]);

  const handleCategoryClick = (category: string) => {
    navigate(`/recursos?category=${category}`);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredImages.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredImages.length) % featuredImages.length);
    setIsAutoPlaying(false);
  };

  return (
    <section id="galeria" className="bg-gradient-to-br from-gray-50 to-white py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
            Nuestra Galería
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-4 sm:mb-6 lg:mb-8 px-4">
            Explora momentos especiales de nuestras actividades y campañas
          </p>
          <div className="inline-flex items-center gap-2 bg-ong-primary/10 text-ong-primary px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base">
            <AppIcon icon="lucide:camera" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold">Haz clic en cualquier categoría para ver más</span>
          </div>
        </div>

        {/* Carrusel de categorías */}
        <div className="relative max-w-4xl lg:max-w-6xl mx-auto">
          {/* Contenedor del carrusel */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-2xl">
            {featuredImages.length > 0 ? (
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredImages.map((image) => (
                <div
                  key={image.category}
                  className="w-full flex-shrink-0"
                >
                  <div
                    className="group cursor-pointer relative h-96 md:h-[500px]"
                    onClick={() => handleCategoryClick(image.category)}
                  >
                    {/* Imagen de fondo */}
                    <img
                      src={getImageUrlFromConfig(image)}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    
                    {/* Fallback */}
                    <div className="absolute inset-0 bg-gradient-to-br from-ong-primary/20 to-ong-secondary/20 flex items-center justify-center hidden">
                      <div className="text-center">
                        <AppIcon icon="lucide:image" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg text-gray-600 font-medium">Imagen no disponible</p>
                      </div>
                    </div>
                    
                    {/* Overlay con información */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                      <div className="text-white p-8 w-full">
                        <div className="max-w-2xl">
                          <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-ong-primary transition-colors duration-300">
                            {categoryNames[image.category]}
                          </h3>
                          <p className="text-lg md:text-xl opacity-90 mb-6 line-clamp-3">
                            {image.description}
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="bg-ong-primary/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                              {image.category}
                            </span>
                            <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors duration-300">
                              <span className="text-sm">Ver galería completa</span>
                              <AppIcon icon="lucide:arrow-right" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            ) : (
              <div className="h-96 md:h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <AppIcon icon="lucide:image" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg text-gray-600 font-medium">Cargando imágenes...</p>
                </div>
              </div>
            )}

            {/* Botones de navegación */}
            {featuredImages.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 hover:text-ong-primary p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                  aria-label="Imagen anterior"
                >
                  <AppIcon icon="lucide:chevron-left" className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 hover:text-ong-primary p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                  aria-label="Siguiente imagen"
                >
                  <AppIcon icon="lucide:chevron-right" className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Indicadores */}
            {featuredImages.length > 1 && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {featuredImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      index === currentSlide
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/75"
                    )}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-ong-primary to-ong-secondary rounded-2xl p-8 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              ¿Quieres ver más fotos?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Explora nuestra galería completa con cientos de momentos especiales de nuestras actividades
            </p>
            <button
              onClick={() => navigate('/recursos')}
              className="bg-white text-ong-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <AppIcon icon="lucide:camera" className="w-5 h-5 inline mr-2" />
              Ver Galería Completa
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}; 