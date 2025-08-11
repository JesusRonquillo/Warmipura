import React from 'react';
import type { InputProps } from '../../types';
import { cn } from '../../utils';

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  className,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        className={cn(
          'w-full px-4 py-3 border-2 rounded-lg transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
          'placeholder-gray-400',
          error 
            ? 'border-detail focus:ring-detail' 
            : 'border-gray-300 focus:border-accent',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-detail font-medium">
          {error}
        </p>
      )}
    </div>
  );
}; 