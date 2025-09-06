// ===== COURSE PROGRESS COMPONENT =====
// Componente para mostrar el progreso del curso de SUNARP Digital

import React from 'react';
import { useCourseProgress } from '../../hooks/useCourseProgress';
import { AppIcon } from './AppIcon';

interface CourseProgressProps {
  className?: string;
  showStats?: boolean;
  showTopics?: boolean;
}

export const CourseProgress: React.FC<CourseProgressProps> = ({ 
  className = '', 
  showStats = true,
  showTopics = false
}) => {
  const { progress, getCourseStats } = useCourseProgress();
  const stats = getCourseStats();

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Progreso del Curso
        </h3>
        <div className="flex items-center text-sm text-gray-600">
          {showTopics ? (
            <>
              <AppIcon icon="lucide:book-open" className="w-4 h-4 mr-1" />
              {progress.completedTopics}/{progress.totalTopics} temas
            </>
          ) : (
            <>
              <AppIcon icon="lucide:play-circle" className="w-4 h-4 mr-1" />
              {progress.completedVideos}/{progress.totalVideos} videos
            </>
          )}
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progreso</span>
          <span>{showTopics ? progress.topicProgressPercentage : progress.progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-ong-primary to-ong-detail-1 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${showTopics ? progress.topicProgressPercentage : progress.progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Estadísticas */}
      {showStats && (
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <AppIcon icon="lucide:clock" className="w-4 h-4 mr-2 text-gray-500" />
            <div>
              <div className="text-gray-600">Completado</div>
              <div className="font-semibold text-gray-800">
                {stats.completedDuration} min
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <AppIcon icon="lucide:target" className="w-4 h-4 mr-2 text-gray-500" />
            <div>
              <div className="text-gray-600">Restante</div>
              <div className="font-semibold text-gray-800">
                {stats.remainingDuration} min
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje de motivación */}
      {(() => {
        const currentPercentage = showTopics ? progress.topicProgressPercentage : progress.progressPercentage;
        if (currentPercentage === 100) {
          return (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <AppIcon icon="lucide:check-circle" className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">
                  ¡Felicitaciones! Has completado el curso
                </span>
              </div>
            </div>
          );
        } else if (currentPercentage > 0) {
          return (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <AppIcon icon="lucide:trending-up" className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-blue-800 font-medium">
                  ¡Sigue así! Estás haciendo un gran progreso
                </span>
              </div>
            </div>
          );
        } else {
          return (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center">
                <AppIcon icon="lucide:play" className="w-5 h-5 text-orange-600 mr-2" />
                <span className="text-orange-800 font-medium">
                  ¡Comienza tu aprendizaje con SUNARP Digital!
                </span>
              </div>
            </div>
          );
        }
      })()}
    </div>
  );
};
