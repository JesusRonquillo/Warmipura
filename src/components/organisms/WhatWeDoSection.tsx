import React, { useState } from 'react';
import { Section } from '../atoms/Section';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { AppIcon } from '../atoms/AppIcon';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils';
import { EmpoderaMujerModal } from './EmpoderaMujerModal';
import { getImageUrl } from '../../config/images';

export const WhatWeDoSection: React.FC = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Section id="quienes-somos" className="relative bg-gray-50 py-24 overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 opacity-10">
        {/* Imagen de fondo principal - Transparencia */}
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${getImageUrl('transparencia', 'Transparencia_06.jpg')})`
          }}
        />
        
        {/* Imagen decorativa superior derecha - Festi Esperanza */}
        <div 
          className="absolute top-10 right-10 w-64 h-48 rounded-2xl bg-cover bg-center bg-no-repeat shadow-2xl"
          style={{
            backgroundImage: `url(${getImageUrl('festi-esperanza', 'Festi_Esperanza_26.jpg')})`
          }}
        />
        
        {/* Imagen decorativa inferior izquierda - Día de la Madre */}
        <div 
          className="absolute bottom-10 left-10 w-56 h-40 rounded-2xl bg-cover bg-center bg-no-repeat shadow-2xl"
          style={{
            backgroundImage: `url(${getImageUrl('dia-de-la-madre', 'Dia_de_la_madre_10.jpg')})`
          }}
        />
        
        {/* Imagen decorativa centro - Evento Juvenil */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-36 rounded-2xl bg-cover bg-center bg-no-repeat shadow-2xl"
          style={{
            backgroundImage: `url(${getImageUrl('evento-juvenil-cerreno', 'Evento_Juvenil_Cerreño_23.jpg')})`
          }}
        />
        
        {/* Overlay para mejorar legibilidad */}
        <div className="absolute inset-0 bg-white/60" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
            ¿Quienes somos?
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl lg:max-w-5xl mx-auto leading-relaxed px-4">
            <strong>ONG Warmipura</strong> es una organización sin fines de lucro fundada en Arequipa por un grupo de abogadas comprometidas con la defensa de los derechos humanos y la construcción de comunidades justas, seguras y libres de violencia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
          {/* Proyectos */}
          <Card 
            variant="outlined" 
            className="text-center p-6 sm:p-8 lg:p-10 hover:shadow-xl hover:border-primary/40 transition-all duration-300 relative overflow-hidden"
            style={{
              backgroundImage: `url(${getImageUrl('fondo-consursable', 'Impacto_Bicentenario_41.jpg')})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Overlay para mejorar legibilidad */}
            <div className="absolute inset-0 bg-white/80" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-ong-detail-1/30 to-ong-base rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 lg:mb-8 border-4 border-ong-detail-1">
                <AppIcon icon="lucide:folder-open" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-ong-primary" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Proyectos</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                Desarrollamos proyectos integrales enfocados en el empoderamiento femenino y la construcción de comunidades más justas y seguras.
              </p>
            </div>
          </Card>

          {/* Guía Virtual Interactiva */}
          <Card 
            variant="outlined" 
            className="text-center p-6 sm:p-8 lg:p-10 hover:shadow-xl hover:border-primary/40 transition-all duration-300 relative overflow-hidden"
            style={{
              backgroundImage: `url(${getImageUrl('capa-cian', 'Capacitaciones_CIAM_2.jpg')})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Overlay para mejorar legibilidad */}
            <div className="absolute inset-0 bg-white/80" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-ong-detail-1/30 to-ong-base rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 lg:mb-8 border-4 border-ong-detail-1">
                <AppIcon icon="lucide:laptop" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-ong-primary" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Guía Virtual Interactiva</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                Recursos digitales interactivos para facilitar el acceso a información legal y procesos de empoderamiento.
              </p>
            </div>
          </Card>

          {/* Galería/Comunidad */}
          <Card 
            variant="outlined" 
            className="text-center p-6 sm:p-8 lg:p-10 hover:shadow-xl hover:border-primary/40 transition-all duration-300 relative overflow-hidden"
            style={{
              backgroundImage: `url(${getImageUrl('navidad', 'Navidad_en_Jesús_04.jpg')})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Overlay para mejorar legibilidad */}
            <div className="absolute inset-0 bg-white/80" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-ong-detail-1/30 to-ong-base rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 lg:mb-8 border-4 border-ong-detail-1">
                <AppIcon icon="lucide:users" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-ong-primary" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Galería/Comunidad</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                Espacios de encuentro y participación donde las mujeres pueden compartir experiencias y fortalecer sus redes de apoyo.
              </p>
            </div>
          </Card>
        </div>

        {/* Proyecto Empodera Mujer */}
        <Card variant="outlined" className="p-6 sm:p-8 lg:p-12 bg-white border-2 border-gray-200 shadow-lg">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Sobre nuestro proyecto "Empodera Mujer"
            </h3>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 max-w-4xl lg:max-w-5xl mx-auto leading-relaxed px-4">
              "Empodera Mujer: Descubre y defiende tus derechos" es un proyecto desarrollado por Warmipura en alianza con la Municipalidad Distrital de Hunter y financiado por APORTES.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4"
            >
              MÁS INFORMACIÓN
            </Button>
            <Button 
              variant="primary" 
              size="lg"
              className="text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4"
              onClick={() => setIsModalOpen(true)}
            >
              LO QUE HACEMOS
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Modal de Empodera Mujer */}
      <EmpoderaMujerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </Section>
  );
}; 