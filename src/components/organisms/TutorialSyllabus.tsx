import React from 'react';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { cn } from '../../utils';
import { AppIcon } from '../atoms/AppIcon';
// import { CourseProgress } from '../atoms/CourseProgress';
import { TUTORIAL_VIDEOS } from '../../config/videos';

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string; // Iconify icon name
  duration: string;
  isCompleted?: boolean;
  isActive?: boolean;
}

interface TutorialSyllabusProps {
  topics: Topic[];
  onTopicSelect: (topicId: string) => void;
  onVideosClick?: () => void;
  progress?: any;
  onClearProgress?: () => void;
}

export const TutorialSyllabus: React.FC<TutorialSyllabusProps> = ({
  topics,
  onTopicSelect,
  onVideosClick,
  progress,
  onClearProgress,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 lg:gap-3 bg-white/80 backdrop-blur-sm rounded-full px-4 lg:px-6 py-2 lg:py-3 mb-6 lg:mb-8 shadow-lg border border-gray-300">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
              <AppIcon icon="lucide:book-open" className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
            </div>
            <span className="text-slate-700 font-semibold text-sm lg:text-base">Tutorial Interactivo</span>
          </div>
          
                     <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-800 mb-4 lg:mb-6">
             Tutorial SUNARP
           </h1>
          <p className="text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Aprende paso a paso todos los procesos de la Superintendencia Nacional de los Registros Públicos
          </p>
          
          {/* Botón para acceder a videos */}
          {onVideosClick && (
            <div className="mt-8">
              <Button
                onClick={onVideosClick}
                variant="primary"
                className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <AppIcon icon="lucide:play-circle" className="w-6 h-6 mr-3" />
                Ver Videos del Curso
              </Button>
            </div>
          )}
        </div>

        {/* Progress Overview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-gray-300 p-6 lg:p-8 mb-12 lg:mb-16 max-w-5xl mx-auto relative">
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Tu Progreso</h2>
          </div>
          
          {/* Botón de limpiar en esquina superior derecha */}
          {onClearProgress && (
            <button
              onClick={() => {
                if (confirm('¿Estás seguro de que quieres limpiar todo el progreso guardado?')) {
                  onClearProgress();
                  alert('Progreso limpiado correctamente');
                }
              }}
              className="absolute top-4 right-4 text-red-500 hover:text-red-600 text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
              title="Limpiar Progreso"
            >
              <AppIcon icon="lucide:trash-2" className="w-4 h-4" />
              <span>Limpiar</span>
            </button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center group">
              <div className="relative">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl lg:text-2xl font-bold text-white">
                    {progress?.completedTopics || 0}/{progress?.totalTopics || topics.length}
                  </span>
                </div>
                <div className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 w-5 h-5 lg:w-6 lg:h-6 bg-slate-700 rounded-full flex items-center justify-center">
                  <AppIcon icon="lucide:check" className="w-3 h-3 lg:w-4 lg:w-4 text-white" />
                </div>
              </div>
              <div className="text-gray-700 font-semibold text-sm lg:text-base">Temas completados</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl lg:text-2xl font-bold text-white">
                  {TUTORIAL_VIDEOS.reduce((acc, video) => {
                    const [minutes, seconds] = video.duration.split(':').map(Number);
                    return acc + minutes + (seconds / 60);
                  }, 0).toFixed(0)}min
                </span>
              </div>
              <div className="text-gray-700 font-semibold text-sm lg:text-base">Duración total</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl lg:text-2xl font-bold text-white">
                  {progress?.topicProgressPercentage || 0}%
                </span>
              </div>
              <div className="text-gray-700 font-semibold text-sm lg:text-base">Progreso</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6 lg:mt-8">
            <div className="bg-gray-200 rounded-full h-2 lg:h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-slate-600 to-slate-700 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress?.topicProgressPercentage || 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {topics.map((topic, index) => (
            <Card
              key={topic.id}
              variant="outlined"
              className={cn(
                'p-6 lg:p-8 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 border-2 group relative overflow-hidden',
                                 topic.isActive 
                   ? 'border-slate-600 bg-gradient-to-br from-gray-100 to-white shadow-xl' 
                   : 'border-gray-200 bg-white/80 backdrop-blur-sm hover:border-slate-600 hover:bg-gradient-to-br hover:from-gray-50 hover:to-white'
              )}
              onClick={() => onTopicSelect(topic.id)}
            >
              {/* Background Pattern */}
                             <div className="absolute top-0 right-0 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-slate-600/30 to-transparent rounded-full -translate-y-12 lg:-translate-y-16 translate-x-12 lg:translate-x-16 group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4 lg:mb-6">
                  <div className="text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-300">
                                         <AppIcon icon={topic.icon} size={28} className="text-slate-700" />
                  </div>
                  <div className="flex items-center space-x-2">
                    {topic.isCompleted && (
                      <div className="w-6 h-6 lg:w-8 lg:h-8 bg-slate-700 rounded-full flex items-center justify-center">
                        <AppIcon icon="lucide:check" className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                      </div>
                    )}
                    <div className="flex items-center text-gray-500 text-xs lg:text-sm bg-gray-100 px-2 lg:px-3 py-1 rounded-full">
                      <AppIcon icon="lucide:clock" className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                      {topic.duration}
                    </div>
                  </div>
                </div>

                <div className="mb-3 lg:mb-4">
                                     <span className="inline-flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-full text-sm lg:text-base font-bold">
                     {index + 1}
                   </span>
                </div>

                                 <h3 className="text-lg lg:text-xl font-bold text-slate-800 mb-3 lg:mb-4 group-hover:text-slate-800 transition-colors duration-300">
                   {topic.title}
                 </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4 lg:mb-6">
                  {topic.description}
                </p>

                <div className="flex items-center justify-between">
                                     <div className="flex items-center text-slate-700 font-semibold text-sm lg:text-base group-hover:text-slate-700 transition-colors duration-300">
                     <AppIcon icon="lucide:play" className="w-4 h-4 mr-2" />
                     Comenzar
                   </div>
                   <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                     <AppIcon icon="lucide:chevron-right" className="w-4 h-4 text-white" />
                   </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 lg:mt-16">
                     <Card variant="outlined" className="p-6 lg:p-8 bg-gradient-to-r from-gray-100 to-white border-slate-600 max-w-2xl mx-auto">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">¿Listo para aprender?</h3>
            <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base">
              Selecciona cualquier tema para comenzar tu aprendizaje sobre los trámites de SUNARP
            </p>
            <Button
              onClick={() => onTopicSelect(topics[0].id)}
              variant="primary"
              size="lg"
                             className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Comenzar Tutorial
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}; 