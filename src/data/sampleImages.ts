import type { GalleryImage } from '../types/resources';

// Imágenes de ejemplo usando assets locales
export const sampleImages: GalleryImage[] = [
  // Las imágenes se agregarán cuando estén disponibles en la carpeta de assets
];

// Categorías disponibles basadas en las campañas reales
export const imageCategories = ['C_D_Madre', 'C_utiles'];

// Función para obtener imágenes por categoría
export const getImagesByCategory = (category: string): GalleryImage[] => {
  if (category === 'all') return sampleImages;
  return sampleImages.filter(img => img.category === category);
};

// Función para buscar imágenes
export const searchImages = (query: string): GalleryImage[] => {
  const lowerQuery = query.toLowerCase();
  return sampleImages.filter(img => 
    img.title.toLowerCase().includes(lowerQuery) ||
    img.description?.toLowerCase().includes(lowerQuery) ||
    img.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}; 