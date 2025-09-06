import React from 'react';
import { Card } from '../atoms/Card';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils';
import { AppIcon } from '../atoms/AppIcon';
import { TEAM_IMAGES, getImageUrlFromConfig } from '../../config/images';

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

interface TeamSectionProps {
  members?: TeamMember[];
}

export const TeamSection: React.FC<TeamSectionProps> = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="equipo" className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
            Nuestro equipo
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-4">
            Conoce a las personas que hacen posible el trabajo de Warmipura
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {TEAM_IMAGES.map((member, index) => (
            <Card
              key={member.filename}
              variant="outlined"
              className={cn(
                "text-center p-4 sm:p-6 lg:p-8 hover:shadow-xl hover:border-ong-primary/40 transition-all duration-300 bg-white border-2",
                hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                `delay-${index * 100}`
              )}
            >
              {/* Foto real del equipo */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden mx-auto mb-4 sm:mb-6 lg:mb-8 border-4 border-ong-primary relative">
                <img
                  src={getImageUrlFromConfig(member)}
                  alt={member.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback si la imagen no existe
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                
                {/* Fallback si la imagen no existe */}
                <div className="absolute inset-0 bg-gradient-to-br from-ong-detail-1/20 to-ong-base flex items-center justify-center hidden">
                  <AppIcon icon="lucide:user" className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              
              {/* Banner con logo */}
              <div className="bg-gradient-to-r from-ong-detail-1/20 to-ong-base rounded-lg px-6 py-3 mb-6 border-2 border-ong-detail-1">
                <span className="text-ong-secondary font-bold text-lg">warmipura</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{member.title}</h3>
              <div className="w-16 h-1 bg-ong-detail-1 mx-auto mb-4"></div>
              <p className="text-lg text-gray-700 font-medium">{member.description || 'Miembro del equipo'}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}; 