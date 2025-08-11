import React, { useState } from 'react';
import { Card } from '../atoms/Card';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  category: string;
  imageUrl?: string;
}

interface GallerySectionProps {
  images: GalleryImage[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ images }) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');

  // Obtener categorías únicas
  const categories = ['todas', ...Array.from(new Set(images.map(img => img.category)))];

  // Filtrar imágenes por categoría
  const filteredImages = selectedCategory === 'todas' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
      const nextIndex = (currentIndex + 1) % filteredImages.length;
      setSelectedImage(filteredImages[nextIndex]);
    }
  };

  const prevImage = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
      const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
      setSelectedImage(filteredImages[prevIndex]);
    }
  };

  return (
    <section id="galeria" className="bg-white py-24">
      <div className="container mx-auto px-6">
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-8">
            Galería de Fotos
          </h2>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Momentos especiales de nuestra comunidad y trabajo
          </p>
        </div>

        {/* Filtros de categorías */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 border-2",
                selectedCategory === category
                  ? "bg-primary text-white border-primary shadow-lg"
                  : "bg-white text-gray-700 border-gray-300 hover:border-primary hover:text-primary"
              )}
            >
              {category === 'todas' ? 'Todas' : category}
            </button>
          ))}
        </div>

        {/* Grid de fotos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={cn(
                "group cursor-pointer transition-all duration-500",
                hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                `delay-${index * 100}`
              )}
              onClick={() => openModal(image)}
            >
              <Card
                variant="outlined"
                className="overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-white border-2 border-gray-200"
              >
                {/* Placeholder para imagen */}
                <div className="aspect-square bg-gradient-to-br from-ong-detail-1/20 to-ong-base flex items-center justify-center relative group-hover:from-ong-detail-1/40 group-hover:to-ong-detail-1 transition-all duration-300">
                  <div className="text-center">
                    <div className="text-5xl mb-3">📸</div>
                    <p className="text-sm text-gray-600 font-medium">Foto {index + 1}</p>
                  </div>
                  
                  {/* Overlay con información */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <h4 className="font-bold text-lg mb-2">{image.title}</h4>
                      {image.description && (
                        <p className="text-sm opacity-90">{image.description}</p>
                      )}
                      <div className="mt-3">
                        <span className="bg-primary/80 px-3 py-1 rounded-full text-xs font-medium">
                          {image.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-1 text-lg">{image.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{image.category}</p>
                  {image.description && (
                    <p className="text-sm text-gray-500 line-clamp-2">{image.description}</p>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Modal para vista ampliada */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
              {/* Botón cerrar */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navegación */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Imagen */}
              <div className="aspect-video bg-gradient-to-br from-ong-detail-1/20 to-ong-base flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">📸</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-600">Vista ampliada</p>
                </div>
              </div>

              {/* Información */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{selectedImage.title}</h3>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">
                    {selectedImage.category}
                  </span>
                </div>
                {selectedImage.description && (
                  <p className="text-lg text-gray-700 leading-relaxed">{selectedImage.description}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}; 