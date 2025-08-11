export interface ImageResource {
  id: string;
  src: string;
  alt: string;
  title: string;
  description?: string;
  category: 'hero' | 'gallery' | 'team' | 'content';
  tags: string[];
  width?: number;
  height?: number;
  size?: string;
  uploadedAt?: Date;
}

export interface DocumentResource {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'ppt' | 'pptx';
  url: string;
  size: string;
  description?: string;
  tags: string[];
  uploadedAt?: Date;
}

export interface VideoResource {
  id: string;
  title: string;
  description?: string;
  youtubeUrl?: string;
  thumbnailUrl?: string;
  duration?: string;
  tags: string[];
  uploadedAt?: Date;
}

export type ResourceType = ImageResource | DocumentResource | VideoResource;

// Tipos para la galería
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  title: string;
  description?: string;
  tags: string[];
  thumbnailSrc?: string;
  fullSizeSrc?: string;
}

// Tipos para recursos descargables
export interface DownloadableResource {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'video' | 'document';
  url: string;
  size?: string;
  description?: string;
  tags: string[];
  downloadCount?: number;
  lastDownloaded?: Date;
} 