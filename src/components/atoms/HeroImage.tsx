import React, { useState, useEffect } from 'react';
import { LazyImage } from './LazyImage';
import { cn } from '../../utils/cn';

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
}

export const HeroImage: React.FC<HeroImageProps> = ({
  src,
  alt,
  className,
  priority = false,
  fallbackSrc
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload para imágenes prioritarias
  useEffect(() => {
    if (priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
    }
  }, [src, priority]);

  const handleError = () => {
    if (fallbackSrc && fallbackSrc !== currentSrc) {
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <div className={cn('relative w-full h-full', className)}>
      <LazyImage
        src={currentSrc}
        alt={alt}
        className="w-full h-full"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        placeholder={priority ? undefined : undefined}
      />
      
      {/* Loading indicator para imágenes prioritarias */}
      {priority && !isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      )}
    </div>
  );
}; 