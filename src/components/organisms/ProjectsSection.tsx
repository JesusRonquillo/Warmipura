import React from 'react';
import { Section } from '../atoms/Section';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils';

const projects = [
  {
    icon: '👩‍⚖️',
    title: 'Empodera Mujer',
    description: 'Proyecto integral que busca empoderar a las mujeres a través del conocimiento legal y el desarrollo de habilidades de liderazgo.',
    features: ['Talleres de capacitación', 'Asesoría legal gratuita', 'Red de apoyo']
  },
  {
    icon: '📱',
    title: 'Guía Virtual Interactiva',
    description: 'Plataforma digital que simplifica los trámites legales complejos, haciéndolos accesibles para todos.',
    features: ['Tutoriales interactivos', 'Procesos paso a paso', 'Recursos multimedia']
  },
  {
    icon: '🎯',
    title: 'Impacto Bicentenario',
    description: 'Iniciativa que celebra y fortalece el legado de la independencia del Perú a través de proyectos comunitarios.',
    features: ['Eventos culturales', 'Proyectos comunitarios', 'Preservación histórica']
  }
];

export const ProjectsSection: React.FC = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <Section id="proyectos" background="white" className="bg-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Nuestros Proyectos
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Desarrollamos proyectos integrales que promueven la justicia, el empoderamiento y el desarrollo sostenible de las comunidades.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div key={index} style={{ transitionDelay: `${index * 200}ms` }}>
              <Card
                variant="outlined"
                className={cn(
                  "p-8 text-center transition-all duration-500 hover:shadow-xl hover:border-primary/30 hover:scale-105",
                  hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
              >
                <div className="text-4xl mb-4 transform transition-transform duration-300 hover:scale-110">
                  {project.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{project.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                <ul className="text-sm text-gray-500 space-y-2 mb-6">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
                >
                  MÁS INFORMACIÓN
                </Button>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={cn(
            "text-center transition-all duration-1000 delay-500",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <Card variant="elevated" className="bg-gray-50 border border-gray-100 shadow-sm p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Te interesa participar en nuestros proyectos?
            </h3>
            <p className="text-gray-600 mb-6">
              Únete a nosotros y forma parte del cambio que estamos construyendo en las comunidades.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg px-8 py-4 hover:scale-105 transition-all duration-300"
            >
              CONTACTAR WARMIPURA
            </Button>
          </Card>
        </div>
      </div>
    </Section>
  );
}; 