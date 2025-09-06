// ===== RESOURCES CONFIGURATION =====
// Configuración de recursos y documentos para el proyecto

export interface ResourceConfig {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'link' | 'image';
  category: 'tutorial' | 'manual' | 'guia' | 'formulario' | 'legal' | 'promocional';
  filename?: string; // Para archivos locales
  url?: string; // Para enlaces externos
  videoId?: string; // Para videos de YouTube
  size?: string; // Tamaño del archivo
  featured?: boolean;
  downloadCount?: number;
  lastUpdated?: string;
}

// ===== RECURSOS PRINCIPALES =====
export const MAIN_RESOURCES: ResourceConfig[] = [
  {
    id: 'manual-alfabetizacion-digital',
    title: 'Manual de Alfabetización Digital',
    description: 'Guía completa para aprender conceptos básicos de alfabetización digital',
    type: 'pdf',
    category: 'manual',
    filename: 'manual-alfabetizacion-digital.pdf',
    size: '2.5 MB',
    featured: true,
    downloadCount: 150,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'guia-sunarp-digital',
    title: 'Guía de SUNARP Digital',
    description: 'Tutorial paso a paso para usar la plataforma SUNARP Digital',
    type: 'pdf',
    category: 'guia',
    filename: 'guia-sunarp-digital.pdf',
    size: '1.8 MB',
    featured: true,
    downloadCount: 89,
    lastUpdated: '2024-01-10'
  },
  {
    id: 'formulario-inscripcion',
    title: 'Formulario de Inscripción',
    description: 'Formulario para inscribirse en nuestros talleres y programas',
    type: 'pdf',
    category: 'formulario',
    filename: 'formulario-inscripcion.pdf',
    size: '500 KB',
    featured: false,
    downloadCount: 45,
    lastUpdated: '2024-01-05'
  },
  {
    id: 'video-intro-alfabetizacion',
    title: 'Introducción a la Alfabetización Digital',
    description: 'Video explicativo sobre los conceptos básicos de alfabetización digital',
    type: 'video',
    category: 'tutorial',
    videoId: 'ejemplo-video-1',
    featured: true,
    downloadCount: 200,
    lastUpdated: '2024-01-20'
  },
  {
    id: 'video-sunarp-tutorial',
    title: 'Tutorial SUNARP Digital',
    description: 'Video tutorial completo para usar SUNARP Digital',
    type: 'video',
    category: 'tutorial',
    videoId: 'ejemplo-video-2',
    featured: true,
    downloadCount: 120,
    lastUpdated: '2024-01-18'
  }
];

// ===== RECURSOS POR CATEGORÍA =====
export const TUTORIAL_RESOURCES: ResourceConfig[] = [
  {
    id: 'tutorial-seguridad-internet',
    title: 'Seguridad en Internet',
    description: 'Consejos y mejores prácticas para navegar seguro en internet',
    type: 'pdf',
    category: 'tutorial',
    filename: 'tutorial-seguridad-internet.pdf',
    size: '1.2 MB',
    featured: false,
    downloadCount: 67,
    lastUpdated: '2024-01-12'
  },
  {
    id: 'tutorial-redes-sociales',
    title: 'Uso de Redes Sociales',
    description: 'Guía para usar redes sociales de manera segura y efectiva',
    type: 'pdf',
    category: 'tutorial',
    filename: 'tutorial-redes-sociales.pdf',
    size: '980 KB',
    featured: false,
    downloadCount: 43,
    lastUpdated: '2024-01-08'
  }
];

export const MANUAL_RESOURCES: ResourceConfig[] = [
  {
    id: 'manual-computacion-basica',
    title: 'Computación Básica',
    description: 'Manual introductorio para el uso de computadoras',
    type: 'pdf',
    category: 'manual',
    filename: 'manual-computacion-basica.pdf',
    size: '3.1 MB',
    featured: false,
    downloadCount: 78,
    lastUpdated: '2024-01-14'
  },
  {
    id: 'manual-smartphone-basico',
    title: 'Uso Básico de Smartphone',
    description: 'Guía para usar smartphones y aplicaciones básicas',
    type: 'pdf',
    category: 'manual',
    filename: 'manual-smartphone-basico.pdf',
    size: '2.2 MB',
    featured: false,
    downloadCount: 56,
    lastUpdated: '2024-01-11'
  }
];

