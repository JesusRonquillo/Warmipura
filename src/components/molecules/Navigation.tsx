import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../atoms/Button';
import { cn } from '../../utils';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { Link, useLocation } from 'react-router-dom';
import type { NavigationProps } from '../../types';
import LogotipoPrincipal from '../../assets/icons/Logotipo Principal SVG.svg';
import { MessageCircle, X, ChevronDown } from 'lucide-react';
import { Chatbot } from './Chatbot';

export const Navigation: React.FC<NavigationProps> = ({ items, ctaText }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { scrollPosition, scrollDirection } = useScrollPosition();
  const location = useLocation();
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  const isScrolled = scrollPosition > 50;
  const isScrollingUp = scrollDirection === 'up';

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Cerrar dropdowns cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !dropdownRefs.current[activeDropdown]?.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      // Si estamos en la página principal, hacer scroll suave
      if (location.pathname === '/') {
        const element = document.getElementById(href.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Si estamos en otra página, navegar a la principal y luego hacer scroll
        // Usar navigate para evitar recargar la página
        window.location.href = `/${href}`;
      }
    }
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleDropdownToggle = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const handleDropdownItemClick = (href: string) => {
    handleNavClick(href);
    setActiveDropdown(null);
  };

  const scrollToSection = (sectionId: string) => {
    // Si estamos en la página principal, hacer scroll suave
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si estamos en otra página, navegar a la principal y luego hacer scroll
      window.location.href = `/#${sectionId}`;
    }
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrollPosition > 50 ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      )}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <img 
                  src={LogotipoPrincipal} 
                  alt="Warmipura Logo" 
                  className="h-12 w-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {items.map((item, index) => (
                <div key={item.label} className="relative">
                  {item.dropdown ? (
                    // Item con dropdown
                    <div className="relative" ref={(el) => { dropdownRefs.current[item.id] = el; }}>
                      <button
                        onClick={() => handleDropdownToggle(item.id)}
                        className="text-gray-700 hover:text-primary font-medium transition-all duration-300 text-sm relative py-3 flex items-center gap-1 group"
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        {item.label}
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-transform duration-300",
                          activeDropdown === item.id ? "rotate-180" : ""
                        )} />
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div
                        className={cn(
                          "absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl transition-all duration-300 z-50",
                          activeDropdown === item.id ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
                        )}
                        style={{ zIndex: 1000 }}
                      >
                        {/* Arrow indicator */}
                        <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45" />
                        
                        <div className="py-2 relative bg-white rounded-lg">
                          {item.dropdown.map((dropdownItem, idx) => (
                            <div key={dropdownItem.label}>
                              {dropdownItem.href.startsWith('/') ? (
                                <Link
                                  to={dropdownItem.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors duration-200"
                                >
                                  {dropdownItem.label}
                                </Link>
                              ) : (
                                <button
                                  onClick={() => handleDropdownItemClick(dropdownItem.href)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors duration-200"
                                >
                                  {dropdownItem.label}
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Item sin dropdown
                    <div>
                      {item.id === 'digital' ? (
                        // Special animated styling for Digital item
                        <Link
                          to={item.href}
                          className="animate-color-shift font-bold tracking-wider uppercase text-sm relative py-3 transition-all duration-300 hover:scale-105 group"
                          style={{ transitionDelay: `${index * 50}ms` }}
                        >
                          {item.label}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" />
                        </Link>
                      ) : (
                        <>
                          {item.href.startsWith('/') ? (
                            <Link
                              to={item.href}
                              className={cn(
                                'font-medium transition-all duration-300 text-sm relative py-3',
                                'text-gray-700 hover:text-primary',
                                location.pathname === item.href && 'text-primary'
                              )}
                              style={{ transitionDelay: `${index * 50}ms` }}
                            >
                              {item.label}
                              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                            </Link>
                          ) : (
                            <button
                              onClick={() => handleNavClick(item.href)}
                              className="font-medium transition-all duration-300 text-sm relative py-3 group text-gray-700 hover:text-primary"
                              style={{ transitionDelay: `${index * 50}ms` }}
                            >
                              {item.label}
                              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button
                variant="primary"
                size="sm"
                onClick={() => scrollToSection('contacto')}
                className="text-sm px-8 py-3 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {ctaText}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-primary transition-all duration-300 hover:bg-gray-100 rounded-lg"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={cn(
                    'w-5 h-0.5 bg-current transition-all duration-300 origin-center',
                    isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'
                  )}
                />
                <span
                  className={cn(
                    'w-5 h-0.5 bg-current transition-all duration-300',
                    isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  )}
                />
                <span
                  className={cn(
                    'w-5 h-0.5 bg-current transition-all duration-300 origin-center',
                    isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
                  )}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={cn(
              'lg:hidden fixed inset-0 bg-white transition-all duration-300 z-40',
              isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            )}
            style={{ top: '64px' }}
          >
            <div className="container mx-auto px-6 py-8">
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.label} className="transform transition-all duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
                    {item.dropdown ? (
                      <div className="space-y-2">
                        <button
                          onClick={() => handleDropdownToggle(item.id)}
                          className="flex items-center justify-between w-full text-gray-700 hover:text-primary font-medium transition-all duration-300 text-lg hover:translate-x-2"
                        >
                          {item.label}
                          <ChevronDown className={cn(
                            "w-5 h-5 transition-transform duration-300",
                            activeDropdown === item.id ? "rotate-180" : ""
                          )} />
                        </button>
                        
                        {/* Mobile Dropdown Items */}
                        <div className={cn(
                          "ml-4 space-y-2 overflow-hidden transition-all duration-300",
                          activeDropdown === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        )}>
                          {item.dropdown.map((dropdownItem, idx) => (
                            <div key={dropdownItem.label} className="transform transition-all duration-300" style={{ transitionDelay: `${idx * 50}ms` }}>
                              {dropdownItem.href.startsWith('/') ? (
                                <Link
                                  to={dropdownItem.href}
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    setActiveDropdown(null);
                                  }}
                                  className="block text-gray-600 hover:text-primary font-medium transition-all duration-300 text-base hover:translate-x-2"
                                >
                                  {dropdownItem.label}
                                </Link>
                              ) : (
                                <button
                                  onClick={() => handleDropdownItemClick(dropdownItem.href)}
                                  className="block w-full text-left text-gray-600 hover:text-primary font-medium transition-all duration-300 text-base hover:translate-x-2"
                                >
                                  {dropdownItem.label}
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        {item.id === 'digital' ? (
                          // Special animated styling for Digital item in mobile
                          <Link
                            to={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block animate-color-shift font-bold tracking-wider uppercase text-lg relative py-3 transition-all duration-300 hover:scale-105 text-center group"
                          >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" />
                          </Link>
                        ) : (
                          <>
                            {item.href.startsWith('/') ? (
                              <Link
                                to={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={cn(
                                  'block font-medium transition-all duration-300 text-lg hover:translate-x-2',
                                  'text-gray-700 hover:text-primary',
                                  location.pathname === item.href && 'text-primary'
                                )}
                              >
                                {item.label}
                              </Link>
                            ) : (
                              <button
                                onClick={() => handleNavClick(item.href)}
                                className="block font-medium transition-all duration-300 text-lg w-full text-left hover:translate-x-2 text-gray-700 hover:text-primary"
                              >
                                {item.label}
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile CTA */}
                <div className="pt-6 border-t border-gray-200 transform transition-all duration-300" style={{ transitionDelay: '400ms' }}>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      scrollToSection('contacto');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-lg py-3 hover:scale-105 transition-all duration-300"
                  >
                    {ctaText}
                  </Button>
                </div>

                {/* Back to Home Button for other pages */}
                {location.pathname !== '/' && (
                  <div className="pt-4 border-t border-gray-200 transform transition-all duration-300" style={{ transitionDelay: '500ms' }}>
                    <Link
                      to="/"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-gray-700 hover:text-primary font-medium transition-all duration-300 text-center py-3 hover:scale-105"
                    >
                      ← Volver al Inicio
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Chatbot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          className={cn(
            'w-16 h-16 bg-gradient-to-r from-digital-primary to-digital-primary text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-white/20',
            isChatbotOpen ? 'scale-110 rotate-12' : 'hover:scale-110 hover:rotate-6'
          )}
        >
          {isChatbotOpen ? (
            <X className="w-7 h-7 transition-all duration-300" />
          ) : (
            <MessageCircle className="w-7 h-7 transition-all duration-300 group-hover:rotate-12" />
          )}
        </button>
      </div>

      {/* Chatbot Component */}
      <Chatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </>
  );
}; 