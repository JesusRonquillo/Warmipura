import React from 'react';
import { Section } from '../atoms/Section';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils';

export const AboutSection: React.FC = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.2
  });

  const projects = [
    {
      icon: '⚖️',
      title: 'Warmipura',
      subtitle: 'ONG de Derechos Humanos',
      description: 'Organización sin fines de lucro fundada en Arequipa por abogadas comprometidas con la defensa de los derechos humanos y la construcción de comunidades justas, seguras y libres de violencia.',
      color: 'bg-primary',
      features: ['Defensa de derechos humanos', 'Asesoría legal gratuita', 'Construcción de comunidades', 'Empoderamiento femenino']
    },
    {
      icon: '💻',
      title: 'Warmipura Digital',
      subtitle: 'Plataforma Educativa',
      description: 'Plataforma de alfabetización digital legal que traduce trámites complejos del sistema peruano a un lenguaje amigable y accesible para todos.',
      color: 'bg-accent',
      features: ['Alfabetización digital', 'Tutoriales interactivos', 'Guías paso a paso', 'Recursos multimedia']
    }
  ];

  const values = [
    {
      icon: '🤝',
      title: 'Comunidad',
      description: 'Construimos comunidades justas, seguras y libres de violencia.'
    },
    {
      icon: '⚖️',
      title: 'Justicia',
      description: 'Defendemos los derechos humanos y promovemos el acceso a la justicia.'
    },
    {
      icon: '👥',
      title: 'Liderazgo',
      description: 'Empoderamos a las personas para que sean líderes en sus comunidades.'
    }
  ];

  return (
    <Section
      id="sobre-nosotros"
      background="gray"
      padding="xl"
      className="relative overflow-hidden"
    >
      {/* Background Pattern - Más colorido */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-detail rounded-full blur-3xl animate-pulse" />
      </div>

      <div ref={elementRef as React.RefObject<HTMLDivElement>} className="relative z-10">
        {/* Header */}
        <div className={cn(
          'text-center mb-16',
          'transform transition-all duration-1000',
          hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        )}>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
            Nuestros Dos Proyectos
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Dos iniciativas complementarias que trabajan juntas para crear un impacto positivo en la comunidad: 
            <strong className="text-accent"> Warmipura</strong> como ONG de derechos humanos y 
            <strong className="text-accent"> Warmipura Digital</strong> como plataforma educativa.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className={cn(
                'transform transition-all duration-1000',
                hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Card variant="elevated" padding="lg" className="h-full group hover:scale-105 transition-transform duration-300">
                {/* Project Header */}
                <div className="flex items-start space-x-6 mb-8">
                  <div className={cn(
                    'w-20 h-20 rounded-2xl flex items-center justify-center text-3xl shadow-lg',
                    project.color
                  )}>
                    {project.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      {project.title}
                    </h3>
                    <p className="text-accent font-semibold text-lg">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Project Description */}
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  {project.description}
                </p>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary text-lg">Características principales:</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <span className="text-accent mr-3 text-lg">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-8">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      const element = document.getElementById('proyectos');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full btn-large"
                  >
                    Conoce más sobre {project.title}
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className={cn(
          'text-center',
          'transform transition-all duration-1000 delay-400',
          hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        )}>
          <h3 className="text-3xl font-bold text-primary mb-8">
            Nuestros Valores Compartidos
          </h3>
          
          <div className="grid sm:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-semibold text-primary mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={cn(
          'mt-16 text-center',
          'transform transition-all duration-1000 delay-600',
          hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        )}>
          <div className="inline-block p-8 bg-base rounded-3xl border-2 border-accent/20 shadow-xl">
            <h3 className="text-2xl font-bold text-primary mb-4">
              ¿Quieres ser parte de nuestro cambio?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Únete a nuestra comunidad y forma parte de la transformación social.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                const element = document.getElementById('contacto');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-large"
            >
              Únete a Nosotros
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}; 