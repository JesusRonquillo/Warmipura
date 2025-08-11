import React, { useState } from 'react';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils';
import { ChevronLeft, ChevronRight, Download, Play } from 'lucide-react';

interface GuideItem {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  pdfUrl?: string;
  videoUrl?: string;
}

interface InteractiveGuideSectionProps {
  guides: GuideItem[];
}

export const InteractiveGuideSection: React.FC<InteractiveGuideSectionProps> = ({ guides }) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextGuide = () => {
    setCurrentIndex((prev) => (prev + 1) % guides.length);
  };

  const prevGuide = () => {
    setCurrentIndex((prev) => (prev - 1 + guides.length) % guides.length);
  };

  const currentGuide = guides[currentIndex];

  return (
    <section id="guia-virtual" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            Guía Virtual Interactiva
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Recursos digitales para facilitar el acceso a información legal y procesos de empoderamiento
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card variant="outlined" className="p-8 bg-white border-gray-200 shadow-sm">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Cover Image */}
              <div className="relative w-full lg:w-1/2">
                <div className="aspect-[3/4] bg-gradient-to-br from-ong-detail-1/20 to-ong-base rounded-lg flex items-center justify-center border-4 border-ong-detail-1">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📖</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {currentGuide.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Guía interactiva
                    </p>
                  </div>
                </div>
                
                {/* Navigation arrows */}
                <button
                  onClick={prevGuide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={nextGuide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {currentGuide.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {currentGuide.description}
                </p>
                
                <div className="space-y-4">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="w-full"
                    onClick={() => window.open(currentGuide.pdfUrl, '_blank')}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Descargar Guía PDF
                  </Button>
                  
                  {currentGuide.videoUrl && (
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={() => window.open(currentGuide.videoUrl, '_blank')}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Ver Video Tutorial
                    </Button>
                  )}
                </div>

                {/* Progress indicators */}
                <div className="flex justify-center space-x-2 mt-8">
                  {guides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={cn(
                        "w-3 h-3 rounded-full transition-colors",
                        index === currentIndex ? "bg-primary" : "bg-gray-300"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}; 