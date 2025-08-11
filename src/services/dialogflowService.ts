// Servicio temporal del chatbot para Warmipura

// Interfaz para los mensajes del chat
export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Clase del servicio del chatbot
export class DialogflowService {
  constructor() {}

  async sendMessage(message: string): Promise<string> {
    // Simular delay de respuesta
    await new Promise(resolve => setTimeout(resolve, 1000));

    const lowerMessage = message.toLowerCase();

    // Respuestas basadas en palabras clave
    if (lowerMessage.includes('asesoría') || lowerMessage.includes('legal')) {
      return `¡Por supuesto! Puedes solicitar asesoría legal gratuita de varias formas:

1. Completa nuestro formulario de contacto en la página
2. Llámanos al +51 999 999 999
3. Escríbenos a info@ongwarmipura.com

Nuestros horarios de atención son:
Lunes a Viernes: 9:00 AM - 6:00 PM
Sábados: 9:00 AM - 1:00 PM

¿Te gustaría que te ayude con algo específico?`;
    }

    if (lowerMessage.includes('proyecto')) {
      return `En Warmipura desarrollamos varios proyectos importantes:

👩‍⚖️ Empodera Mujer: Empoderamiento femenino a través del conocimiento legal
📱 Guía Virtual Interactiva: Simplificación de trámites legales complejos
🎯 Impacto Bicentenario: Proyectos comunitarios y preservación histórica

¿Te interesa participar en alguno de estos proyectos?`;
    }

    if (lowerMessage.includes('ubicado') || lowerMessage.includes('horario')) {
      return `📍 Ubicación: Arequipa, Perú

🕐 Horarios de atención:
Lunes a Viernes: 9:00 AM - 6:00 PM
Sábados: 9:00 AM - 1:00 PM
Domingos: Cerrado

📧 Email: info@ongwarmipura.com
📱 Teléfono: +51 999 999 999`;
    }

    if (lowerMessage.includes('warmipura digital')) {
      return `🌟 Warmipura Digital es nuestra plataforma de alfabetización digital legal que:

• Traduce trámites complejos del sistema peruano a lenguaje amigable
• Te ayuda a conocer y ejercer tus derechos
• Guía paso a paso en procesos como registrar una empresa o comprar un terreno
• Todo con autonomía y seguridad

Puedes acceder a nuestros tutoriales en la sección "Warmipura Digital" de nuestra página.`;
    }

    return '¡Hola! Soy el asistente virtual de Warmipura. Puedo ayudarte con información sobre asesoría legal, nuestros proyectos, ubicación y horarios, o sobre Warmipura Digital. ¿En qué puedo ayudarte?';
  }

  getQuickReplies(): string[] {
    return [
      '¿Cómo solicito asesoría legal?',
      '¿Cuáles son sus proyectos?',
      '¿Dónde están ubicados?',
      '¿Qué es Warmipura Digital?'
    ];
  }
}

// Exportar la instancia del servicio
export const dialogflowService = new DialogflowService(); 