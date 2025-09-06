import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageLoader } from '../components/atoms/PageLoader';
import { LazyImage } from '../components/atoms/LazyImage';
import { AppIcon } from '../components/atoms/AppIcon';
import { GALLERY_IMAGES, getImageUrlFromConfig } from '../config/images';
import type { GalleryImage } from '../types/resources';

// Función para convertir ImageConfig a GalleryImage
const convertToGalleryImage = (imageConfig: any): GalleryImage => ({
  id: imageConfig.filename,
  title: imageConfig.title,
  description: imageConfig.description,
  category: imageConfig.category,
  src: getImageUrlFromConfig(imageConfig),
  thumbnailSrc: getImageUrlFromConfig(imageConfig),
  alt: imageConfig.alt,
  tags: [imageConfig.category]
});

const ResourcesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
  const [searchTerm, setSearchTerm] = useState('');
  const preloadQueueRef = useRef<GalleryImage[]>([]);
  const isPreloadingRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
      startImagePreloading();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Manejar parámetro de categoría de la URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const galleryImages = GALLERY_IMAGES.map(convertToGalleryImage);
    setTotalImages(galleryImages.length);
    setImagesLoaded(preloadedImages.size);
  }, [preloadedImages.size]);

  const startImagePreloading = () => {
    if (isPreloadingRef.current) return;
    isPreloadingRef.current = true;
    preloadQueueRef.current = GALLERY_IMAGES.map(convertToGalleryImage);
    const preloadNextImage = () => {
      if (preloadQueueRef.current.length === 0) {
        isPreloadingRef.current = false;
        return;
      }
      const image = preloadQueueRef.current.shift()!;
      const img = new Image();
      img.onload = () => {
        setPreloadedImages(prev => new Set([...prev, image.id]));
        setImagesLoaded(prev => prev + 1);
        setTimeout(preloadNextImage, 100);
      };
      img.onerror = () => {
        setTimeout(preloadNextImage, 100);
      };
      img.src = image.thumbnailSrc || image.src;
    };
    setTimeout(preloadNextImage, 200);
  };

  const preloadImagesByCategory = (category: string) => {
    const categoryImages = GALLERY_IMAGES.filter(img => 
      category === 'Todas' || img.category === category
    ).map(convertToGalleryImage);
    categoryImages.forEach(image => {
      if (!preloadedImages.has(image.id)) {
        const img = new Image();
        img.src = image.src;
        img.onload = () => {
          setPreloadedImages(prev => new Set([...prev, image.id]));
        };
      }
    });
  };

  const handleImageClick = (image: GalleryImage) => {
    window.open(image.fullSizeSrc || image.src, '_blank');
  };

  const handleImageLoad = () => {};

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    preloadImagesByCategory(category);
  };

  const filteredImages = GALLERY_IMAGES
    .map(convertToGalleryImage)
    .filter(image => {
      const matchesCategory = selectedCategory === 'Todas' || image.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (image.description && image.description.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

  const loadingProgress = totalImages > 0 ? (imagesLoaded / totalImages) * 100 : 0;

  const categories = [
    'Todas', 
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
    'Todas': 'Todas',
    'transparencia': 'Transparencia',
    'navidad': 'Navidad',
    'fondo-consursable': 'Fondo Consursable',
    'festi-esperanza': 'Festi Esperanza',
    'evento-juvenil-cerreno': 'Evento Juvenil Cerreño',
    'dia-del-padre': 'Día del Padre',
    'dia-de-la-madre': 'Día de la Madre',
    'capa-cian': 'Capacitaciones CIAM'
  };

  return (
    <PageLoader isLoading={isPageLoading}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100" style={{ paddingTop: 'calc(4rem + 1rem)' }}>
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-ong-primary via-ong-secondary to-ong-tertiary text-white py-12 sm:py-16 lg:py-20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-white rounded-full"></div>
            <div className="absolute top-32 right-20 w-12 sm:w-16 lg:w-24 h-12 sm:h-16 lg:h-24 bg-white rounded-full"></div>
            <div className="absolute bottom-10 left-1/4 w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 bg-white rounded-full"></div>
            <div className="absolute bottom-20 right-1/3 w-10 sm:w-16 lg:w-20 h-10 sm:h-16 lg:h-20 bg-white rounded-full"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
              <AppIcon icon="lucide:camera" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              <span className="font-semibold text-sm sm:text-base">Galería Digital</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Galería de Imágenes
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed px-4">
              Explora momentos especiales de nuestras campañas y actividades comunitarias
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-6 sm:mb-8">
            <div className="relative group">
              <div className="absolute inset-y-0 right-0 pr-4 sm:pr-6 flex items-center pointer-events-none">
                <AppIcon icon="lucide:search" className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-focus-within:text-ong-primary transition-colors duration-200" />
              </div>
              <input
                type="text"
                placeholder="Buscar en nuestra galería..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 sm:pl-6 pr-12 sm:pr-16 py-4 sm:py-5 lg:py-6 bg-white border-2 border-gray-200 rounded-2xl sm:rounded-3xl focus:ring-4 focus:ring-ong-primary/20 focus:border-ong-primary focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base lg:text-lg text-gray-700 placeholder-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-12 sm:right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                >
                  <AppIcon icon="lucide:x" className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
              {/* Category Filter */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Categorías</h3>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-ong-primary to-ong-secondary text-white shadow-lg shadow-ong-primary/25'
                          : 'bg-white text-gray-700 hover:bg-ong-primary hover:text-white shadow-md hover:shadow-lg border border-gray-200'
                      }`}
                    >
                      {categoryNames[category]}
                    </button>
                  ))}
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex flex-col items-end">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Vista</h3>
                <div className="flex bg-gray-100 rounded-2xl p-1 shadow-inner">
                  <button
                    onClick={() => setViewMode('masonry')}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      viewMode === 'masonry' 
                        ? 'bg-white text-ong-primary shadow-md' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    title="Vista Masonry"
                  >
                    <AppIcon icon="lucide:layout-grid" className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-white text-ong-primary shadow-md' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    title="Vista Grid"
                  >
                    <AppIcon icon="lucide:grid-3x3" className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Counter */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-ong-primary/10 to-ong-secondary/10 px-6 py-3 rounded-2xl">
                <AppIcon icon="lucide:image" className="w-5 h-5 text-ong-primary" />
                <span className="text-gray-700 font-semibold">
                  {filteredImages.length} imagen{filteredImages.length !== 1 ? 'es' : ''} encontrada{filteredImages.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Progress */}
        {isPreloadingRef.current && imagesLoaded < totalImages && (
          <div className="container mx-auto px-4 mb-8">
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Cargando imágenes...</span>
                <span>{imagesLoaded} / {totalImages}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-ong-primary to-ong-secondary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Image Gallery */}
        <div className="container mx-auto px-4 pb-12">
          <div className={`${
            viewMode === 'masonry' 
              ? 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6' 
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          }`}>
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                onClick={() => handleImageClick(image)}
                className={`group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 mb-6 ${
                  viewMode === 'masonry' ? 'break-inside-avoid' : ''
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                } as React.CSSProperties}
              >
                <div className="relative aspect-square bg-gradient-to-br from-gray-200 to-gray-300">
                  <LazyImage
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
                    onLoad={handleImageLoad}
                    isPreloaded={preloadedImages.has(image.id)}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700 group-hover:bg-ong-primary group-hover:text-white transition-all duration-300">
                    {image.category}
                  </div>
                  
                  {/* Hover Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <AppIcon icon="lucide:zoom-in" className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-ong-primary transition-colors duration-300">
                    {image.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {image.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <AppIcon icon="lucide:calendar" className="w-4 h-4" />
                      <span>Reciente</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <AppIcon icon="lucide:eye" className="w-4 h-4" />
                      <span>Ver</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <AppIcon icon="lucide:image-off" className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No se encontraron imágenes</h3>
              <p className="text-gray-600 mb-8 text-lg">Intenta con otros términos de búsqueda o categorías</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Todas');
                }}
                className="px-8 py-4 bg-gradient-to-r from-ong-primary to-ong-secondary text-white rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                <AppIcon icon="lucide:refresh-cw" className="w-5 h-5 inline mr-2" />
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </PageLoader>
  );
};

export default ResourcesPage;