// ===== COURSE PROGRESS HOOK =====
// Hook para manejar el progreso del curso de SUNARP Digital

import { useState, useEffect } from 'react';
import { TUTORIAL_VIDEOS } from '../config/videos';

export interface CourseProgress {
  totalVideos: number;
  completedVideos: number;
  currentVideo: string | null;
  progressPercentage: number;
  completedVideoIds: string[];
  // Nuevos campos para temas
  totalTopics: number;
  completedTopics: number;
  completedTopicIds: string[];
  currentTopic: string | null;
  topicProgressPercentage: number;
}

export const useCourseProgress = (totalTopics: number = 9) => {
  // Estado inicial vacío, se llenará desde localStorage
  const [progress, setProgress] = useState<CourseProgress>({
    totalVideos: TUTORIAL_VIDEOS.length,
    completedVideos: 0,
    currentVideo: null,
    progressPercentage: 0,
    completedVideoIds: [],
    totalTopics,
    completedTopics: 0,
    completedTopicIds: [],
    currentTopic: null,
    topicProgressPercentage: 0
  });

  // Estado para saber si ya se cargó desde localStorage
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar progreso desde localStorage al inicializar
  useEffect(() => {
    const savedProgress = localStorage.getItem('sunarp-course-progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        console.log('Loading progress from localStorage:', parsed);
        // Asegurar que el progreso cargado tenga la estructura correcta
        setProgress({
          totalVideos: parsed.totalVideos || TUTORIAL_VIDEOS.length,
          completedVideos: parsed.completedVideos || 0,
          currentVideo: parsed.currentVideo || null,
          progressPercentage: parsed.progressPercentage || 0,
          completedVideoIds: parsed.completedVideoIds || [],
          totalTopics: parsed.totalTopics || totalTopics,
          completedTopics: parsed.completedTopics || 0,
          completedTopicIds: parsed.completedTopicIds || [],
          currentTopic: parsed.currentTopic || null,
          topicProgressPercentage: parsed.topicProgressPercentage || 0
        });
        setIsLoaded(true);
      } catch (error) {
        console.error('Error loading course progress:', error);
        // Si hay error, usar valores por defecto
        setProgress({
          totalVideos: TUTORIAL_VIDEOS.length,
          completedVideos: 0,
          currentVideo: null,
          progressPercentage: 0,
          completedVideoIds: [],
          totalTopics,
          completedTopics: 0,
          completedTopicIds: [],
          currentTopic: null,
          topicProgressPercentage: 0
        });
        setIsLoaded(true);
      }
    } else {
      console.log('No saved progress found, using defaults');
      setIsLoaded(true);
    }
  }, [totalTopics]);

  // Guardar progreso en localStorage cuando cambie (solo después de cargar)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('sunarp-course-progress', JSON.stringify(progress));
        console.log('Progress saved to localStorage:', progress);
      } catch (error) {
        console.error('Error saving course progress:', error);
      }
    }
  }, [progress, isLoaded]);

  // Marcar video como completado
  const markVideoCompleted = (videoId: string) => {
    setProgress(prev => {
      if (prev.completedVideoIds.includes(videoId)) {
        return prev; // Ya está completado
      }

      const newCompletedIds = [...prev.completedVideoIds, videoId];
      const newCompletedCount = newCompletedIds.length;
      const newPercentage = Math.round((newCompletedCount / prev.totalVideos) * 100);

      return {
        ...prev,
        completedVideos: newCompletedCount,
        completedVideoIds: newCompletedIds,
        progressPercentage: newPercentage
      };
    });
  };

  // Marcar video como actual
  const setCurrentVideo = (videoId: string) => {
    setProgress(prev => ({
      ...prev,
      currentVideo: videoId
    }));
  };

  // Marcar tema como completado
  const markTopicCompleted = (topicId: string) => {
    setProgress(prev => {
      if (prev.completedTopicIds.includes(topicId)) {
        console.log('Topic already completed:', topicId);
        return prev; // Ya está completado
      }

      const newCompletedTopicIds = [...prev.completedTopicIds, topicId];
      const newCompletedTopicCount = newCompletedTopicIds.length;
      const newTopicPercentage = Math.round((newCompletedTopicCount / prev.totalTopics) * 100);

      const newProgress = {
        ...prev,
        completedTopics: newCompletedTopicCount,
        completedTopicIds: newCompletedTopicIds,
        topicProgressPercentage: newTopicPercentage
      };

      console.log('Marking topic as completed:', topicId, newProgress);
      return newProgress;
    });
  };

  // Marcar tema como actual
  const setCurrentTopic = (topicId: string) => {
    setProgress(prev => ({
      ...prev,
      currentTopic: topicId
    }));
  };

  // Reiniciar progreso
  const resetProgress = () => {
    const newProgress = {
      totalVideos: TUTORIAL_VIDEOS.length,
      completedVideos: 0,
      currentVideo: null,
      progressPercentage: 0,
      completedVideoIds: [],
      totalTopics,
      completedTopics: 0,
      completedTopicIds: [],
      currentTopic: null,
      topicProgressPercentage: 0
    };
    setProgress(newProgress);
    // Forzar guardado inmediato
    localStorage.setItem('sunarp-course-progress', JSON.stringify(newProgress));
  };

  // Limpiar completamente el localStorage del curso
  const clearAllProgress = () => {
    localStorage.removeItem('sunarp-course-progress');
    const newProgress = {
      totalVideos: TUTORIAL_VIDEOS.length,
      completedVideos: 0,
      currentVideo: null,
      progressPercentage: 0,
      completedVideoIds: [],
      totalTopics,
      completedTopics: 0,
      completedTopicIds: [],
      currentTopic: null,
      topicProgressPercentage: 0
    };
    setProgress(newProgress);
    console.log('All progress cleared from localStorage');
  };

  // Función para verificar el progreso guardado
  const getStoredProgress = () => {
    const stored = localStorage.getItem('sunarp-course-progress');
    return stored ? JSON.parse(stored) : null;
  };

  // Obtener siguiente video no completado
  const getNextVideo = () => {
    const uncompletedVideos = TUTORIAL_VIDEOS.filter(
      video => !progress.completedVideoIds.includes(video.id)
    );
    return uncompletedVideos[0] || null;
  };

  // Obtener video anterior
  const getPreviousVideo = () => {
    const currentIndex = TUTORIAL_VIDEOS.findIndex(
      video => video.id === progress.currentVideo
    );
    if (currentIndex > 0) {
      return TUTORIAL_VIDEOS[currentIndex - 1];
    }
    return null;
  };

  // Verificar si un video está completado
  const isVideoCompleted = (videoId: string) => {
    return progress.completedVideoIds.includes(videoId);
  };

  // Verificar si un tema está completado
  const isTopicCompleted = (topicId: string) => {
    return progress.completedTopicIds.includes(topicId);
  };

  // Obtener siguiente tema no completado
  const getNextTopic = (topics: any[]) => {
    const uncompletedTopics = topics.filter(
      topic => !progress.completedTopicIds.includes(topic.id)
    );
    return uncompletedTopics[0] || null;
  };

  // Obtener tema anterior
  const getPreviousTopic = (topics: any[]) => {
    const currentIndex = topics.findIndex(
      topic => topic.id === progress.currentTopic
    );
    if (currentIndex > 0) {
      return topics[currentIndex - 1];
    }
    return null;
  };

  // Obtener estadísticas del curso
  const getCourseStats = () => {
    const completedVideos = TUTORIAL_VIDEOS.filter(video => 
      progress.completedVideoIds.includes(video.id)
    );
    
    const totalDuration = TUTORIAL_VIDEOS.reduce((total, video) => {
      const [minutes, seconds] = video.duration.split(':').map(Number);
      return total + (minutes * 60) + seconds;
    }, 0);

    const completedDuration = completedVideos.reduce((total, video) => {
      const [minutes, seconds] = video.duration.split(':').map(Number);
      return total + (minutes * 60) + seconds;
    }, 0);

    return {
      totalDuration: Math.round(totalDuration / 60), // en minutos
      completedDuration: Math.round(completedDuration / 60), // en minutos
      remainingDuration: Math.round((totalDuration - completedDuration) / 60), // en minutos
      completionRate: progress.progressPercentage
    };
  };

  return {
    progress,
    isLoaded,
    markVideoCompleted,
    setCurrentVideo,
    markTopicCompleted,
    setCurrentTopic,
    resetProgress,
    clearAllProgress,
    getNextVideo,
    getPreviousVideo,
    getNextTopic,
    getPreviousTopic,
    isVideoCompleted,
    isTopicCompleted,
    getCourseStats,
    getStoredProgress
  };
};
