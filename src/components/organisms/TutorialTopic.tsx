import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { AppIcon } from '../atoms/AppIcon';
import { PDFViewer } from './PDFViewer';
import { getDocumentsByTopic, getDocumentUrl } from '../../config/documents';

interface TutorialTopicProps {
  title: string;
  description: string;
  videoUrl?: string;
  videoDuration?: string;
  infographicContent?: string[];
  pdfUrl?: string;
  topicId?: string; // ID del tema para obtener documentos relacionados
  onPrevious?: () => void;
  onNext?: () => void;
  onBackToSyllabus?: () => void;
  onComplete?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  isCompleted?: boolean;
}

export const TutorialTopic: React.FC<TutorialTopicProps> = ({
  title,
  description,
  videoUrl,
  videoDuration = '5:18',
  infographicContent = [],
  // pdfUrl,
  topicId,
  onPrevious,
  onNext,
  onBackToSyllabus,
  onComplete,
  hasPrevious = true,
  hasNext = true,
  isCompleted = false
}) => {
  // const currentTime = '0:00';
  const [selectedPDF, setSelectedPDF] = useState<any>(null);
  
  // Obtener documentos relacionados con el tema
  const relatedDocuments = topicId ? getDocumentsByTopic(topicId) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Navigation Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-300 p-4 mb-8">
          <div className="flex items-center justify-between">
            <Button
              onClick={onBackToSyllabus}
              variant="outline"
              size="sm"
              className="bg-white/80 border-slate-600 text-slate-700 hover:bg-gray-50 hover:border-slate-600 transition-all duration-300"
            >
              ← Volver al Syllabus
            </Button>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={onPrevious}
                disabled={!hasPrevious}
                variant="outline"
                size="sm"
                className="bg-white/80 border-slate-600 text-slate-700 hover:bg-gray-50 hover:border-slate-600 transition-all duration-300 disabled:opacity-50"
              >
                <AppIcon icon="lucide:chevron-left" className="w-4 h-4 mr-2" />
                Anterior
              </Button>
              <Button
                onClick={onNext}
                disabled={!hasNext}
                variant="outline"
                size="sm"
                className="bg-white/80 border-slate-600 text-slate-700 hover:bg-gray-50 hover:border-slate-600 transition-all duration-300 disabled:opacity-50"
              >
                Siguiente
                <AppIcon icon="lucide:chevron-right" className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Description */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-300 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                  <AppIcon icon="lucide:book-open" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">
                    {title}
                  </h1>
                  <p className="text-slate-600 font-semibold">Tutorial Interactivo</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
            </div>

            {/* Video Tutorial */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-300 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                  <AppIcon icon="lucide:play" className="w-5 h-5 text-white ml-0.5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Video Tutorial</h2>
              </div>
              
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden aspect-video shadow-2xl">
                {videoUrl ? (
                  <>
                    <iframe
                      className="w-full h-full"
                      src={videoUrl}
                      title="Video Tutorial"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                    {/* Overlay para marcar como completado */}
                    {!isCompleted && onComplete && (
                      <div className="absolute bottom-4 right-4">
                        <Button
                          onClick={onComplete}
                          variant="primary"
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
                        >
                          <AppIcon icon="lucide:check-circle" className="w-4 h-4 mr-2" />
                          Marcar como Completado
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <AppIcon icon="lucide:play" className="w-10 h-10 text-white ml-1" />
                      </div>
                      <p className="text-white/90 text-lg font-semibold mb-2">Video tutorial disponible</p>
                      <p className="text-white/70">Duración: {videoDuration}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Infographic */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-300 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                  <AppIcon icon="lucide:file-text" className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Infografía</h2>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                {infographicContent.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {infographicContent.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-white/80 rounded-lg border border-blue-200 hover:bg-white transition-colors duration-200">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AppIcon icon="lucide:file-text" className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-gray-600">Infografía disponible próximamente</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Download Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-300 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                  <AppIcon icon="lucide:download" className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Descargar Material</h3>
              </div>
              
              <div className="space-y-3">
                {relatedDocuments.length > 0 ? (
                  relatedDocuments.map((doc) => (
                    <div key={doc.id} className="space-y-2">
                      <Button
                        onClick={() => {
                          const link = window.document.createElement('a');
                          link.href = getDocumentUrl(doc.filename);
                          link.download = doc.filename;
                          window.document.body.appendChild(link);
                          link.click();
                          window.document.body.removeChild(link);
                        }}
                        variant="outline"
                        size="lg"
                        className="w-full bg-white/80 border-slate-600 text-slate-700 hover:bg-gray-50 hover:border-slate-600 transition-all duration-300"
                      >
                        <AppIcon icon="lucide:download" className="w-4 h-4 mr-2" />
                        Descargar {doc.title}
                      </Button>
                      
                      <Button
                        onClick={() => setSelectedPDF(doc)}
                        variant="outline"
                        size="lg"
                        className="w-full bg-white/80 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                      >
                        <AppIcon icon="lucide:eye" className="w-4 h-4 mr-2" />
                        Ver {doc.title}
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    <AppIcon icon="lucide:file-x" className="w-8 h-8 mx-auto mb-2" />
                    <p>No hay documentos disponibles para este tema</p>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-300 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-gradient-to-r from-green-500 to-green-600' 
                    : 'bg-gradient-to-r from-slate-600 to-slate-700'
                }`}>
                  <AppIcon 
                    icon={isCompleted ? "lucide:check" : "lucide:play"} 
                    className="w-5 h-5 text-white" 
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  {isCompleted ? 'Tema Completado' : 'Progreso del Tema'}
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800 mb-2">
                    {isCompleted ? '¡Completado!' : 'Tema Actual'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {isCompleted ? 'Has completado este tutorial' : 'Completando este tutorial'}
                  </div>
                </div>
                
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCompleted 
                        ? 'bg-gradient-to-r from-green-500 to-green-600' 
                        : 'bg-gradient-to-r from-slate-600 to-slate-700'
                    }`} 
                    style={{ width: isCompleted ? '100%' : '25%' }} 
                  />
                </div>
                
                <div className="text-center text-sm text-gray-600">
                  {isCompleted ? '100% completado' : '25% completado'}
                </div>

                {!isCompleted && onComplete && (
                  <Button
                    onClick={onComplete}
                    variant="primary"
                    size="sm"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <AppIcon icon="lucide:check-circle" className="w-4 h-4 mr-2" />
                    Marcar como Completado
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-300 p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Acciones Rápidas</h3>
              
              <div className="space-y-3">
                <Button
                  onClick={onPrevious}
                  disabled={!hasPrevious}
                  variant="outline"
                  size="sm"
                  className="w-full bg-white/80 border-slate-600 text-slate-700 hover:bg-gray-50 hover:border-slate-600 transition-all duration-300 disabled:opacity-50"
                >
                  <AppIcon icon="lucide:chevron-left" className="w-4 h-4 mr-2" />
                  Tema Anterior
                </Button>
                
                <Button
                  onClick={onNext}
                  disabled={!hasNext}
                  variant="primary"
                  size="sm"
                  className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  Siguiente Tema
                  <AppIcon icon="lucide:chevron-right" className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* PDF Viewer Modal */}
      {selectedPDF && (
        <PDFViewer
          document={selectedPDF}
          onClose={() => setSelectedPDF(null)}
        />
      )}
    </div>
  );
}; 