// ===== VIDEOS CONFIGURATION =====
// Configuración de videos de YouTube para el proyecto

export interface VideoConfig {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: 'tutorial' | 'testimonial' | 'event' | 'promotional';
  thumbnail?: string;
  featured?: boolean;
}

// ===== VIDEOS DE TUTORIALES SUNARP =====
export const TUTORIAL_VIDEOS: VideoConfig[] = [
  {
    id: 'WaoYqzODdIM',
    title: 'Introducción a SUNARP Digital',
    description: 'Aprende los conceptos básicos para usar la plataforma SUNARP Digital',
    duration: '5:18',
    category: 'tutorial',
    featured: true
  },
  {
    id: 'W126RPE1zRg',
    title: 'Documentos Legales',
    description: 'Conoce los documentos legales necesarios para trámites en SUNARP',
    duration: '6:30',
    category: 'tutorial',
    featured: true
  },
  {
    id: '9jpAvZuso28',
    title: 'Trámites de Fallecimiento',
    description: 'Proceso para trámites relacionados con fallecimientos y sucesiones',
    duration: '7:45',
    category: 'tutorial',
    featured: true
  },
  {
    id: 'oYtl0ta1VD0',
    title: 'Trámites para Registrar',
    description: 'Guía completa para registrar documentos en SUNARP',
    duration: '8:20',
    category: 'tutorial',
    featured: true
  },
  {
    id: 'ohljY03cZpo',
    title: 'Organizaciones Sociales',
    description: 'Registro y gestión de organizaciones sociales y ONGs',
    duration: '9:15',
    category: 'tutorial',
    featured: true
  },
  {
    id: '9YxN6X5XRTA',
    title: 'Trámites de Propiedades',
    description: 'Todo sobre el registro y consulta de propiedades inmuebles',
    duration: '10:30',
    category: 'tutorial',
    featured: true
  },
  {
    id: 'KhrZxswC-uY',
    title: 'Trámites Vehiculares',
    description: 'Registro y transferencia de vehículos en SUNARP',
    duration: '8:45',
    category: 'tutorial',
    featured: true
  },
  {
    id: '6zjlWG-jZsg',
    title: 'Herramientas Digitales',
    description: 'Aprende a usar las herramientas digitales de SUNARP',
    duration: '6:20',
    category: 'tutorial',
    featured: true
  },
  {
    id: 'lIR2jZGTgGQ',
    title: 'Protege tus Derechos',
    description: 'Cómo proteger tus derechos mediante el registro público',
    duration: '7:10',
    category: 'tutorial',
    featured: true
  }
];

// ===== VIDEOS DE TESTIMONIOS =====
export const TESTIMONIAL_VIDEOS: VideoConfig[] = [
  // Videos de testimonios se agregarán cuando estén disponibles
];

// ===== VIDEOS DE EVENTOS =====
export const EVENT_VIDEOS: VideoConfig[] = [
  // Videos de eventos se agregarán cuando estén disponibles
];

// ===== VIDEOS PROMOCIONALES =====
export const PROMOTIONAL_VIDEOS: VideoConfig[] = [
  // Videos promocionales se agregarán cuando estén disponibles
];

// ===== TODOS LOS VIDEOS =====
export const ALL_VIDEOS: VideoConfig[] = [
  ...TUTORIAL_VIDEOS,
  ...TESTIMONIAL_VIDEOS,
  ...EVENT_VIDEOS,
  ...PROMOTIONAL_VIDEOS
];

// ===== FUNCIONES UTILITARIAS =====

/**
 * Obtiene videos por categoría
 */
export const getVideosByCategory = (category: VideoConfig['category']): VideoConfig[] => {
  return ALL_VIDEOS.filter(video => video.category === category);
};

/**
 * Obtiene videos destacados
 */
export const getFeaturedVideos = (): VideoConfig[] => {
  return ALL_VIDEOS.filter(video => video.featured);
};

/**
 * Obtiene un video por ID
 */
export const getVideoById = (id: string): VideoConfig | undefined => {
  return ALL_VIDEOS.find(video => video.id === id);
};

/**
 * Obtiene la URL de YouTube para un video
 */
export const getVideoUrl = (videoId: string, type: 'watch' | 'embed' | 'thumbnail' = 'watch'): string => {
  const baseUrls = {
    watch: 'https://www.youtube.com/watch?v=',
    embed: 'https://www.youtube.com/embed/',
    thumbnail: 'https://img.youtube.com/vi/'
  };

  switch (type) {
    case 'watch':
      return `${baseUrls.watch}${videoId}`;
    case 'embed':
      return `${baseUrls.embed}${videoId}?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=0`;
    case 'thumbnail':
      return `${baseUrls.thumbnail}${videoId}/maxresdefault.jpg`;
    default:
      return `${baseUrls.watch}${videoId}`;
  }
};

/**
 * Obtiene la URL de thumbnail personalizada si existe
 */
export const getVideoThumbnail = (video: VideoConfig): string => {
  return video.thumbnail || getVideoUrl(video.id, 'thumbnail');
};

// ===== CONFIGURACIÓN DE PLAYER =====
export const PLAYER_CONFIG = {
  // Configuración por defecto para iframes de YouTube
  defaultParams: {
    autoplay: 0,
    controls: 1,
    modestbranding: 1,
    rel: 0, // No mostrar videos relacionados
    showinfo: 0
  },
  
  // Tamaños de player
  sizes: {
    small: { width: 320, height: 180 },
    medium: { width: 640, height: 360 },
    large: { width: 1280, height: 720 }
  }
} as const;

/**
 * Genera la URL completa del iframe con parámetros
 */
export const getEmbedUrl = (videoId: string, params: Record<string, any> = {}): string => {
  const defaultParams = PLAYER_CONFIG.defaultParams;
  const allParams = { ...defaultParams, ...params };
  
  const queryString = Object.entries(allParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  
  return `${getVideoUrl(videoId, 'embed')}?${queryString}`;
};
