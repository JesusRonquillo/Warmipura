import React from 'react';
import { AppIcon } from './AppIcon';
import { cn } from '../../utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  className 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={cn(
        "relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden",
        className
      )}>
        {/* Header */}
        <div className="relative flex items-center justify-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 text-center">{title}</h2>
          <button
            onClick={onClose}
            className="absolute right-6 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Cerrar modal"
          >
            <AppIcon icon="lucide:x" className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {children}
        </div>
      </div>
    </div>
  );
};
