import React from 'react';
import { AppIcon } from '../atoms/AppIcon';
import { useFooterLogo } from '../../hooks/useLogo';

const quickLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Proyectos', href: '#proyectos' },
  { name: 'Warmipura Digital', href: '/warmipura-digital' },
  { name: 'Contáctanos', href: '#contacto' }
];

export const Footer: React.FC = () => {
  const logoConfig = useFooterLogo();
  
  return (
    <footer 
      className="relative overflow-hidden bg-gradient-to-br from-ong-secondary to-ong-tertiary"
    >
      <div className="container mx-auto px-4 py-16 pb-20">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-8">
              <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-lg flex items-center justify-center mr-6">
                <img className="h-full w-auto object-contain" src={logoConfig.src} alt={logoConfig.alt} />
              </div>
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">ONG Warmipura</h3>
                <p className="text-white/80 text-lg">Construyendo un futuro libre de violencia</p>
              </div>
            </div>
            <p className="text-white/90 mb-6 leading-relaxed">
              "ONG Warmipura es comunidad, justicia y liderazgo. Juntos construimos un futuro libre de violencia."
            </p>
            <p className="text-white/70 text-sm">
              © ONG Warmipura 2025. Desarrollado con amor para la justicia social.
            </p>
          </div>

          {/* Links principales */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Links principales</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2">
                    <AppIcon icon="lucide:chevron-right" className="text-white/80" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Datos de contacto */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Datos de contacto</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:ongwarmipura.pe@gmail.com" className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2">
                  <AppIcon icon="lucide:mail" className="text-white/80" />
                  ongwarmipura.pe@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:959112264" className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2">
                  <AppIcon icon="lucide:phone" className="text-white/80" />
                  959 112 264
                </a>
              </li>
              <li className="text-white/80 inline-flex items-center gap-2">
                <AppIcon icon="lucide:map-pin" className="text-white/80" />
                Calle Melgar 513-517, Arequipa
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/20 mt-12 pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              "Mujeres que lideran, comunidades que sanan."
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.instagram.com/warmipura.pe?igsh=MTRqOGpxczkyYWpsbA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                title="Síguenos en Instagram"
              >
                <AppIcon icon="lucide:instagram" className="text-white/80" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61551211194199" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                title="Síguenos en Facebook"
              >
                <AppIcon icon="lucide:facebook" className="text-white/80" />
              </a>
              <a 
                href="https://www.linkedin.com/company/100340961/admin/dashboard/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                title="Conéctate en LinkedIn"
              >
                <AppIcon icon="lucide:linkedin" className="text-white/80" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 