import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/molecules/Navigation';
import { PageLoader } from './components/atoms/PageLoader';
import type { HeroSectionData } from './types';
import './App.css';

// Lazy imports
const HeroSection = React.lazy(() => import('./components/organisms/HeroSection').then(m => ({ default: m.HeroSection })));
const WhatWeDoSection = React.lazy(() => import('./components/organisms/WhatWeDoSection').then(m => ({ default: m.WhatWeDoSection })));
const TeamSection = React.lazy(() => import('./components/organisms/TeamSection').then(m => ({ default: m.TeamSection })));
const GuiaDigitalSection = React.lazy(() => import('./components/organisms/GuiaDigitalSection').then(m => ({ default: m.GuiaDigitalSection })));
const GallerySection = React.lazy(() => import('./components/organisms/GallerySection').then(m => ({ default: m.GallerySection })));
const ContactSection = React.lazy(() => import('./components/organisms/ContactSection').then(m => ({ default: m.ContactSection })));
const Footer = React.lazy(() => import('./components/organisms/Footer').then(m => ({ default: m.Footer })));
const WarmipuraDigitalPage = React.lazy(() => import('./components/pages/WarmipuraDigitalPage').then(m => ({ default: m.WarmipuraDigitalPage })));
const ResourcesPage = React.lazy(() => import('./pages/ResourcesPage'));

// Datos del Hero
const heroData: HeroSectionData = {
  title: 'ONG Warmipura',
  subtitle: 'ONG Warmipura es comunidad, justicia y liderazgo. Juntos construimos un futuro libre de violencia.',
  ctaText: 'CONOCE NUESTROS PROYECTOS',
  ctaLink: '#proyectos'
};

// Datos del equipo
const teamMembers = [
  { name: 'Valery Flores', role: 'Dirección ejecutiva' },
  { name: 'Andrea Lozano', role: 'Dirección administrativa y financiera' },
  { name: 'Brandon Guitton', role: 'Dirección legal' },
  { name: 'Damaris Vargas', role: 'Dirección de comunicaciones' }
];


// Importar las imágenes reales de la galería
import { GALLERY_IMAGES } from './config/images';

// Datos de la galería
const galleryImages = GALLERY_IMAGES;

// Contact Section Data
const contactData = {
  email: 'ongwarmipura.pe@gmail.com',
  phone: '959 112 264',
  address: 'Calle Melgar 513-517, Arequipa',
  hours: 'Lunes a Viernes: 9:00 AM - 6:00 PM | Sábados: 9:00 AM - 1:00 PM | Domingos: Cerrado'
};

function App() {
  const items = [
    { id: 'inicio', label: 'Inicio', href: '#inicio' },
    { id: 'nosotros', label: 'Nosotros', href: '#quienes-somos', dropdown: [ { label: 'Quiénes Somos', href: '#quienes-somos' }, { label: 'Nuestro Equipo', href: '#equipo' } ] },
    { id: 'proyectos', label: 'Proyectos', href: '#proyectos', dropdown: [ { label: 'Empodera Mujer', href: '#proyectos' }, { label: 'Guía Virtual', href: '#guia-virtual' }, { label: 'Galería', href: '#galeria' } ] },
    { id: 'participa', label: 'Participa', href: '#contacto', dropdown: [ { label: 'Únete', href: '#contacto' }, { label: 'Contacto', href: '#contacto' } ] },
    { id: 'digital', label: 'Digital', href: '/warmipura-digital' },
    { id: 'recursos', label: 'Recursos', href: '/recursos' }
  ];

  return (
    <Router>
      <div className="App safe-bottom-padding">
        <Navigation items={items} ctaText="CONTÁCTENOS" />
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<PageLoader isLoading={true}><div /></PageLoader>}>
                  <div className="pt-6 sm:pt-8">
                    <HeroSection data={heroData} />
                  </div>
                  <WhatWeDoSection />
                  <TeamSection members={teamMembers} />
                  <GuiaDigitalSection />
                  <GallerySection images={galleryImages} />
                  <ContactSection data={contactData} />
                </Suspense>
              }
            />
            <Route
              path="/warmipura-digital"
              element={
                <Suspense fallback={<PageLoader isLoading={true}><div /></PageLoader>}>
                  <WarmipuraDigitalPage />
                </Suspense>
              }
            />
            <Route
              path="/recursos"
              element={
                <Suspense fallback={<PageLoader isLoading={true}><div /></PageLoader>}>
                  <ResourcesPage />
                </Suspense>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
