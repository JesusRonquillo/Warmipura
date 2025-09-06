// ===== DOCUMENTS CONFIGURATION =====
// Configuración de documentos PDF para el proyecto

export interface DocumentConfig {
  id: string;
  title: string;
  description: string;
  filename: string;
  category: 'tutorial' | 'guide' | 'legal' | 'reference';
  topicId?: string; // ID del tema relacionado
  featured?: boolean;
  size?: string; // Tamaño del archivo
}

// ===== DOCUMENTOS PDF DISPONIBLES =====
export const TUTORIAL_DOCUMENTS: DocumentConfig[] = [
  {
    id: 'que-es-sunarp',
    title: '¿Qué es la SUNARP?',
    description: 'Introducción completa a la Superintendencia Nacional de los Registros Públicos',
    filename: 'Qué es la SUNARP.pdf',
    category: 'tutorial',
    topicId: 'introduccion',
    featured: true,
    size: '2.1 MB'
  },
  {
    id: 'documentos-legales',
    title: 'Documentos Legales',
    description: 'Guía completa de documentos legales necesarios para trámites',
    filename: 'Documentos Legales.pdf',
    category: 'tutorial',
    topicId: 'documentos-legales',
    featured: true,
    size: '1.8 MB'
  },
  {
    id: 'tramites-fallecimiento',
    title: 'Trámites después del fallecimiento',
    description: 'Proceso completo para trámites relacionados con fallecimientos',
    filename: 'Trámites después del fallecimiento.pdf',
    category: 'tutorial',
    topicId: 'fallecimiento',
    featured: true,
    size: '2.3 MB'
  },
  {
    id: 'personas-juridicas',
    title: 'Personas Jurídicas y Empresas',
    description: 'Registro y gestión de personas jurídicas y empresas',
    filename: 'Personas Jurídicas y Empresas.pdf',
    category: 'tutorial',
    topicId: 'organizaciones-sociales',
    featured: true,
    size: '2.5 MB'
  },
  {
    id: 'tramites-propiedad',
    title: 'Trámites relacionados a la propiedad',
    description: 'Todo sobre el registro y consulta de propiedades inmuebles',
    filename: 'Trámites relacionados a la propiedad.pdf',
    category: 'tutorial',
    topicId: 'propiedades',
    featured: true,
    size: '2.0 MB'
  },
  {
    id: 'tramites-vehiculos',
    title: 'Trámites sobre vehículos',
    description: 'Registro y transferencia de vehículos en SUNARP',
    filename: 'Trámites sobre vehículos.pdf',
    category: 'tutorial',
    topicId: 'vehiculos',
    featured: true,
    size: '1.9 MB'
  },
  {
    id: 'herramientas-digitales',
    title: 'Herramientas Digitales - SUNARP',
    description: 'Guía para usar las herramientas digitales de SUNARP',
    filename: 'Herramientas Digitales - SUNARP.pdf',
    category: 'tutorial',
    topicId: 'herramientas-digitales',
    featured: true,
    size: '2.2 MB'
  },
  {
    id: 'derechos-propiedad',
    title: 'Derechos de Propiedad',
    description: 'Cómo proteger tus derechos mediante el registro público',
    filename: 'Derechos de Propiedad.pdf',
    category: 'tutorial',
    topicId: 'protege-derechos',
    featured: true,
    size: '1.7 MB'
  },
  {
    id: 'asociacion',
    title: 'Asociación',
    description: 'Guía para el registro de asociaciones',
    filename: '_Asociación .pdf',
    category: 'tutorial',
    topicId: 'organizaciones-sociales',
    featured: false,
    size: '1.5 MB'
  }
];

// ===== GUÍA DIGITAL (NO SE USA AÚN) =====
export const DIGITAL_GUIDE: DocumentConfig = {
  id: 'guia-digital',
  title: 'Guía Digital Warmipura ONG',
  description: 'Guía completa digital de Warmipura ONG',
  filename: 'GUÍA DIGITAL WARMIPURA ONG (5).pdf',
  category: 'guide',
  featured: false,
  size: '3.2 MB'
};

// ===== TODOS LOS DOCUMENTOS =====
export const ALL_DOCUMENTS: DocumentConfig[] = [
  ...TUTORIAL_DOCUMENTS,
  DIGITAL_GUIDE
];

// ===== FUNCIONES UTILITARIAS =====

/**
 * Obtiene documentos por categoría
 */
export const getDocumentsByCategory = (category: DocumentConfig['category']): DocumentConfig[] => {
  return ALL_DOCUMENTS.filter(doc => doc.category === category);
};

/**
 * Obtiene documentos destacados
 */
export const getFeaturedDocuments = (): DocumentConfig[] => {
  return ALL_DOCUMENTS.filter(doc => doc.featured);
};

/**
 * Obtiene un documento por ID
 */
export const getDocumentById = (id: string): DocumentConfig | undefined => {
  return ALL_DOCUMENTS.find(doc => doc.id === id);
};

/**
 * Obtiene documentos por tema
 */
export const getDocumentsByTopic = (topicId: string): DocumentConfig[] => {
  return TUTORIAL_DOCUMENTS.filter(doc => doc.topicId === topicId);
};

/**
 * Obtiene la ruta del documento
 */
export const getDocumentPath = (filename: string): string => {
  return `/documents/pdfs/${filename}`;
};

/**
 * Obtiene la URL pública del documento (para descarga)
 */
export const getDocumentUrl = (filename: string): string => {
  return `/documents/pdfs/${filename}`;
};
