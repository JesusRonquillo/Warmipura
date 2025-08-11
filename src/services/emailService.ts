import { EMAIL_CONFIG } from '../config/email';
import emailjs from '@emailjs/browser';

// Servicio para envío de emails
export interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface JoinEmailData {
  nombres: string;
  apellidos: string;
  dni: string;
  edad: string;
  ciudad: string;
  telefono: string;
  email: string;
  ocupacion: string;
  interes: string;
  experiencia: string;
  cvFile?: File;
}

export class EmailService {
  // Función para enviar email de contacto
  static async sendContactEmail(data: ContactEmailData): Promise<boolean> {
    try {
      // Debug: verificar IDs usados
      console.log('[EmailJS][CONTACT] service:', EMAIL_CONFIG.EMAILJS.SERVICE_ID, 'template:', EMAIL_CONFIG.EMAILJS.CONTACT_TEMPLATE_ID);

      // Usar EmailJS para envío automático
      const result = await emailjs.send(
        EMAIL_CONFIG.EMAILJS.SERVICE_ID,
        EMAIL_CONFIG.EMAILJS.CONTACT_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message
        },
        EMAIL_CONFIG.EMAILJS.PUBLIC_KEY
      );
      
      return result.status === 200;
    } catch (error) {
      console.error('Error enviando email de contacto:', error);
      return false;
    }
  }

  // Función para enviar email de inscripción con variables (sin adjuntos)
  static async sendJoinEmail(data: JoinEmailData): Promise<boolean> {
    try {
      // Debug: verificar IDs usados
      console.log('[EmailJS][JOIN] service:', EMAIL_CONFIG.EMAILJS.SERVICE_ID, 'template:', EMAIL_CONFIG.EMAILJS.JOIN_TEMPLATE_ID);

      // Usar EmailJS para envío automático
      const result = await emailjs.send(
        EMAIL_CONFIG.EMAILJS.SERVICE_ID,
        EMAIL_CONFIG.EMAILJS.JOIN_TEMPLATE_ID,
        {
          nombres: data.nombres,
          apellidos: data.apellidos,
          dni: data.dni,
          edad: data.edad,
          ciudad: data.ciudad,
          telefono: data.telefono,
          email: data.email,
          ocupacion: data.ocupacion,
          interes: data.interes,
          experiencia: data.experiencia,
          cvFile: data.cvFile ? `${data.cvFile.name} (${(data.cvFile.size / 1024 / 1024).toFixed(2)} MB)` : 'No se adjuntó archivo'
        },
        EMAIL_CONFIG.EMAILJS.PUBLIC_KEY
      );
      
      return result.status === 200;
    } catch (error) {
      console.error('Error enviando email de inscripción:', error);
      return false;
    }
  }

  // Envío de inscripción usando sendForm para soportar adjuntos (input type="file")
  static async sendJoinEmailForm(formEl: HTMLFormElement): Promise<boolean> {
    try {
      console.log('[EmailJS][JOIN:sendForm] service:', EMAIL_CONFIG.EMAILJS.SERVICE_ID, 'template:', EMAIL_CONFIG.EMAILJS.JOIN_TEMPLATE_ID);
      const result = await emailjs.sendForm(
        EMAIL_CONFIG.EMAILJS.SERVICE_ID,
        EMAIL_CONFIG.EMAILJS.JOIN_TEMPLATE_ID,
        formEl,
        EMAIL_CONFIG.EMAILJS.PUBLIC_KEY
      );
      return result.status === 200;
    } catch (error) {
      console.error('Error enviando email de inscripción (sendForm):', error);
      return false;
    }
  }
}
