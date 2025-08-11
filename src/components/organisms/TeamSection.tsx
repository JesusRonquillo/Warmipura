import React from 'react';
import { Card } from '../atoms/Card';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils';

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

interface TeamSectionProps {
  members: TeamMember[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({ members }) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="equipo" className="bg-white py-24">
      <div className="container mx-auto px-6">
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-20 transition-all duration-1000",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-8">
            Nuestro equipo
          </h2>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Conoce a las personas que hacen posible el trabajo de Warmipura
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {members.map((member, index) => (
            <Card
              key={index}
              variant="outlined"
              className={cn(
                "text-center p-8 hover:shadow-xl hover:border-primary/40 transition-all duration-300 bg-white border-2",
                hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                `delay-${index * 100}`
              )}
            >
              {/* Placeholder para foto */}
              <div className="w-36 h-36 bg-gradient-to-br from-ong-detail-1/20 to-ong-base rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-ong-detail-1">
                <span className="text-5xl">👤</span>
              </div>
              
              {/* Banner con logo */}
              <div className="bg-gradient-to-r from-ong-detail-1/20 to-ong-base rounded-lg px-6 py-3 mb-6 border-2 border-ong-detail-1">
                <span className="text-ong-secondary font-bold text-lg">warmipura</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{member.name}</h3>
              <div className="w-16 h-1 bg-ong-detail-1 mx-auto mb-4"></div>
              <p className="text-lg text-gray-700 font-medium">{member.role}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}; 