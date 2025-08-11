import React from 'react';
import type { ButtonProps } from '../../types/button';
import { cn } from '../../utils';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-accent text-white hover:bg-accent-dark focus:ring-accent shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-white focus:ring-accent',
    ghost: 'text-accent hover:bg-accent/10 focus:ring-accent'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}; 