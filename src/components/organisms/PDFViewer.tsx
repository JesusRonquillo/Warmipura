import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { AppIcon } from '../atoms/AppIcon';
import { getDocumentUrl } from '../../config/documents';
import type { DocumentConfig } from '../../config/documents';

interface PDFViewerProps {
  document: DocumentConfig;
  onClose: () => void;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ document, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleDownload = () => {
    const link = window.document.createElement('a');
    link.href = getDocumentUrl(document.filename);
    link.download = document.filename;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <AppIcon icon="lucide:file-text" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{document.title}</h2>
              <p className="text-sm text-gray-600">{document.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleDownload}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <AppIcon icon="lucide:download" className="w-4 h-4" />
              <span>Descargar</span>
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <AppIcon icon="lucide:x" className="w-4 h-4" />
              <span>Cerrar</span>
            </Button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando documento...</p>
              </div>
            </div>
          )}

          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <AppIcon icon="lucide:alert-circle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar el PDF</h3>
                <p className="text-gray-600 mb-4">No se pudo cargar el documento. Intenta descargarlo.</p>
                <Button
                  onClick={handleDownload}
                  variant="primary"
                  className="bg-red-500 hover:bg-red-600"
                >
                  <AppIcon icon="lucide:download" className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
              </div>
            </div>
          ) : (
            <iframe
              src={`${getDocumentUrl(document.filename)}#toolbar=1&navpanes=1&scrollbar=1`}
              className="w-full h-full border-0"
              title={document.title}
              onLoad={handleLoad}
              onError={handleError}
            />
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <AppIcon icon="lucide:file-text" className="w-4 h-4" />
                <span>PDF Document</span>
              </span>
              {document.size && (
                <span className="flex items-center space-x-1">
                  <AppIcon icon="lucide:hard-drive" className="w-4 h-4" />
                  <span>{document.size}</span>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <AppIcon icon="lucide:eye" className="w-4 h-4" />
              <span>Vista previa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
