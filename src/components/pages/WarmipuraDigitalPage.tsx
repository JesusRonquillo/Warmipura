import React, { useState } from 'react';
import { TutorialSyllabus } from '../organisms/TutorialSyllabus';
import { TutorialTopic } from '../organisms/TutorialTopic';
import { CourseVideoPlayer } from '../organisms/CourseVideoPlayer';
import { useCourseProgress } from '../../hooks/useCourseProgress';


type ViewMode = 'syllabus' | 'topic' | 'videos';

export const WarmipuraDigitalPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('syllabus');
  const [currentTopicId, setCurrentTopicId] = useState<string>('');
  
  // Hook de progreso del curso
  const { 
    progress, 
    isLoaded,
    markTopicCompleted, 
    setCurrentTopic, 
    isTopicCompleted,
    getNextTopic,
    getPreviousTopic,
    getStoredProgress,
    clearAllProgress
  } = useCourseProgress(9);

  // Datos de los temas del tutorial
  const topics = [
    {
      id: 'introduccion',
      title: 'Introducción a SUNARP',
      description: 'Conoce qué es SUNARP y los trámites que puedes realizar',
      icon: 'lucide:landmark',
      duration: '5:18',
      isCompleted: isTopicCompleted('introduccion'),
      isActive: currentTopicId === 'introduccion'
    },
    {
      id: 'documentos-legales',
      title: 'Documentos Legales',
      description: 'Conoce los documentos legales necesarios para trámites',
      icon: 'lucide:file-text',
      duration: '6:30',
      isCompleted: isTopicCompleted('documentos-legales'),
      isActive: currentTopicId === 'documentos-legales'
    },
    {
      id: 'fallecimiento',
      title: 'Trámites de Fallecimiento',
      description: 'Proceso para trámites relacionados con fallecimientos',
      icon: 'lucide:scroll',
      duration: '7:45',
      isCompleted: isTopicCompleted('fallecimiento'),
      isActive: currentTopicId === 'fallecimiento'
    },
    {
      id: 'registrar',
      title: 'Trámites para Registrar',
      description: 'Guía completa para registrar documentos en SUNARP',
      icon: 'lucide:clipboard-list',
      duration: '8:20',
      isCompleted: isTopicCompleted('registrar'),
      isActive: currentTopicId === 'registrar'
    },
    {
      id: 'organizaciones-sociales',
      title: 'Organizaciones Sociales',
      description: 'Registro y gestión de organizaciones sociales y ONGs',
      icon: 'lucide:users',
      duration: '9:15',
      isCompleted: isTopicCompleted('organizaciones-sociales'),
      isActive: currentTopicId === 'organizaciones-sociales'
    },
    {
      id: 'propiedades',
      title: 'Trámites de Propiedades',
      description: 'Todo sobre el registro y consulta de propiedades',
      icon: 'lucide:home',
      duration: '10:30',
      isCompleted: isTopicCompleted('propiedades'),
      isActive: currentTopicId === 'propiedades'
    },
    {
      id: 'vehiculos',
      title: 'Trámites Vehiculares',
      description: 'Registro y transferencia de vehículos en SUNARP',
      icon: 'lucide:car',
      duration: '8:45',
      isCompleted: isTopicCompleted('vehiculos'),
      isActive: currentTopicId === 'vehiculos'
    },
    {
      id: 'herramientas-digitales',
      title: 'Herramientas Digitales',
      description: 'Aprende a usar las herramientas digitales de SUNARP',
      icon: 'lucide:search',
      duration: '6:20',
      isCompleted: isTopicCompleted('herramientas-digitales'),
      isActive: currentTopicId === 'herramientas-digitales'
    },
    {
      id: 'protege-derechos',
      title: 'Protege tus Derechos',
      description: 'Cómo proteger tus derechos mediante el registro público',
      icon: 'lucide:shield-check',
      duration: '7:10',
      isCompleted: isTopicCompleted('protege-derechos'),
      isActive: currentTopicId === 'protege-derechos'
    }
  ];

  // Datos específicos de cada tema
  const topicData = {
    introduccion: {
      title: 'Introducción a SUNARP',
      description: 'La Superintendencia Nacional de los Registros Públicos (SUNARP) es la entidad encargada de administrar los registros públicos en el Perú. En este tutorial aprenderás todo lo que necesitas saber sobre los trámites que puedes realizar.',
      videoUrl: 'https://www.youtube.com/embed/WaoYqzODdIM?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=0',
      videoDuration: '5:18',
      infographicContent: [
        'SUNARP administra los registros públicos del Perú',
        'Permite registrar actos jurídicos importantes',
        'Brinda seguridad jurídica a los ciudadanos',
        'Ofrece servicios en línea y presenciales'
      ],
      pdfUrl: undefined
    },
    'documentos-legales': {
      title: 'Documentos Legales',
      description: 'Conoce los documentos legales necesarios para realizar trámites en SUNARP. Aprende sobre los requisitos y formatos requeridos.',
      videoUrl: 'https://www.youtube.com/embed/W126RPE1zRg?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=0',
      videoDuration: '6:30',
      infographicContent: [
        'Documentos de identidad vigentes',
        'Escrituras públicas notariales',
        'Certificados y constancias',
        'Documentos específicos por trámite'
      ],
      pdfUrl: undefined
    },
    fallecimiento: {
      title: 'Trámites de Fallecimiento',
      description: 'Proceso completo para trámites relacionados con fallecimientos y sucesiones. Conoce los pasos necesarios para gestionar la herencia.',
      videoUrl: 'https://www.youtube.com/embed/9jpAvZuso28?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=0',
      videoDuration: '7:45',
      infographicContent: [
        'Declaratoria de herederos',
        'Sucesión intestada y testamentaria',
        'Inscripción de herencia',
        'Documentos necesarios'
      ],
      pdfUrl: undefined
    },
    registrar: {
      title: 'Trámites para Registrar',
      description: 'Guía completa para registrar documentos en SUNARP. Aprende el proceso paso a paso para diferentes tipos de registros.',
      videoUrl: 'https://www.youtube.com/embed/oYtl0ta1VD0?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=0',
      videoDuration: '8:20',
      infographicContent: [
        'Tipos de registros disponibles',
        'Requisitos por tipo de documento',
        'Proceso de inscripción',
        'Tiempos de tramitación'
      ],
      pdfUrl: undefined
    },
    'organizaciones-sociales': {
      title: 'Organizaciones Sociales',
      description: 'Registro y gestión de organizaciones sociales y ONGs. Conoce el proceso para constituir organizaciones sin fines de lucro.',
      videoUrl: 'https://www.youtube.com/embed/ohljY03cZpo?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=0',
      videoDuration: '9:15',
      infographicContent: [
        'Tipos de organizaciones sociales',
        'Constitución sin fines de lucro',
        'Junta directiva y estatutos',
        'Inscripción registral'
      ],
      pdfUrl: undefined
    },
    propiedades: {
      title: 'Trámites de Propiedades',
      description: 'Todo sobre el registro y consulta de propiedades inmuebles. Aprende a gestionar la información de tu propiedad.',
      videoUrl: 'https://www.youtube.com/embed/9YxN6X5XRTA?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=0',
      videoDuration: '10:30',
      infographicContent: [
        'Título de propiedad',
        'Inmatriculación de inmuebles',
        'Consultas en línea',
        'Certificados registrales'
      ],
      pdfUrl: undefined
    },
    vehiculos: {
      title: 'Trámites Vehiculares',
      description: 'Registro y transferencia de vehículos en SUNARP. Conoce el proceso para gestionar la documentación vehicular.',
      videoUrl: 'https://www.youtube.com/embed/KhrZxswC-uY?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=0',
      videoDuration: '8:45',
      infographicContent: [
        'Registro inicial de vehículos',
        'Transferencia de propiedad',
        'Tarjeta de identificación vehicular',
        'Consultas y certificados'
      ],
      pdfUrl: undefined
    },
    'herramientas-digitales': {
      title: 'Herramientas Digitales',
      description: 'Aprende a usar las herramientas digitales de SUNARP para realizar consultas y trámites en línea.',
      videoUrl: 'https://www.youtube.com/embed/6zjlWG-jZsg?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=0',
      videoDuration: '6:20',
      infographicContent: [
        'SPRL - Servicio en línea',
        'Consulta de propiedades',
        'Certificados digitales',
        'Tramitación virtual'
      ],
      pdfUrl: undefined
    },
    'protege-derechos': {
      title: 'Protege tus Derechos',
      description: 'Cómo proteger tus derechos mediante el registro público. Conoce la importancia del registro para la seguridad jurídica.',
      videoUrl: 'https://www.youtube.com/embed/lIR2jZGTgGQ?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=0',
      videoDuration: '7:10',
      infographicContent: [
        'Seguridad jurídica',
        'Protección de derechos',
        'Valor probatorio del registro',
        'Prevención de fraudes'
      ],
      pdfUrl: undefined
    }
  };

  const handleTopicSelect = (topicId: string) => {
    setCurrentTopicId(topicId);
    setCurrentTopic(topicId);
    setViewMode('topic');
  };

  const handleBackToSyllabus = () => {
    setViewMode('syllabus');
  };

  const handleVideosClick = () => {
    setViewMode('videos');
  };

  const handlePrevious = () => {
    const previousTopic = getPreviousTopic(topics);
    if (previousTopic) {
      setCurrentTopicId(previousTopic.id);
      setCurrentTopic(previousTopic.id);
    }
  };

  const handleNext = () => {
    const nextTopic = getNextTopic(topics);
    if (nextTopic) {
      setCurrentTopicId(nextTopic.id);
      setCurrentTopic(nextTopic.id);
    }
  };

  // Función para marcar tema como completado
  const handleTopicComplete = (topicId: string) => {
    console.log('Completing topic:', topicId);
    markTopicCompleted(topicId);
    // Verificar que se guardó
    setTimeout(() => {
      const stored = getStoredProgress();
      console.log('Stored progress after completion:', stored);
    }, 100);
  };

  const currentTopic = topics.find(t => t.id === currentTopicId);
  const currentIndex = topics.findIndex(t => t.id === currentTopicId);

  if (viewMode === 'topic' && currentTopic && topicData[currentTopicId as keyof typeof topicData]) {
    const topicInfo = topicData[currentTopicId as keyof typeof topicData];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-digital-primary/5 to-digital-primary/10" style={{ paddingTop: 'calc(4rem + 1rem)' }}>

        <TutorialTopic
          title={topicInfo.title}
          description={topicInfo.description}
          videoUrl={topicInfo.videoUrl}
          videoDuration={topicInfo.videoDuration}
          infographicContent={topicInfo.infographicContent}
          pdfUrl={topicInfo.pdfUrl}
          topicId={currentTopicId}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onBackToSyllabus={handleBackToSyllabus}
          onComplete={() => handleTopicComplete(currentTopicId)}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < topics.length - 1}
          isCompleted={isTopicCompleted(currentTopicId)}
        />
      </div>
    );
  }

  if (viewMode === 'videos') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-digital-primary/5 to-digital-primary/10" style={{ paddingTop: 'calc(4rem + 1rem)' }}>
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Curso de SUNARP Digital
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Aprende a usar la plataforma SUNARP Digital con nuestros tutoriales paso a paso. 
              Sigue tu progreso y completa el curso a tu ritmo.
            </p>
          </div>
          
          <CourseVideoPlayer />
        </div>
      </div>
    );
  }

  // Mostrar loading mientras se carga el progreso
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-digital-primary/5 to-digital-primary/10 flex items-center justify-center" style={{ paddingTop: 'calc(4rem + 1rem)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ong-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando progreso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-digital-primary/5 to-digital-primary/10" style={{ paddingTop: 'calc(4rem + 1rem)' }}>
      <TutorialSyllabus
        topics={topics}
        onTopicSelect={handleTopicSelect}
        onVideosClick={handleVideosClick}
        progress={progress}
        onClearProgress={clearAllProgress}
      />
    </div>
  );
}; 