export const LEGAL_RESOURCES: ResourceConfig[] = [
  {
    id: 'politica-privacidad',
    title: 'Política de Privacidad',
    description: 'Política de privacidad y protección de datos personales',
    type: 'pdf',
    category: 'legal',
    filename: 'politica-privacidad.pdf',
    size: '800 KB',
    featured: false,
    downloadCount: 12,
    lastUpdated: '2024-01-03'
  },
  {
    id: 'terminos-condiciones',
    title: 'Términos y Condiciones',
    description: 'Términos y condiciones de uso de nuestros servicios',
    type: 'pdf',
    category: 'legal',
    filename: 'terminos-condiciones.pdf',
    size: '650 KB',
    featured: false,
    downloadCount: 8,
    lastUpdated: '2024-01-03'
  }
];

// ===== TODOS LOS RECURSOS =====
export const ALL_RESOURCES: ResourceConfig[] = [
  ...MAIN_RESOURCES,
  ...TUTORIAL_RESOURCES,
  ...MANUAL_RESOURCES,
  ...LEGAL_RESOURCES
];

// ===== FUNCIONES UTILITARIAS =====

/**
 * Obtiene recursos por categoría
 */
export const getResourcesByCategory = (category: ResourceConfig['category']): ResourceConfig[] => {
  return ALL_RESOURCES.filter(resource => resource.category === category);
};

/**
 * Obtiene recursos por tipo
 */
export const getResourcesByType = (type: ResourceConfig['type']): ResourceConfig[] => {
  return ALL_RESOURCES.filter(resource => resource.type === type);
};

/**
 * Obtiene recursos destacados
 */
export const getFeaturedResources = (): ResourceConfig[] => {
  return ALL_RESOURCES.filter(resource => resource.featured);
};

/**
 * Obtiene un recurso por ID
 */
export const getResourceById = (id: string): ResourceConfig | undefined => {
  return ALL_RESOURCES.find(resource => resource.id === id);
};

/**
 * Obtiene la URL de descarga de un recurso
 */
export const getResourceUrl = (resource: ResourceConfig): string => {
  if (resource.type === 'pdf' && resource.filename) {
    return `/src/assets/documents/pdfs/${resource.filename}`;
  }
  if (resource.type === 'video' && resource.videoId) {
    return `https://www.youtube.com/watch?v=${resource.videoId}`;
  }
  if (resource.url) {
    return resource.url;
  }
  return '#';
};

/**
 * Obtiene la URL de thumbnail para videos
 */
export const getVideoThumbnailUrl = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

/**
 * Obtiene el icono apropiado para cada tipo de recurso
 */
export const getResourceIcon = (type: ResourceConfig['type']): string => {
  const icons = {
    pdf: 'lucide:file-text',
    video: 'lucide:play-circle',
    link: 'lucide:external-link',
    image: 'lucide:image'
  };
  return icons[type] || 'lucide:file';
};

/**
 * Obtiene el color apropiado para cada categoría
 */
export const getCategoryColor = (category: ResourceConfig['category']): string => {
  const colors = {
    tutorial: 'bg-blue-100 text-blue-800',
    manual: 'bg-green-100 text-green-800',
    guia: 'bg-purple-100 text-purple-800',
    formulario: 'bg-orange-100 text-orange-800',
    legal: 'bg-gray-100 text-gray-800',
    promocional: 'bg-pink-100 text-pink-800'
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

/**
 * Formatea el tamaño del archivo para mostrar
 */
export const formatFileSize = (size: string): string => {
  return size;
};

/**
 * Formatea la fecha de última actualización
 */
export const formatLastUpdated = (date: string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
