import React, { useState } from 'react';
import { TutorialSyllabus } from '../organisms/TutorialSyllabus';
import { TutorialTopic } from '../organisms/TutorialTopic';

type ViewMode = 'syllabus' | 'topic';

export const WarmipuraDigitalPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('syllabus');
  const [currentTopicId, setCurrentTopicId] = useState<string>('');

  // Datos de los temas del tutorial
  const topics = [
    {
      id: 'introduccion',
      title: 'Introducción a SUNARP',
      description: 'Conoce qué es SUNARP y los trámites que puedes realizar',
      icon: 'lucide:landmark',
      duration: '5:18',
      isCompleted: false,
      isActive: true
    },
    {
      id: 'compraventa',
      title: 'Qué es una compraventa',
      description: 'Aprende sobre el proceso de compra y venta de inmuebles',
      icon: 'lucide:home',
      duration: '7:25',
      isCompleted: false,
      isActive: false
    },
    {
      id: 'registro-propiedades',
      title: 'Registro de Propiedades',
      description: 'Cómo registrar y consultar propiedades inmuebles',
      icon: 'lucide:clipboard-list',
      duration: '6:42',
      isCompleted: false,
      isActive: false
    },
    {
      id: 'vehiculos',
      title: 'Trámites Vehiculares',
      description: 'Registro y transferencia de vehículos',
      icon: 'lucide:car',
      duration: '8:15',
      isCompleted: false,
      isActive: false
    },
    {
      id: 'empresas',
      title: 'Registro de Empresas',
      description: 'Crear y registrar personas jurídicas',
      icon: 'lucide:building-2',
      duration: '9:30',
      isCompleted: false,
      isActive: false
    },
    {
      id: 'asociaciones',
      title: 'Asociaciones y ONGs',
      description: 'Constituir organizaciones sin fines de lucro',
      icon: 'lucide:handshake',
      duration: '7:50',
      isCompleted: false,
      isActive: false
    },
    {
      id: 'poderes',
      title: 'Poderes Notariales',
      description: 'Documentos legales y poderes',
      icon: 'lucide:file-text',
      duration: '6:20',
      isCompleted: false,
      isActive: false
    },
    {
      id: 'sucesiones',
      title: 'Sucesiones y Testamentos',
      description: 'Trámites después del fallecimiento',
      icon: 'lucide:scale',
      duration: '8:45',
      isCompleted: false,
      isActive: false
    },
    {
      id: 'consultas',
      title: 'Consultas en Línea',
      description: 'Herramientas digitales de SUNARP',
      icon: 'lucide:laptop',
      duration: '5:30',
      isCompleted: false,
      isActive: false
    }
  ];

  // Datos específicos de cada tema
  const topicData = {
    introduccion: {
      title: 'Introducción a SUNARP',
      description: 'La Superintendencia Nacional de los Registros Públicos (SUNARP) es la entidad encargada de administrar los registros públicos en el Perú. En este tutorial aprenderás todo lo que necesitas saber sobre los trámites que puedes realizar.',
      videoUrl: undefined,
      videoDuration: '5:18',
      infographicContent: [
        'SUNARP administra los registros públicos del Perú',
        'Permite registrar actos jurídicos importantes',
        'Brinda seguridad jurídica a los ciudadanos',
        'Ofrece servicios en línea y presenciales'
      ],
      pdfUrl: undefined
    },
    compraventa: {
      title: 'Qué es una compraventa',
      description: 'La compraventa es un contrato por el cual una persona se obliga a entregar un bien determinado a otra persona, quien a su vez se obliga a pagar un precio por dicho bien. Este tipo de contrato puede ser respecto a bienes muebles o inmuebles.',
      videoUrl: undefined,
      videoDuration: '7:25',
      infographicContent: [
        'Contrato entre comprador y vendedor',
        'Transferencia de propiedad del bien',
        'Pago del precio acordado',
        'Inscripción en registros públicos'
      ],
      pdfUrl: undefined
    },
    'registro-propiedades': {
      title: 'Registro de Propiedades',
      description: 'El registro de propiedades es fundamental para acreditar la titularidad legal de un inmueble. Aprende cómo registrar y consultar propiedades de manera segura.',
      videoUrl: undefined,
      videoDuration: '6:42',
      infographicContent: [
        'Título de propiedad como documento legal',
        'Inmatriculación para primera inscripción',
        'Consultas en línea gratuitas',
        'Certificados registrales'
      ],
      pdfUrl: undefined
    },
    vehiculos: {
      title: 'Trámites Vehiculares',
      description: 'Los vehículos también deben registrarse en SUNARP. Conoce el proceso de registro y transferencia vehicular paso a paso.',
      videoUrl: undefined,
      videoDuration: '8:15',
      infographicContent: [
        'Registro inicial del vehículo',
        'Transferencia de propiedad',
        'Tarjeta de identificación vehicular',
        'Consultas de gravámenes'
      ],
      pdfUrl: undefined
    },
    empresas: {
      title: 'Registro de Empresas',
      description: 'Crear una empresa requiere seguir un proceso específico. Aprende sobre los diferentes tipos de empresas y cómo registrarlas.',
      videoUrl: undefined,
      videoDuration: '9:30',
      infographicContent: [
        'Tipos de empresas en Perú',
        'Búsqueda y reserva de nombre',
        'Minuta de constitución',
        'Inscripción en SUNARP y RUC'
      ],
      pdfUrl: undefined
    },
    asociaciones: {
      title: 'Asociaciones y ONGs',
      description: 'Las asociaciones son organizaciones sin fines de lucro. Conoce el proceso para constituir una asociación legalmente.',
      videoUrl: undefined,
      videoDuration: '7:50',
      infographicContent: [
        'Diferencias con empresas',
        'Constitución sin fines de lucro',
        'Junta directiva',
        'Inscripción registral'
      ],
      pdfUrl: undefined
    },
    poderes: {
      title: 'Poderes Notariales',
      description: 'Los poderes notariales permiten que una persona actúe en representación de otra. Aprende sobre los diferentes tipos de poderes.',
      videoUrl: undefined,
      videoDuration: '6:20',
      infographicContent: [
        'Tipos de poderes',
        'Escritura pública',
        'Inscripción registral',
        'Revocación de poderes'
      ],
      pdfUrl: undefined
    },
    sucesiones: {
      title: 'Sucesiones y Testamentos',
      description: 'Cuando una persona fallece, sus bienes pasan a sus herederos. Conoce el proceso de sucesión intestada y testamentaria.',
      videoUrl: undefined,
      videoDuration: '8:45',
      infographicContent: [
        'Sucesión intestada',
        'Declaratoria de herederos',
        'Inscripción de herencia',
        'Órdenes sucesorios'
      ],
      pdfUrl: undefined
    },
    consultas: {
      title: 'Consultas en Línea',
      description: 'SUNARP ofrece herramientas digitales para consultar información registral. Aprende a usar estos servicios en línea.',
      videoUrl: undefined,
      videoDuration: '5:30',
      infographicContent: [
        'SPRL - Servicio en línea',
        'Consulta tu propiedad',
        'Certificados literales',
        'Alerta registral'
      ],
      pdfUrl: undefined
    }
  };

  const handleTopicSelect = (topicId: string) => {
    setCurrentTopicId(topicId);
    setViewMode('topic');
  };

  const handleBackToSyllabus = () => {
    setViewMode('syllabus');
  };

  const handlePrevious = () => {
    const currentIndex = topics.findIndex(t => t.id === currentTopicId);
    if (currentIndex > 0) {
      const previousTopic = topics[currentIndex - 1];
      setCurrentTopicId(previousTopic.id);
    }
  };

  const handleNext = () => {
    const currentIndex = topics.findIndex(t => t.id === currentTopicId);
    if (currentIndex < topics.length - 1) {
      const nextTopic = topics[currentIndex + 1];
      setCurrentTopicId(nextTopic.id);
    }
  };

  const currentTopic = topics.find(t => t.id === currentTopicId);
  const currentIndex = topics.findIndex(t => t.id === currentTopicId);

  if (viewMode === 'topic' && currentTopic && topicData[currentTopicId as keyof typeof topicData]) {
    const topicInfo = topicData[currentTopicId as keyof typeof topicData];
    
    return (
      <TutorialTopic
        title={topicInfo.title}
        description={topicInfo.description}
        videoUrl={topicInfo.videoUrl}
        videoDuration={topicInfo.videoDuration}
        infographicContent={topicInfo.infographicContent}
        pdfUrl={topicInfo.pdfUrl}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onBackToSyllabus={handleBackToSyllabus}
        hasPrevious={currentIndex > 0}
        hasNext={currentIndex < topics.length - 1}
      />
    );
  }

  return (
    <TutorialSyllabus
      topics={topics}
      onTopicSelect={handleTopicSelect}
    />
  );
}; 