import React from 'react';
import LogotipoPrincipal from '../../assets/icons/Personaje/Carita de puma full color.svg';
import { AppIcon } from '../atoms/AppIcon';

const quickLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Proyectos', href: '#proyectos' },
  { name: 'Warmipura Digital', href: '/warmipura-digital' },
  { name: 'Contáctanos', href: '#contacto' }
];

export const Footer: React.FC = () => {
  return (
    <footer 
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #92400e 100%)' }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                <img className="text-2xl" src={LogotipoPrincipal} alt="ONG Warmipura" />
              </div>
              <h3 className="text-2xl font-bold text-white">ONG Warmipura</h3>
            </div>
            <p className="text-amber-100 mb-6 leading-relaxed">
              "ONG Warmipura es comunidad, justicia y liderazgo. Juntos construimos un futuro libre de violencia."
            </p>
            <p className="text-amber-200 text-sm">
              © ONG Warmipura 2025. Desarrollado con amor para la justicia social.
            </p>
          </div>

          {/* Links principales */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Links principales</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="text-amber-200 hover:text-white transition-colors inline-flex items-center gap-2">
                    <AppIcon icon="lucide:chevron-right" className="text-amber-200" />
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
                <a href="mailto:ongwarmipura.pe@gmail.com" className="text-amber-200 hover:text-white transition-colors inline-flex items-center gap-2">
                  <AppIcon icon="lucide:mail" className="text-amber-200" />
                  ongwarmipura.pe@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:959112264" className="text-amber-200 hover:text-white transition-colors inline-flex items-center gap-2">
                  <AppIcon icon="lucide:phone" className="text-amber-200" />
                  959 112 264
                </a>
              </li>
              <li className="text-amber-200 inline-flex items-center gap-2">
                <AppIcon icon="lucide:map-pin" className="text-amber-200" />
                Calle Melgar 513-517, Arequipa
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-orange-400/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-amber-200 text-sm mb-4 md:mb-0">
              "Mujeres que lideran, comunidades que sanan."
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-amber-200/20 rounded-full flex items-center justify-center hover:bg-amber-200/30 transition-colors">
                <AppIcon icon="lucide:instagram" className="text-amber-200" />
              </a>
              <a href="#" className="w-10 h-10 bg-amber-200/20 rounded-full flex items-center justify-center hover:bg-amber-200/30 transition-colors">
                <AppIcon icon="lucide:facebook" className="text-amber-200" />
              </a>
              <a href="#" className="w-10 h-10 bg-amber-200/20 rounded-full flex items-center justify-center hover:bg-amber-200/30 transition-colors">
                <AppIcon icon="lucide:twitter" className="text-amber-200" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 