import { useLocation } from 'react-router-dom';

// Importar logos
import LogotipoOngSecundario from '../assets/logo/ong/Logotipo secundario .svg';
import LogotipoOngSlogan from '../assets/logo/ong/Logotipo con slogan.svg';
import LogotipoDigital from '../assets/logo/digital/Logotipo Principal SVG.svg';

export interface LogoConfig {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  brand: 'ong' | 'digital';
}

export const useLogo = (): LogoConfig => {
  const location = useLocation();
  
  // Páginas que usan logo de Digital
  const digitalPages = ['/warmipura-digital'];
  
  const isDigitalPage = digitalPages.some(page => location.pathname.startsWith(page));
  
  if (isDigitalPage) {
    return {
      src: LogotipoDigital,
      alt: 'Warmipura Digital',
      title: 'Warmipura Digital',
      subtitle: 'Tutoriales SUNARP',
      brand: 'digital'
    };
  }
  
  // Por defecto, usar logo secundario de ONG (para header)
  return {
    src: LogotipoOngSecundario,
    alt: 'ONG Warmipura',
    title: 'ONG Warmipura',
    subtitle: 'Justicia y Liderazgo',
    brand: 'ong'
  };
};

// Hook específico para el footer
export const useFooterLogo = (): LogoConfig => {
  return {
    src: LogotipoOngSlogan,
    alt: 'ONG Warmipura',
    title: 'ONG Warmipura',
    subtitle: 'Justicia y Liderazgo',
    brand: 'ong'
  };
};
