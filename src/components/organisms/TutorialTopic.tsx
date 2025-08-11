import React from 'react';
import { Button } from '../atoms/Button';
import { AppIcon } from '../atoms/AppIcon';

interface TutorialTopicProps {
  title: string;
  description: string;
  videoUrl?: string;
  videoDuration?: string;
  infographicContent?: string[];
  pdfUrl?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  onBackToSyllabus?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export const TutorialTopic: React.FC<TutorialTopicProps> = ({
  title,
  description,
  videoUrl,
  videoDuration = '5:18',
  infographicContent = [],
  pdfUrl,
  onPrevious,
  onNext,
  onBackToSyllabus,
  hasPrevious = true,
  hasNext = true
}) => {
  const currentTime = '0:00';

  return (
    <div className="min-h-screen bg-gradient-to-br from-digital-primary/5 via-white to-digital-primary/5 pt-20">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Navigation Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-digital-primary p-4 mb-8">
          <div className="flex items-center justify-between">
            <Button
              onClick={onBackToSyllabus}
              variant="outline"
              size="sm"
              className="bg-white/80 border-digital-primary text-digital-primary hover:bg-digital-primary/10 hover:border-digital-primary transition-all duration-300"
            >
              ← Volver al Syllabus
            </Button>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={onPrevious}
                disabled={!hasPrevious}
                variant="outline"
                size="sm"
                className="bg-white/80 border-digital-primary text-digital-primary hover:bg-digital-primary/10 hover:border-digital-primary transition-all duration-300 disabled:opacity-50"
              >
                <AppIcon icon="lucide:chevron-left" className="w-4 h-4 mr-2" />
                Anterior
              </Button>
              <Button
                onClick={onNext}
                disabled={!hasNext}
                variant="outline"
                size="sm"
                className="bg-white/80 border-digital-primary text-digital-primary hover:bg-digital-primary/10 hover:border-digital-primary transition-all duration-300 disabled:opacity-50"
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-digital-primary p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-digital-primary to-digital-primary rounded-full flex items-center justify-center">
                  <AppIcon icon="lucide:book-open" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-digital-primary">
                    {title}
                  </h1>
                  <p className="text-digital-primary font-semibold">Tutorial Interactivo</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
            </div>

            {/* Video Tutorial */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-digital-primary p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-digital-primary to-digital-primary rounded-full flex items-center justify-center">
                  <AppIcon icon="lucide:play" className="w-5 h-5 text-white ml-0.5" />
                </div>
                <h2 className="text-2xl font-bold text-digital-primary">Video Tutorial</h2>
              </div>
              
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden aspect-video shadow-2xl">
                {videoUrl ? (
                  <video 
                    className="w-full h-full object-cover"
                    controls
                    onPlay={() => {}}
                    onPause={() => {}}
                  >
                    <source src={videoUrl} type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                  </video>
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
                
                {/* Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6">
                  <div className="flex items-center justify-between text-white">
                    <span className="font-semibold">{currentTime} / {videoDuration}</span>
                    <div className="flex items-center space-x-3">
                      <button className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200">
                        <AppIcon icon="lucide:file-text" className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200">
                        <div className="w-5 h-5 border-2 border-white rounded"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Infographic */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-digital-primary p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-digital-primary to-digital-primary rounded-full flex items-center justify-center">
                  <AppIcon icon="lucide:file-text" className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-digital-primary">Infografía</h2>
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-digital-primary p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-digital-primary to-digital-primary rounded-full flex items-center justify-center">
                  <AppIcon icon="lucide:download" className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-digital-primary">Descargar Material</h3>
              </div>
              
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    if (pdfUrl) {
                      window.open(pdfUrl, '_blank');
                    }
                  }}
                  variant="outline"
                  size="lg"
                  className="w-full bg-white/80 border-digital-primary text-digital-primary hover:bg-digital-primary/10 hover:border-digital-primary transition-all duration-300"
                  disabled={!pdfUrl}
                >
                  <AppIcon icon="lucide:download" className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full bg-white/80 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                >
                  <AppIcon icon="lucide:file-text" className="w-4 h-4 mr-2" />
                  Guía Completa
                </Button>
              </div>
            </div>

            {/* Progress Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-digital-primary p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-digital-primary to-digital-primary rounded-full flex items-center justify-center">
                  <AppIcon icon="lucide:check" className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-digital-primary">Progreso del Tema</h3>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-digital-primary mb-2">Tema Actual</div>
                  <div className="text-sm text-gray-600">Completando este tutorial</div>
                </div>
                
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-digital-primary to-digital-primary h-full rounded-full transition-all duration-500" style={{ width: '25%' }} />
                </div>
                
                <div className="text-center text-sm text-gray-600">
                  25% completado
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-digital-primary p-6">
              <h3 className="text-xl font-bold text-digital-primary mb-4">Acciones Rápidas</h3>
              
              <div className="space-y-3">
                <Button
                  onClick={onPrevious}
                  disabled={!hasPrevious}
                  variant="outline"
                  size="sm"
                  className="w-full bg-white/80 border-digital-primary text-digital-primary hover:bg-digital-primary/10 hover:border-digital-primary transition-all duration-300 disabled:opacity-50"
                >
                  <AppIcon icon="lucide:chevron-left" className="w-4 h-4 mr-2" />
                  Tema Anterior
                </Button>
                
                <Button
                  onClick={onNext}
                  disabled={!hasNext}
                  variant="primary"
                  size="sm"
                  className="w-full bg-gradient-to-r from-digital-primary to-digital-primary hover:from-digital-primary hover:to-digital-primary shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  Siguiente Tema
                  <AppIcon icon="lucide:chevron-right" className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 