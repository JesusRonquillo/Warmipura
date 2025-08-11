import type { DownloadableResource } from '../types/resources';
import { S3Service } from '../services/S3Service';

// Datos de ejemplo para probar el visor de recursos
export const sampleResources: DownloadableResource[] = [
  {
    id: '1',
    name: 'Manual de Usuario SUNARP',
    type: 'pdf',
    url: S3Service.getFileUrl('pdfs/manual-sunarp.pdf'),
    size: '2.5 MB',
    description: 'Manual completo para el uso del sistema SUNARP',
    tags: ['manual', 'sunarp', 'usuario', 'guía'],
    downloadCount: 45,
    lastDownloaded: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Presentación del Proyecto',
    type: 'pdf',
    url: S3Service.getFileUrl('pdfs/presentacion-proyecto.pptx'),
    size: '8.2 MB',
    description: 'Presentación completa del proyecto WARMIPURA DIGITAL',
    tags: ['presentación', 'proyecto', 'warmipura', 'digital'],
    downloadCount: 23,
    lastDownloaded: new Date('2024-01-14')
  },
  {
    id: '3',
    name: 'Plan de Implementación',
    type: 'pdf',
    url: S3Service.getFileUrl('pdfs/plan-implementacion.pdf'),
    size: '1.8 MB',
    description: 'Plan detallado de implementación del sistema',
    tags: ['plan', 'implementación', 'sistema', 'detalles'],
    downloadCount: 67,
    lastDownloaded: new Date('2024-01-16')
  },
  {
    id: '4',
    name: 'Guía de Instalación',
    type: 'pdf',
    url: S3Service.getFileUrl('pdfs/guia-instalacion.pdf'),
    size: '3.1 MB',
    description: 'Guía paso a paso para la instalación',
    tags: ['guía', 'instalación', 'paso a paso', 'tutorial'],
    downloadCount: 89,
    lastDownloaded: new Date('2024-01-13')
  },
  {
    id: '5',
    name: 'Documento Técnico',
    type: 'document',
    url: S3Service.getFileUrl('pdfs/documento-tecnico.docx'),
    size: '4.7 MB',
    description: 'Documento técnico con especificaciones del sistema',
    tags: ['técnico', 'especificaciones', 'sistema', 'documentación'],
    downloadCount: 34,
    lastDownloaded: new Date('2024-01-12')
  },
  {
    id: '6',
    name: 'Video Tutorial Completo',
    type: 'video',
    url: S3Service.getFileUrl('videos/tutorial-completo.mp4'),
    size: '156.8 MB',
    description: 'Video tutorial completo del sistema',
    tags: ['video', 'tutorial', 'completo', 'sistema'],
    downloadCount: 123,
    lastDownloaded: new Date('2024-01-10')
  },
  {
    id: '7',
    name: 'Imágenes del Proyecto',
    type: 'image',
    url: S3Service.getFileUrl('images/proyecto/proyecto-imagenes.zip'),
    size: '45.2 MB',
    description: 'Archivo ZIP con todas las imágenes del proyecto',
    tags: ['imágenes', 'proyecto', 'archivo', 'zip'],
    downloadCount: 78,
    lastDownloaded: new Date('2024-01-09')
  }
];

// Tipos de recursos disponibles
export const resourceTypes = ['pdf', 'image', 'video', 'document'];

// Función para obtener recursos por tipo
export const getResourcesByType = (type: string): DownloadableResource[] => {
  if (type === 'all') return sampleResources;
  return sampleResources.filter(resource => resource.type === type);
};

// Función para buscar recursos
export const searchResources = (query: string): DownloadableResource[] => {
  const lowerQuery = query.toLowerCase();
  return sampleResources.filter(resource => 
    resource.name.toLowerCase().includes(lowerQuery) ||
    resource.description?.toLowerCase().includes(lowerQuery) ||
    resource.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

// Función para obtener recursos más descargados
export const getMostDownloadedResources = (limit: number = 5): DownloadableResource[] => {
  return [...sampleResources]
    .sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0))
    .slice(0, limit);
};

// Función para obtener recursos recientes
export const getRecentResources = (limit: number = 5): DownloadableResource[] => {
  return [...sampleResources]
    .sort((a, b) => new Date(b.lastDownloaded || 0).getTime() - new Date(a.lastDownloaded || 0).getTime())
    .slice(0, limit);
}; 