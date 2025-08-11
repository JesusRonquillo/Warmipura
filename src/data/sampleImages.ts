import type { GalleryImage } from '../types/resources';
import { S3Service } from '../services/S3Service';

// Datos reales de las imágenes subidas a S3 (solo formatos compatibles)
export const sampleImages: GalleryImage[] = [
  // ===== C_D_MADRE =====
  {
    id: 'cd-madre-1',
    src: S3Service.getFileUrl('images_s3/C_D_Madre/IMG_8667.JPG'),
    alt: 'Campaña Día de la Madre - Imagen 1',
    category: 'C_D_Madre',
    title: 'Campaña Día de la Madre - Imagen 1',
    description: 'Imagen de la campaña del Día de la Madre de Warmipura ONG',
    tags: ['campaña', 'día de la madre', 'warmipura', 'ong', 'comunidad'],
    thumbnailSrc: S3Service.getFileUrl('images_s3/C_D_Madre/IMG_8667.JPG'),
    fullSizeSrc: S3Service.getFileUrl('images_s3/C_D_Madre/IMG_8667.JPG')
  },

  // ===== C_UTILES =====
  {
    id: 'c-utiles-1',
    src: S3Service.getFileUrl('images_s3/C_utiles/Campaña_utiles_escolares_14.jpg'),
    alt: 'Campaña Útiles Escolares - Imagen 1',
    category: 'C_utiles',
    title: 'Campaña Útiles Escolares - Imagen 1',
    description: 'Primera imagen de la campaña de útiles escolares de Warmipura ONG',
    tags: ['campaña', 'útiles escolares', 'educación', 'warmipura', 'ong', 'comunidad'],
    thumbnailSrc: S3Service.getFileUrl('images_s3/C_utiles/Campaña_utiles_escolares_14.jpg'),
    fullSizeSrc: S3Service.getFileUrl('images_s3/C_utiles/Campaña_utiles_escolares_14.jpg')
  },
  {
    id: 'c-utiles-2',
    src: S3Service.getFileUrl('images_s3/C_utiles/Campaña_utiles_escolares_18.jpg'),
    alt: 'Campaña Útiles Escolares - Imagen 2',
    category: 'C_utiles',
    title: 'Campaña Útiles Escolares - Imagen 2',
    description: 'Segunda imagen de la campaña de útiles escolares de Warmipura ONG',
    tags: ['campaña', 'útiles escolares', 'educación', 'warmipura', 'ong', 'comunidad'],
    thumbnailSrc: S3Service.getFileUrl('images_s3/C_utiles/Campaña_utiles_escolares_18.jpg'),
    fullSizeSrc: S3Service.getFileUrl('images_s3/C_utiles/Campaña_utiles_escolares_18.jpg')
  },
  {
    id: 'c-utiles-3',
    src: S3Service.getFileUrl('images_s3/C_utiles/Campaña_utiles_escolares_2.jpg'),
    alt: 'Campaña Útiles Escolares - Imagen 3',
    category: 'C_utiles',
    title: 'Campaña Útiles Escolares - Imagen 3',
    description: 'Tercera imagen de la campaña de útiles escolares de Warmipura ONG',
    tags: ['campaña', 'útiles escolares', 'educación', 'warmipura', 'ong', 'comunidad'],
    thumbnailSrc: S3Service.getFileUrl('images_s3/C_utiles/Campaña_utiles_escolares_2.jpg'),
    fullSizeSrc: S3Service.getFileUrl('images_s3/C_utiles/Campaña_utiles_escolares_2.jpg')
  },
  {
    id: 'c-utiles-4',
    src: S3Service.getFileUrl('images_s3/C_utiles/Campaña_utiles_escolares_35.jpg'),
    alt: 'Campaña Útiles Escolares - Imagen 4',
    category: 'C_utiles',
    title: 'Campaña Útiles Escolares - Imagen 4',
    description: 'Cuarta imagen de la campaña de útiles escolares de Warmipura ONG',
    tags: ['campaña', 'útiles escolares', 'educación', 'warmipura', 'ong', 'comunidad'],
    thumbnailSrc: S3Service.getFileUrl('images_s3/C_utiles/Campaña_utiles_escolares_35.jpg'),
    fullSizeSrc: S3Service.getFileUrl('images_s3/C_utiles/Campaña_utiles_escolares_35.jpg')
  },
  {
    id: 'c-utiles-5',
    src: S3Service.getFileUrl('images_s3/C_utiles/Campaña_utiles_escolares_71.jpg'),
    alt: 'Campaña Útiles Escolares - Imagen 5',
    category: 'C_utiles',
    title: 'Campaña Útiles Escolares - Imagen 5',
    description: 'Quinta imagen de la campaña de útiles escolares de Warmipura ONG',
    tags: ['campaña', 'útiles escolares', 'educación', 'warmipura', 'ong', 'comunidad'],
    thumbnailSrc: S3Service.getFileUrl('images_s3/C_utiles/Campaña_utiles_escolares_71.jpg'),
    fullSizeSrc: S3Service.getFileUrl('images_s3/C_utiles/Campaña_utiles_escolares_71.jpg')
  }
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