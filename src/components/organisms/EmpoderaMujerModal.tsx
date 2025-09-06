import React from 'react';
import { Modal } from '../atoms/Modal';
import { AppIcon } from '../atoms/AppIcon';

interface EmpoderaMujerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmpoderaMujerModal: React.FC<EmpoderaMujerModalProps> = ({ isOpen, onClose }) => {
  const temas = [
    {
      id: 'violencia-familiar',
      title: 'Violencia familiar',
      description: 'Capacitación sobre identificación, prevención y denuncia de violencia familiar, incluyendo tipos de violencia, señales de alerta y recursos de apoyo disponibles.',
      icon: 'lucide:shield-alert'
    },
    {
      id: 'conciliacion-extrajudicial',
      title: 'Conciliación extrajudicial',
      description: 'Formación en procesos de conciliación extrajudicial para resolver conflictos de manera pacífica y efectiva, incluyendo técnicas de mediación y negociación.',
      icon: 'lucide:handshake'
    },
    {
      id: 'derecho-familia',
      title: 'Derecho de familia',
      description: 'Conocimiento sobre derechos y obligaciones en el ámbito familiar, incluyendo temas de custodia, pensión alimenticia, divorcio y protección de menores.',
      icon: 'lucide:scale'
    },
    {
      id: 'acceso-justicia',
      title: 'Acceso a justicia',
      description: 'Orientación sobre cómo acceder al sistema de justicia, incluyendo procedimientos legales, documentación necesaria y recursos gratuitos disponibles.',
      icon: 'lucide:building'
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Lo que hacemos"
      className="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Descripción del proyecto */}
        <div className="bg-gradient-to-r from-ong-primary/10 to-ong-secondary/10 p-6 rounded-xl">
          <p className="text-lg text-gray-700 leading-relaxed">
            Este proyecto formó a un comité de mujeres lideresas del distrito de Hunter para capacitarlas en temas como:
          </p>
        </div>

        {/* Grid de temas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {temas.map((tema) => (
            <div
              key={tema.id}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-ong-primary hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-ong-primary/10 rounded-xl flex items-center justify-center">
                    <AppIcon icon={tema.icon} className="w-6 h-6 text-ong-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {tema.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {tema.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <p className="text-gray-700 leading-relaxed">
            Además, se elaboró una guía impresa y virtual, se realizaron ferias comunitarias, 
            campañas de difusión y actividades de prevención junto a instituciones aliadas.
          </p>
        </div>

        {/* Botón de cierre */}
        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-ong-primary text-white rounded-xl hover:bg-ong-primary/90 transition-colors duration-200 font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
};
