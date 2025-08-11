import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/molecules/Navigation';
import { HeroSection } from './components/organisms/HeroSection';
import { WhatWeDoSection } from './components/organisms/WhatWeDoSection';
import { TeamSection } from './components/organisms/TeamSection';
import { ProjectsSection } from './components/organisms/ProjectsSection';
import { InteractiveGuideSection } from './components/organisms/InteractiveGuideSection';
import { GallerySection } from './components/organisms/GallerySection';
import { ContactSection } from './components/organisms/ContactSection';
import { Footer } from './components/organisms/Footer';
import { WarmipuraDigitalPage } from './components/pages/WarmipuraDigitalPage';
import ResourcesPage from './pages/ResourcesPage';
import type { HeroSectionData } from './types';
import './App.css';

// Datos del Hero
const heroData: HeroSectionData = {
  title: "ONG Warmipura",
  subtitle: "ONG Warmipura es comunidad, justicia y liderazgo. Juntos construimos un futuro libre de violencia.",
  ctaText: "CONOCE NUESTROS PROYECTOS",
  ctaLink: "#proyectos"
};

// Datos del equipo
const teamMembers = [
  {
    name: "Valery Flores",
    role: "Dirección ejecutiva"
  },
  {
    name: "Andrea Lozano",
    role: "Dirección administrativa y financiera"
  },
  {
    name: "Brandon Guitton",
    role: "Dirección legal"
  },
  {
    name: "Damaris Vargas",
    role: "Dirección de comunicaciones"
  }
];

// Datos de las guías
const guides = [
  {
    id: "1",
    title: "GUÍA PARA UNA VIDA LIBRE DE VIOLENCIA",
    description: "Una guía completa que te ayudará a identificar, prevenir y actuar ante situaciones de violencia, con información legal y recursos de apoyo.",
    pdfUrl: "#",
    videoUrl: "#"
  },
  {
    id: "2",
    title: "DERECHOS LABORALES DE LA MUJER",
    description: "Conoce tus derechos en el ámbito laboral, incluyendo igualdad salarial, protección contra el acoso y licencias por maternidad.",
    pdfUrl: "#",
    videoUrl: "#"
  },
  {
    id: "3",
    title: "PROCESOS LEGALES BÁSICOS",
    description: "Guía paso a paso para navegar por el sistema legal peruano, desde denuncias hasta trámites administrativos.",
    pdfUrl: "#",
    videoUrl: "#"
  }
];

// Datos de la galería
const galleryImages = [
  {
    id: '1',
    title: 'Taller de Empoderamiento',
    description: 'Mujeres participando en nuestro taller de empoderamiento y derechos',
    category: 'Talleres',
    imageUrl: '/placeholder-1.jpg'
  },
  {
    id: '2',
    title: 'Asesoría Legal',
    description: 'Sesión de asesoría legal gratuita para la comunidad',
    category: 'Asesoría',
    imageUrl: '/placeholder-2.jpg'
  },
  {
    id: '3',
    title: 'Comunidad Unida',
    description: 'Momentos de encuentro y fortalecimiento de redes de apoyo',
    category: 'Comunidad',
    imageUrl: '/placeholder-3.jpg'
  },
  {
    id: '4',
    title: 'Celebración de Logros',
    description: 'Celebrando los logros y avances de nuestras participantes',
    category: 'Celebraciones',
    imageUrl: '/placeholder-4.jpg'
  },
  {
    id: '5',
    title: 'Trabajo en Equipo',
    description: 'Nuestro equipo trabajando juntos por la justicia social',
    category: 'Equipo',
    imageUrl: '/placeholder-5.jpg'
  },
  {
    id: '6',
    title: 'Formación Continua',
    description: 'Capacitaciones y formación para el empoderamiento',
    category: 'Formación',
    imageUrl: '/placeholder-6.jpg'
  },
  {
    id: '7',
    title: 'Actividades Comunitarias',
    description: 'Participación en actividades comunitarias y de sensibilización',
    category: 'Comunidad',
    imageUrl: '/placeholder-7.jpg'
  },
  {
    id: '8',
    title: 'Logros y Reconocimientos',
    description: 'Reconocimientos por nuestro trabajo en la comunidad',
    category: 'Logros',
    imageUrl: '/placeholder-8.jpg'
  }
];

// Contact Section Data
const contactData = {
  email: "ongwarmipura.pe@gmail.com",
  phone: "959 112 264",
  address: "Calle Melgar 513-517, Arequipa",
  hours: "Lunes a Viernes: 9:00 AM - 6:00 PM | Sábados: 9:00 AM - 1:00 PM | Domingos: Cerrado"
};

function App() {
  const items = [
    { id: 'inicio', label: 'Inicio', href: '#inicio' },
    { 
      id: 'nosotros', 
      label: 'Nosotros', 
      href: '#quienes-somos',
      dropdown: [
        { label: 'Quiénes Somos', href: '#quienes-somos' },
        { label: 'Nuestro Equipo', href: '#equipo' }
      ]
    },
    { 
      id: 'proyectos', 
      label: 'Proyectos', 
      href: '#proyectos',
      dropdown: [
        { label: 'Empodera Mujer', href: '#proyectos' },
        { label: 'Guía Virtual', href: '#guia-virtual' },
        { label: 'Galería', href: '#galeria' }
      ]
    },
    { 
      id: 'participa', 
      label: 'Participa', 
      href: '#contacto',
      dropdown: [
        { label: 'Únete', href: '#contacto' },
        { label: 'Contacto', href: '#contacto' }
      ]
    },
            { id: 'digital', label: 'Digital', href: '/warmipura-digital' },
        { id: 'recursos', label: 'Recursos', href: '/recursos' }
  ];

  return (
    <Router>
      <div className="App">
        {/* Navigation global - aparece en todas las rutas */}
        <Navigation 
          items={items} 
          ctaText="CONTÁCTENOS"
        />
        
        <Routes>
          {/* Ruta principal - Landing Page */}
          <Route path="/" element={
            <>
              <HeroSection data={heroData} />
              <WhatWeDoSection data={{}} />
              <TeamSection members={teamMembers} />
              <ProjectsSection />
              <InteractiveGuideSection guides={guides} />
              <GallerySection images={galleryImages} />
              <ContactSection data={contactData} />
              <Footer />
            </>
          } />
          
          {/* Ruta Warmipura Digital */}
          <Route path="/warmipura-digital" element={<WarmipuraDigitalPage />} />
          
          {/* Ruta Galería */}
          {/* Ruta Recursos */}
          <Route path="/recursos" element={<ResourcesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
