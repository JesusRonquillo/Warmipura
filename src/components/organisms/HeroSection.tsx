import React from 'react';
import { Button } from '../atoms/Button';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { cn } from '../../utils';
import DudaAsombro from '../../assets/icons/Personaje/Feliz.svg';

interface HeroSectionProps {
  data: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const { scrollPosition } = useScrollPosition();

  return (
    <section 
      id="inicio" 
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#FE7F30]"
      style={{ paddingTop: 'calc(4rem + 1rem)' }}
    >
      {/* Parallax Background Elements */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translateY(${scrollPosition * 0.5}px)`
        }}
      >
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#FE7F30]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FE7F30]/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-[#FE7F30]/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-[#FE7F30]/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Floating geometric shapes */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translateY(${scrollPosition * 0.3}px)`
        }}
      >
        <div className="absolute top-32 left-16 w-8 h-8 bg-white/20 rounded-lg rotate-45 animate-bounce-slow" />
        <div className="absolute top-48 right-24 w-6 h-6 bg-[#FE7F30]/30 rounded-full animate-pulse-slow" />
        <div className="absolute bottom-32 left-1/4 w-10 h-10 bg-[#FE7F30]/25 rounded-lg rotate-12 animate-bounce-slow" />
        <div className="absolute bottom-48 right-1/3 w-4 h-4 bg-[#FE7F30]/40 rounded-full animate-pulse-slow" />
        <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-[#FE7F30]/30 rounded-lg rotate-45 animate-bounce-slow" />
      </div>

      <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
        {/* Content with Parallax */}
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "flex-1 text-center lg:text-left transition-all duration-1000",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
          style={{
            transform: `translateY(${scrollPosition * 0.2}px)`
          }}
        >
          <h1 className="text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 text-white drop-shadow-lg">
            {data.title}
          </h1>
          <p className="text-xl lg:text-2xl font-body mb-8 max-w-2xl mx-auto lg:mx-0 text-ong-base drop-shadow-md">
            {data.subtitle}
          </p>
          <div className="relative z-30 flex flex-col sm:flex-row justify-center lg:justify-start gap-3 md:gap-4">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => window.location.href = data.ctaLink}
              className="text-xl px-10 py-5 btn-large shadow-lg bg-primary text-white hover:bg-primary/90 border-2 border-primary/20"
            >
              {data.ctaText}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xl px-10 py-5 btn-large border-2 border-white text-white hover:bg-white/20 hover:text-white shadow-lg"
            >
              SOLICITA ASESORÍA LEGAL GRATUITA
            </Button>
          </div>
        </div>

        {/* Visual Elements - Personaje Feliz con elementos flotantes */}
        <div 
          className={cn(
            'hidden md:flex justify-center lg:justify-end',
            'flex-1 relative w-full max-w-md lg:max-w-lg h-96 lg:h-[400px] transition-all duration-1000 sm:mt-0 z-0 pointer-events-none',
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
          style={{
            transform: `translateY(${scrollPosition * 0.1}px)`
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-2xl" />
            
            {/* Personaje Principal - Feliz */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-64 h-64 lg:w-72 lg:h-72 flex items-center justify-center mb-4">
                  <img 
                    src={DudaAsombro} 
                    alt="Puma Chaski - Personaje de Warmipura" 
                    className="w-full h-full object-contain drop-shadow-2xl animate-float"
                  />
                </div>
                <div className="text-center text-white">
                  <p className="text-xl font-bold drop-shadow-lg">¡Hola! Soy Puma Chaski</p>
                  <p className="text-sm text-ong-base drop-shadow-md">Tu compañero de aprendizaje</p>
                </div>
              </div>
            </div>
          </div>

          {/* Elementos flotantes - Balance perfecto */}
          
          {/* ⚖️ Justicia - Esquina superior derecha */}
          <div className="absolute -top-6 -right-6 w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full items-center justify-center text-white font-bold text-lg animate-bounce-slow shadow-lg hover:scale-110 transition-transform duration-300 border border-white/30">
            
          </div>

          {/* 🤝 Comunidad - Esquina inferior izquierda */}
          <div className="absolute -bottom-6 -left-6 w-10 h-10 md:w-14 md:h-14 bg-digital-primary/30 backdrop-blur-sm rounded-full items-center justify-center text-white text-lg animate-pulse-slow shadow-lg hover:scale-110 transition-transform duration-300 border border-digital-primary/40">
            
          </div>

          {/* 📚 Educación - Lado derecho */}
          <div className="absolute top-1/4 -right-4 w-10 h-10 md:w-12 md:h-12 bg-digital-primary/25 backdrop-blur-sm rounded-full items-center justify-center text-white text-sm animate-bounce-slow shadow-lg hover:scale-110 transition-transform duration-300 border border-digital-primary/30">
          </div>

          {/* 💡 Ideas - Lado izquierdo */}
          <div className="absolute top-1/3 -left-4 w-10 h-10 md:w-12 md:h-12 bg-digital-primary/30 backdrop-blur-sm rounded-full items-center justify-center text-white text-sm animate-pulse-slow shadow-lg hover:scale-110 transition-transform duration-300 border border-digital-primary/40">
          
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
          <p className="text-white/80 text-sm font-medium drop-shadow-md">Descubre más</p>
        </div>
      </div>
    </section>
  );
}; 