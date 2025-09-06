import type { DownloadableResource } from '../types/resources';

// Recursos de ejemplo usando assets locales
export const sampleResources: DownloadableResource[] = [
  // Los recursos se agregarán cuando estén disponibles en la carpeta de assets
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