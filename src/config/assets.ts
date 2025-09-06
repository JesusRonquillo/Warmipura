// ===== ASSETS CONFIGURATION =====
// Centralización de rutas de assets para facilitar mantenimiento

// ===== LOGOS =====
export const LOGOS = {
  // ONG Warmipura
  ong: {
    primary: '/src/assets/logo/ong/Logotipo principal.svg',
    secondary: '/src/assets/logo/ong/Logotipo secundario .svg',
    withSlogan: '/src/assets/logo/ong/Logotipo con slogan.svg',
    typographic: '/src/assets/logo/ong/Logo tipográfico.svg',
    abbreviation: '/src/assets/logo/ong/Abreviatura.svg'
  },
  // Warmipura Digital
  digital: {
    primary: '/src/assets/logo/digital/Logotipo Principal SVG.svg',
    secondary: '/src/assets/logo/digital/Logotipo secundario SVG.svg',
    imagotype: '/src/assets/logo/digital/Imagotipo secundario SVG.svg'
  }
} as const;

// ===== ICONS =====
export const ICONS = {
  puma: {
    happy: '/src/assets/icons/Personaje/Feliz.svg',
    neutral: '/src/assets/icons/Personaje/Neutral.svg',
    doubt: '/src/assets/icons/Personaje/Duda Asombro.svg',
    idea: '/src/assets/icons/Personaje/Tengo una idea.svg',
    fullColor: '/src/assets/icons/Personaje/Carita de puma full color.svg'
  }
} as const;

// ===== IMAGES =====
export const IMAGES = {
  gallery: '/src/assets/gallery/',
  team: '/src/assets/team/',
  projects: '/src/assets/projects/'
} as const;

// ===== DOCUMENTS =====
export const DOCUMENTS = {
  pdfs: '/src/assets/documents/pdfs/',
  resources: '/src/assets/documents/resources/'
} as const;

// ===== VIDEOS =====
export const VIDEOS = {
  local: '/src/assets/videos/',
  // Los videos se alojarán en YouTube
  youtube: {
    baseUrl: 'https://www.youtube.com/watch?v=',
    embedUrl: 'https://www.youtube.com/embed/',
    thumbnailUrl: 'https://img.youtube.com/vi/'
  }
} as const;

// ===== UTILITY FUNCTIONS =====

/**
 * Genera la URL completa de una imagen
 */
export const getImageUrl = (category: keyof typeof IMAGES, filename: string): string => {
  return `${IMAGES[category]}${filename}`;
};

/**
 * Genera la URL de un documento
 */
export const getDocumentUrl = (category: keyof typeof DOCUMENTS, filename: string): string => {
  return `${DOCUMENTS[category]}${filename}`;
};

/**
 * Genera la URL de un video de YouTube
 */
export const getYouTubeUrl = (videoId: string, type: 'watch' | 'embed' | 'thumbnail' = 'watch'): string => {
  switch (type) {
    case 'watch':
      return `${VIDEOS.youtube.baseUrl}${videoId}`;
    case 'embed':
      return `${VIDEOS.youtube.embedUrl}${videoId}`;
    case 'thumbnail':
      return `${VIDEOS.youtube.thumbnailUrl}${videoId}/maxresdefault.jpg`;
    default:
      return `${VIDEOS.youtube.baseUrl}${videoId}`;
  }
};

/**
 * Genera la URL de un video local
 */
export const getLocalVideoUrl = (filename: string): string => {
  return `${VIDEOS.local}${filename}`;
};

// ===== ASSET VALIDATION =====

/**
 * Valida si una ruta de asset existe
 */
export const validateAssetPath = (path: string): boolean => {
  // Esta función se puede expandir para validar archivos reales
  return path.startsWith('/src/assets/');
};

// ===== COMMON ASSET PATHS =====
export const COMMON_ASSETS = {
  // Logos más usados
  logoOngSecondary: LOGOS.ong.secondary,
  logoOngWithSlogan: LOGOS.ong.withSlogan,
  logoDigitalPrimary: LOGOS.digital.primary,
  
  // Iconos más usados
  pumaHappy: ICONS.puma.happy,
  pumaFullColor: ICONS.puma.fullColor,
  
  // Rutas de carpetas
  galleryPath: IMAGES.gallery,
  teamPath: IMAGES.team,
  projectsPath: IMAGES.projects,
  pdfsPath: DOCUMENTS.pdfs,
  resourcesPath: DOCUMENTS.resources
} as const;
