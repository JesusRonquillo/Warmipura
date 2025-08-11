import React, { useState, useMemo } from 'react';
import { Download, FileText, Image, Video, File, Search, Filter, Grid, List } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { DownloadableResource } from '../../types/resources';

interface ResourceViewerProps {
  resources: DownloadableResource[];
  onDownload?: (resource: DownloadableResource) => void;
}

const ResourceViewer: React.FC<ResourceViewerProps> = ({ resources, onDownload }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredResources = useMemo(() => {
    let filtered = resources;

    // Filtrar por tipo
    if (selectedType !== 'all') {
      filtered = filtered.filter(resource => resource.type === selectedType);
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource =>
        resource.name.toLowerCase().includes(query) ||
        resource.description?.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [resources, searchQuery, selectedType]);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-500" />;
      case 'image':
        return <Image className="w-6 h-6 text-blue-500" />;
      case 'video':
        return <Video className="w-6 h-6 text-purple-500" />;
      default:
        return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  const getResourceTypeLabel = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'PDF';
      case 'image':
        return 'Imagen';
      case 'video':
        return 'Video';
      case 'document':
        return 'Documento';
      default:
        return type.toUpperCase();
    }
  };

  const handleDownload = (resource: DownloadableResource) => {
    if (onDownload) {
      onDownload(resource);
    } else {
      window.open(resource.url, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar recursos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ong-primary focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ong-primary focus:border-transparent transition-all duration-200"
            >
              <option value="all">Todos los tipos</option>
              <option value="pdf">PDFs</option>
              <option value="image">Imágenes</option>
              <option value="video">Videos</option>
              <option value="document">Documentos</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2 rounded-md transition-all duration-200',
                viewMode === 'grid' ? 'bg-white text-ong-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 rounded-md transition-all duration-200',
                viewMode === 'list' ? 'bg-white text-ong-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center">
        <p className="text-gray-600">
          {filteredResources.length} recurso{filteredResources.length !== 1 ? 's' : ''} encontrado{filteredResources.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Resources Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  {getResourceIcon(resource.type)}
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    {getResourceTypeLabel(resource.type)}
                  </span>
                </div>
                
                <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
                  {resource.name}
                </h3>
                
                {resource.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-ong-primary/10 text-ong-primary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {resource.size && <span>{resource.size}</span>}
                    {resource.downloadCount && (
                      <span className="ml-2">• {resource.downloadCount} descargas</span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleDownload(resource)}
                    className="flex items-center gap-2 px-4 py-2 bg-ong-primary text-white rounded-lg hover:bg-[#e86f25] transition-all duration-200 hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    Descargar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {getResourceIcon(resource.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800 text-lg truncate">
                      {resource.name}
                    </h3>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      {getResourceTypeLabel(resource.type)}
                    </span>
                  </div>
                  
                  {resource.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {resource.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {resource.size && <span>{resource.size}</span>}
                    {resource.downloadCount && (
                      <span>{resource.downloadCount} descargas</span>
                    )}
                    {resource.lastDownloaded && (
                      <span>Última descarga: {resource.lastDownloaded.toLocaleDateString()}</span>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <button
                    onClick={() => handleDownload(resource)}
                    className="flex items-center gap-2 px-4 py-2 bg-ong-primary text-white rounded-lg hover:bg-[#e86f25] transition-all duration-200 hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    Descargar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron recursos</h3>
          <p className="text-gray-500">
            Intenta ajustar los filtros o la búsqueda para encontrar lo que buscas.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResourceViewer; 