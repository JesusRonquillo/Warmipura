import React from 'react';
import { Section } from '../atoms/Section';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils';

export const WhatWeDoSection: React.FC = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <Section id="quienes-somos" className="bg-gray-50 py-24">
      <div className="container mx-auto px-6">
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-20 transition-all duration-1000",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-8">
            ¿Quienes somos?
          </h2>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
            <strong>ONG Warmipura</strong> es una organización sin fines de lucro fundada en Arequipa por un grupo de abogadas comprometidas con la defensa de los derechos humanos y la construcción de comunidades justas, seguras y libres de violencia.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 mb-16">
          {/* Proyectos */}
          <Card 
            variant="outlined" 
            className="text-center p-10 hover:shadow-xl hover:border-primary/40 transition-all duration-300 bg-white"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-ong-detail-1/30 to-ong-base rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-ong-detail-1">
              <span className="text-4xl">📋</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Proyectos</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Desarrollamos proyectos integrales enfocados en el empoderamiento femenino y la construcción de comunidades más justas y seguras.
            </p>
          </Card>

          {/* Guía Virtual Interactiva */}
          <Card 
            variant="outlined" 
            className="text-center p-10 hover:shadow-xl hover:border-primary/40 transition-all duration-300 bg-white"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-ong-detail-1/30 to-ong-base rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-ong-detail-1">
              <span className="text-4xl">💻</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Guía Virtual Interactiva</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Recursos digitales interactivos para facilitar el acceso a información legal y procesos de empoderamiento.
            </p>
          </Card>

          {/* Galería/Comunidad */}
          <Card 
            variant="outlined" 
            className="text-center p-10 hover:shadow-xl hover:border-primary/40 transition-all duration-300 bg-white"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-ong-detail-1/30 to-ong-base rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-ong-detail-1">
              <span className="text-4xl">🤝</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Galería/Comunidad</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Espacios de encuentro y participación donde las mujeres pueden compartir experiencias y fortalecer sus redes de apoyo.
            </p>
          </Card>
        </div>

        {/* Proyecto Empodera Mujer */}
        <Card variant="outlined" className="p-12 bg-white border-2 border-gray-200 shadow-lg">
          <div className="text-center mb-10">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Sobre nuestro proyecto "Empodera Mujer"
            </h3>
            <p className="text-xl lg:text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
              "Empodera Mujer: Descubre y defiende tus derechos" es un proyecto desarrollado por Warmipura en alianza con la Municipalidad Distrital de Hunter y financiado por APORTES.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg px-8 py-4"
            >
              MÁS INFORMACIÓN
            </Button>
            <Button 
              variant="primary" 
              size="lg"
              className="text-lg px-8 py-4"
            >
              LO QUE HACEMOS
            </Button>
          </div>
        </Card>
      </div>
    </Section>
  );
}; 