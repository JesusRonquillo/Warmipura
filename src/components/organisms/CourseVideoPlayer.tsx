// ===== COURSE VIDEO PLAYER COMPONENT =====
// Componente para mostrar y reproducir videos del curso de SUNARP Digital

import React, { useState, useEffect } from 'react';
import { TUTORIAL_VIDEOS, getVideoUrl, getVideoThumbnail } from '../../config/videos';
import { useCourseProgress } from '../../hooks/useCourseProgress';
import { AppIcon } from '../atoms/AppIcon';
import { CourseProgress } from '../atoms/CourseProgress';

interface CourseVideoPlayerProps {
  className?: string;
}

export const CourseVideoPlayer: React.FC<CourseVideoPlayerProps> = ({ 
  className = '' 
}) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { 
    markVideoCompleted, 
    setCurrentVideo, 
    isVideoCompleted,
    getNextVideo,
    getPreviousVideo 
  } = useCourseProgress();

  const handleVideoSelect = (videoId: string) => {
    console.log('Selecting video:', videoId);
    console.log('Video URL:', getVideoUrl(videoId, 'embed'));
    setSelectedVideo(videoId);
    setCurrentVideo(videoId);
  };

  const handleVideoComplete = (videoId: string) => {
    markVideoCompleted(videoId);
  };

  const handleNextVideo = () => {
    const nextVideo = getNextVideo();
    if (nextVideo) {
      setSelectedVideo(nextVideo.id);
      setCurrentVideo(nextVideo.id);
    }
  };

  const handlePreviousVideo = () => {
    const previousVideo = getPreviousVideo();
    if (previousVideo) {
      setSelectedVideo(previousVideo.id);
      setCurrentVideo(previousVideo.id);
    }
  };

  const currentVideoData = selectedVideo 
    ? TUTORIAL_VIDEOS.find(video => video.id === selectedVideo)
    : null;

  // Seleccionar automáticamente el primer video al cargar
  useEffect(() => {
    if (!selectedVideo && TUTORIAL_VIDEOS.length > 0) {
      console.log('Auto-selecting first video:', TUTORIAL_VIDEOS[0].id);
      handleVideoSelect(TUTORIAL_VIDEOS[0].id);
    }
  }, [selectedVideo]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Progreso del curso */}
      <CourseProgress showStats={true} />

      {/* Video principal */}
      {selectedVideo && currentVideoData ? (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Video container */}
          <div className="aspect-video bg-black relative">
            {/* Thumbnail del video con enlace directo */}
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative group cursor-pointer"
                 onClick={() => {
                   // Marcar como completado cuando el usuario hace clic
                   handleVideoComplete(selectedVideo);
                   // Abrir en YouTube
                   window.open(getVideoUrl(selectedVideo, 'watch'), '_blank');
                 }}>
              
              {/* Thumbnail de YouTube */}
              <img
                src={getVideoThumbnail(currentVideoData)}
                alt={currentVideoData.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Si la thumbnail falla, mostrar placeholder
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              
              {/* Fallback si no hay thumbnail */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center hidden">
                <div className="text-center text-white">
                  <AppIcon icon="lucide:play-circle" className="w-20 h-20 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{currentVideoData.title}</h3>
                  <p className="text-gray-300 mb-4">Duración: {currentVideoData.duration}</p>
                </div>
              </div>
              
              {/* Overlay de reproducción */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <AppIcon icon="lucide:play" className="w-8 h-8 ml-1" />
                  </div>
                  <p className="text-lg font-semibold">Haz clic para ver en YouTube</p>
                  <p className="text-sm text-gray-300 mt-2">Se abrirá en una nueva pestaña</p>
                </div>
              </div>
              
              {/* Información del video en la esquina */}
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                {currentVideoData.duration}
              </div>
            </div>
          </div>

          {/* Información del video */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {currentVideoData.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {currentVideoData.description}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <AppIcon icon="lucide:clock" className="w-4 h-4 mr-1" />
                  <span>{currentVideoData.duration}</span>
                  <span className="mx-2">•</span>
                  <AppIcon icon="lucide:play-circle" className="w-4 h-4 mr-1" />
                  <span>Video {TUTORIAL_VIDEOS.findIndex(v => v.id === selectedVideo) + 1} de {TUTORIAL_VIDEOS.length}</span>
                </div>
              </div>

              {/* Estado de completado */}
              <div className="ml-4">
                {isVideoCompleted(selectedVideo) ? (
                  <div className="flex items-center text-green-600">
                    <AppIcon icon="lucide:check-circle" className="w-6 h-6 mr-2" />
                    <span className="font-medium">Completado</span>
                  </div>
                ) : (
                  <div className="flex items-center text-gray-400">
                    <AppIcon icon="lucide:circle" className="w-6 h-6 mr-2" />
                    <span className="font-medium">Pendiente</span>
                  </div>
                )}
              </div>
            </div>

            {/* Navegación */}
            <div className="flex justify-between">
              <button
                onClick={handlePreviousVideo}
                disabled={!getPreviousVideo()}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <AppIcon icon="lucide:chevron-left" className="w-4 h-4 mr-2" />
                Anterior
              </button>

              <button
                onClick={handleNextVideo}
                disabled={!getNextVideo()}
                className="flex items-center px-4 py-2 bg-ong-primary text-white rounded-lg hover:bg-ong-detail-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Siguiente
                <AppIcon icon="lucide:chevron-right" className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Video placeholder */
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <AppIcon icon="lucide:play-circle" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Selecciona un video para comenzar
              </h3>
              <p className="text-gray-500 mb-4">
                Elige un video de la lista para empezar tu aprendizaje
              </p>
              <button
                onClick={() => handleVideoSelect(TUTORIAL_VIDEOS[0].id)}
                className="inline-flex items-center px-6 py-3 bg-ong-primary text-white rounded-lg hover:bg-ong-detail-1 transition-colors"
              >
                <AppIcon icon="lucide:play" className="w-5 h-5 mr-2" />
                Comenzar con el primer video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de videos */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Lista de Videos del Curso
        </h3>
        <div className="space-y-3">
          {TUTORIAL_VIDEOS.map((video, index) => (
            <div
              key={video.id}
              onClick={() => handleVideoSelect(video.id)}
              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedVideo === video.id
                  ? 'border-ong-primary bg-ong-primary/5'
                  : 'border-gray-200 hover:border-ong-primary/50 hover:bg-gray-50'
              }`}
            >
              {/* Thumbnail */}
              <div className="w-20 h-12 bg-gray-200 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                <img
                  src={getVideoThumbnail(video)}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Información */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-800 truncate">
                  {index + 1}. {video.title}
                </h4>
                <p className="text-sm text-gray-600 truncate">
                  {video.description}
                </p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <AppIcon icon="lucide:clock" className="w-3 h-3 mr-1" />
                  <span>{video.duration}</span>
                  {video.featured && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="text-ong-primary font-medium">Destacado</span>
                    </>
                  )}
                </div>
              </div>

              {/* Estado */}
              <div className="ml-4 flex-shrink-0">
                {isVideoCompleted(video.id) ? (
                  <AppIcon icon="lucide:check-circle" className="w-6 h-6 text-green-600" />
                ) : (
                  <AppIcon icon="lucide:circle" className="w-6 h-6 text-gray-300" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
