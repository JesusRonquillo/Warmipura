// ===== IMAGES CONFIGURATION =====
// Configuración de imágenes para el proyecto

export interface ImageConfig {
  filename: string;
  alt: string;
  title: string;
  category: 'gallery' | 'team' | 'projects' | 'events' | 'transparencia' | 'navidad' | 'fondo-consursable' | 'festi-esperanza' | 'evento-juvenil-cerreno' | 'dia-del-padre' | 'dia-de-la-madre' | 'capa-cian';
  featured?: boolean;
  description?: string;
  subfolder?: string;
}

// ===== IMÁGENES DE GALERÍA =====
import { GALLERY_IMAGES } from './galleryImages';
export { GALLERY_IMAGES };

// ===== IMÁGENES DEL EQUIPO =====
export const TEAM_IMAGES: ImageConfig[] = [
  // Las imágenes del equipo se agregarán cuando estén disponibles
];

// ===== IMÁGENES DE PROYECTOS =====
export const PROJECT_IMAGES: ImageConfig[] = [
  // Las imágenes de proyectos se agregarán cuando estén disponibles
];

// ===== IMÁGENES DE EVENTOS =====
export const EVENT_IMAGES: ImageConfig[] = [
  // Las imágenes de eventos se agregarán cuando estén disponibles
];

// ===== TODAS LAS IMÁGENES =====
export const ALL_IMAGES: ImageConfig[] = [
  ...GALLERY_IMAGES,
  ...TEAM_IMAGES,
  ...PROJECT_IMAGES,
  ...EVENT_IMAGES
];

// ===== FUNCIONES UTILITARIAS =====

/**
 * Obtiene imágenes por categoría
 */
export const getImagesByCategory = (category: ImageConfig['category']): ImageConfig[] => {
  return ALL_IMAGES.filter(image => image.category === category);
};

/**
 * Obtiene imágenes destacadas
 */
export const getFeaturedImages = (): ImageConfig[] => {
  return ALL_IMAGES.filter(image => image.featured);
};

/**
 * Obtiene una imagen por filename
 */
export const getImageByFilename = (filename: string): ImageConfig | undefined => {
  return ALL_IMAGES.find(image => image.filename === filename);
};

/**
 * Obtiene la URL completa de una imagen
 */
import { imageImports } from './imageImports';

export const getImageUrl = (_category: ImageConfig['category'], filename: string): string => {
  // Usar importaciones estáticas para mejor compatibilidad con Vite
  return imageImports[filename] || '';
};

/**
 * Obtiene la URL del favicon
 */
export const getFaviconUrl = (): string => {
  return imageImports['Abreviatura.svg'] || '/vite.svg';
};

/**
 * Obtiene la URL completa de una imagen usando su configuración
 */
export const getImageUrlFromConfig = (image: ImageConfig): string => {
  return getImageUrl(image.category, image.filename);
};

// ===== CONFIGURACIÓN DE TAMAÑOS =====
export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 200 },
  medium: { width: 600, height: 400 },
  large: { width: 1200, height: 800 }
} as const;

/**
 * Genera atributos de imagen optimizados
 */
export const getImageAttributes = (image: ImageConfig, size: keyof typeof IMAGE_SIZES = 'medium') => {
  const dimensions = IMAGE_SIZES[size];
  
  return {
    src: getImageUrlFromConfig(image),
    alt: image.alt,
    title: image.title,
    width: dimensions.width,
    height: dimensions.height,
    loading: 'lazy' as const,
    className: 'object-cover rounded-lg'
  };
};
