import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  isPreloaded?: boolean;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YWFhYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
  onLoad,
  onError,
  isPreloaded = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Si la imagen ya está precargada, mostrarla inmediatamente
    if (isPreloaded) {
      setIsLoaded(true);
      setIsIntersecting(true);
      onLoad?.();
      return;
    }

    if (!imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isPreloaded, onLoad]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-gray-100 text-gray-500 text-sm rounded",
        className
      )}>
        <div className="text-center p-4">
          <div className="text-2xl mb-2">📷</div>
          <div>Error al cargar imagen</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Skeleton Loading with shimmer effect - solo si no está precargada */}
      {!isLoaded && !isPreloaded && (
        <div className="absolute inset-0 skeleton rounded">
          <div className="h-full w-full bg-gray-200 rounded"></div>
        </div>
      )}
      
      {/* Placeholder - solo si no está precargada y no está en vista */}
      {!isIntersecting && !isPreloaded && (
        <img
          src={placeholder}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      )}
      
      {/* Actual Image with fade-in animation */}
      {(isIntersecting || isPreloaded) && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-all-smooth",
            isLoaded ? "opacity-100 image-fade-in" : "opacity-0"
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={isPreloaded ? "eager" : "lazy"}
        />
      )}
      
      {/* Loading Indicator - solo si no está precargada */}
      {isIntersecting && !isLoaded && !hasError && !isPreloaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 transition-all-smooth">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="text-sm text-gray-600 font-medium">Cargando...</div>
          </div>
        </div>
      )}
    </div>
  );
}; 