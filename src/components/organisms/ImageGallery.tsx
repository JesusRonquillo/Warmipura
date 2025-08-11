import React, { useState, useMemo } from 'react';
import { LazyImage } from '../atoms/LazyImage';
import { Search, Grid, List } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { GalleryImage } from '../../types/resources';

interface ImageGalleryProps {
  images: GalleryImage[];
  categories?: string[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  categories = [] 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(12);

  // Filtrar imágenes
  const filteredImages = useMemo(() => {
    return images.filter(image => {
      const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          image.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [images, searchTerm, selectedCategory]);

  // Imágenes visibles (lazy loading por lotes)
  const visibleImages = filteredImages.slice(0, visibleCount);

  // Cargar más imágenes
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 12, filteredImages.length));
  };

  // Verificar si hay más imágenes para cargar
  const hasMore = visibleCount < filteredImages.length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header con controles */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Galería de Imágenes
            </h2>
            <p className="text-gray-600">
              {filteredImages.length} de {images.length} imágenes
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar imágenes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            {/* Filtro de categorías */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            {/* Cambiar vista */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 transition-colors',
                  viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 transition-colors',
                  viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Galería de imágenes */}
      <div className={cn(
        'grid gap-6',
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      )}>
        {visibleImages.map((image) => (
          <div
            key={image.id}
            className={cn(
              'group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300',
              viewMode === 'list' && 'flex gap-4'
            )}
          >
            {/* Imagen */}
            <div className={cn(
              'relative',
              viewMode === 'grid' ? 'aspect-square' : 'w-32 h-32 flex-shrink-0'
            )}>
              <LazyImage
                src={image.src}
                alt={image.alt}
                className="w-full h-full"
              />
              
              {/* Overlay con información */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-sm">{image.title}</h3>
                  {image.description && (
                    <p className="text-xs text-gray-200 mt-1">{image.description}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Información adicional en vista lista */}
            {viewMode === 'list' && (
              <div className="flex-1 p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{image.title}</h3>
                {image.description && (
                  <p className="text-gray-600 mb-3">{image.description}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {image.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Botón "Cargar más" */}
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
          >
            Cargar más imágenes ({filteredImages.length - visibleCount} restantes)
          </button>
        </div>
      )}

      {/* Mensaje si no hay resultados */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📷</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No se encontraron imágenes
          </h3>
          <p className="text-gray-600">
            Intenta ajustar los filtros o términos de búsqueda
          </p>
        </div>
      )}
    </div>
  );
}; 