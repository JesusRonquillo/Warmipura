import React from 'react';
import type { SectionProps } from '../../types';
import { cn } from '../../utils';

export const Section: React.FC<SectionProps> = ({
  children,
  id,
  background = 'white',
  padding = 'lg',
  className,
  ...props
}) => {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white'
  };

  const paddingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24'
  };

  return (
    <section
      id={id}
      className={cn(
        'w-full',
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}; 