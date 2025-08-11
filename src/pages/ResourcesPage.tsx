import React, { useState, useEffect, useRef } from 'react';
import ResourceViewer from '../components/organisms/ResourceViewer';
import { PageLoader } from '../components/atoms/PageLoader';
import { LazyImage } from '../components/atoms/LazyImage';
import { sampleResources } from '../data/sampleResources';
import { sampleImages } from '../data/sampleImages';
import type { DownloadableResource } from '../types/resources';
import type { GalleryImage } from '../types/resources';
import { S3Service } from '../services/S3Service';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import LogotipoPrincipal from '../assets/icons/Logotipo Principal SVG.svg';

const ResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resources' | 'images'>('resources');
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
  const preloadQueueRef = useRef<GalleryImage[]>([]);
  const isPreloadingRef = useRef(false);

  useEffect(() => {
    // Simular tiempo de carga inicial
    const timer = setTimeout(() => {
      setIsPageLoading(false);
      // Iniciar precarga de imágenes inmediatamente
      startImagePreloading();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activeTab === 'images') {
      setTotalImages(sampleImages.length);
      setImagesLoaded(preloadedImages.size);
    }
  }, [activeTab, preloadedImages.size]);

  // Función para precargar imágenes en segundo plano
  const startImagePreloading = () => {
    if (isPreloadingRef.current) return;
    
    isPreloadingRef.current = true;
    preloadQueueRef.current = [...sampleImages];
    
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
        // Continuar con la siguiente imagen
        setTimeout(preloadNextImage, 100); // Pequeño delay para no saturar
      };
      
      img.onerror = () => {
        // Si falla, continuar con la siguiente
        setTimeout(preloadNextImage, 100);
      };
      
      img.src = image.thumbnailSrc || image.src;
    };

    // Iniciar precarga con un pequeño delay
    setTimeout(preloadNextImage, 200);
  };

  // Función para precargar imágenes específicas (por categoría)
  const preloadImagesByCategory = (category: string) => {
    const categoryImages = sampleImages.filter(img => 
      category === 'Todas' || img.category === category
    );
    
    categoryImages.forEach(image => {
      if (!preloadedImages.has(image.id)) {
        const img = new Image();
        img.src = image.thumbnailSrc || image.src;
        img.onload = () => {
          setPreloadedImages(prev => new Set([...prev, image.id]));
        };
      }
    });
  };

  const handleDownload = (resource: DownloadableResource) => {
    console.log('Descargando:', resource.name);
    // Aquí puedes implementar lógica adicional antes de la descarga
    window.open(resource.url, '_blank');
  };

  const handleImageClick = (image: GalleryImage) => {
    // Abrir imagen en tamaño completo
    window.open(image.fullSizeSrc || image.src, '_blank');
  };

  const handleImageLoad = () => {
    // Esta función se llama cuando LazyImage termina de cargar
    // Ya no necesitamos incrementar aquí porque se maneja en la precarga
  };

  const handleCategoryClick = (category: string) => {
    // Precargar imágenes de la categoría seleccionada
    preloadImagesByCategory(category);
  };

  const loadingProgress = totalImages > 0 ? (imagesLoaded / totalImages) * 100 : 0;

  return (
    <PageLoader isLoading={isPageLoading}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header de navegación */}
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-16 z-40">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="flex items-center space-x-2 text-gray-600 hover:text-ong-primary transition-colors duration-200"
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Volver al Inicio</span>
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <img 
                  src={LogotipoPrincipal} 
                  alt="Warmipura Logo" 
                  className="h-8 w-auto"
                />
                <span className="text-lg font-bold text-gray-800">Recursos Digitales</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-ong-primary to-ong-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Recursos Digitales
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Accede a todos nuestros materiales, documentos y galería de imágenes
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-lg">
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-6 py-3 rounded-md font-medium transition-all-smooth ${
                  activeTab === 'resources'
                    ? 'bg-ong-primary text-white shadow-md'
                    : 'text-gray-600 hover:text-ong-primary hover:bg-gray-50'
                }`}
              >
                📚 Documentos y Recursos
              </button>
              <button
                onClick={() => setActiveTab('images')}
                className={`px-6 py-3 rounded-md font-medium transition-all-smooth ${
                  activeTab === 'images'
                    ? 'bg-ong-primary text-white shadow-md'
                    : 'text-gray-600 hover:text-ong-primary hover:bg-gray-50'
                }`}
              >
                📸 Galería de Imágenes
                {/* Indicador de precarga */}
                {isPreloadingRef.current && imagesLoaded < totalImages && (
                  <span className="ml-2 inline-flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Indicador de precarga global */}
          {isPreloadingRef.current && imagesLoaded < totalImages && (
            <div className="text-center mb-4">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Precargando imágenes en segundo plano...</span>
                <span className="text-xs opacity-75">({imagesLoaded}/{totalImages})</span>
              </div>
            </div>
          )}

          {/* Content */}
          {activeTab === 'resources' ? (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Documentos y Materiales
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Descarga manuales, guías, presentaciones y otros recursos útiles para tu trabajo
                </p>
              </div>
              <ResourceViewer 
                resources={sampleResources} 
                onDownload={handleDownload}
              />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Galería de Imágenes
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Explora momentos especiales de nuestras campañas y actividades comunitarias
                </p>
              </div>
              
              {/* Loading Progress Bar */}
              {totalImages > 0 && imagesLoaded < totalImages && (
                <div className="max-w-md mx-auto mb-8">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Cargando imágenes...</span>
                    <span>{imagesLoaded} / {totalImages}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-ong-primary h-2 rounded-full progress-fill transition-all-smooth"
                      style={{ '--progress-width': `${loadingProgress}%` } as React.CSSProperties}
                    ></div>
                  </div>
                </div>
              )}
              
              {/* Image Categories */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {['Todas', 'C_D_Madre', 'C_utiles'].map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-ong-primary hover:text-white transition-all-smooth shadow-md hover:shadow-lg hover-lift"
                  >
                    {category === 'C_D_Madre' ? 'Día de la Madre' : 
                     category === 'C_utiles' ? 'Útiles Escolares' : 
                     category}
                  </button>
                ))}
              </div>

              {/* Image Grid with LazyImage */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sampleImages.map((image, index) => (
                  <div
                    key={image.id}
                    onClick={() => handleImageClick(image)}
                    className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all-smooth hover-lift"
                    style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
                  >
                    <div className="relative aspect-square bg-gradient-to-br from-gray-200 to-gray-300">
                      <LazyImage
                        src={image.thumbnailSrc || image.src}
                        alt={image.alt}
                        className="w-full h-full"
                        onLoad={handleImageLoad}
                        isPreloaded={preloadedImages.has(image.id)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all-smooth" />
                      <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full px-2 py-1 text-xs font-medium text-gray-700">
                        {image.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                        {image.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {image.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {image.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full transition-all-smooth hover:bg-gray-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLoader>
  );
};

export default ResourcesPage; 