import React, { useState, useRef } from 'react';
import { Section } from '../atoms/Section';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils';
import { Mail, Phone, MapPin, Clock, User, FileText, Upload, X } from 'lucide-react';
import { EmailService, type ContactEmailData, type JoinEmailData } from '../../services/emailService';

interface ContactData {
  email: string;
  phone: string;
  address: string;
  hours: string;
}

interface ContactSectionProps {
  data: ContactData;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface JoinFormData {
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

export const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState<'contact' | 'join'>('contact');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const joinFormEl = useRef<HTMLFormElement | null>(null);

  // Formulario de contacto
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Formulario de inscripción
  const [joinForm, setJoinForm] = useState<JoinFormData>({
    nombres: '',
    apellidos: '',
    dni: '',
    edad: '',
    ciudad: '',
    telefono: '',
    email: '',
    ocupacion: '',
    interes: '',
    experiencia: ''
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const success = await EmailService.sendContactEmail(contactForm);
      
      if (success) {
        setIsSubmitted(true);
        setContactForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError('Error al enviar el mensaje. Por favor, intenta de nuevo.');
      }
    } catch (err) {
      setError('Error al enviar el mensaje. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const joinData: JoinEmailData = {
        ...joinForm,
        cvFile: cvFile || undefined,
      };

      const success = await EmailService.sendJoinEmail(joinData);
      if (success) {
        setIsSubmitted(true);
        setJoinForm({
          nombres: '', apellidos: '', dni: '', edad: '', ciudad: '',
          telefono: '', email: '', ocupacion: '', interes: '', experiencia: ''
        });
        setCvFile(null);
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError('Error al enviar la inscripción. Por favor, intenta de nuevo.');
      }
    } catch (err) {
      setError('Error al enviar la inscripción. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactChange = (field: keyof ContactFormData, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleJoinChange = (field: keyof JoinFormData, value: string) => {
    setJoinForm(prev => ({ ...prev, [field]: value }));
  };

  // Estado para el archivo CV
  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setError('Por favor, sube un archivo PDF o Word (.doc, .docx)');
        return;
      }
      
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('El archivo es demasiado grande. Máximo 5MB');
        return;
      }
      
      setCvFile(file);
      setError(null);
    }
  };

  const removeCvFile = () => {
    setCvFile(null);
    setError(null);
  };

  return (
    <Section id="contacto" className="bg-gray-50 py-24">
      <div className="container mx-auto px-6">
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-8">
            Contáctanos
          </h2>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Estamos aquí para ayudarte. Envíanos un mensaje o únete a nuestra comunidad
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Tabs de navegación */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('contact')}
                  className={cn(
                    "flex items-center gap-3 px-8 py-4 rounded-xl font-medium transition-all duration-300",
                    activeTab === 'contact'
                      ? "bg-primary text-white shadow-lg"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  )}
                >
                  <Mail className="w-5 h-5" />
                  Contacto
                </button>
                <button
                  onClick={() => setActiveTab('join')}
                  className={cn(
                    "flex items-center gap-3 px-8 py-4 rounded-xl font-medium transition-all duration-300",
                    activeTab === 'join'
                      ? "bg-primary text-white shadow-lg"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  )}
                >
                  <User className="w-5 h-5" />
                  Únete
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulario */}
            <div className="order-2 lg:order-1">
              <Card variant="outlined" className="p-8 bg-white border-gray-200 shadow-sm">
                {activeTab === 'contact' ? (
                  // Formulario de Contacto
                  <div>
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        Envíanos un mensaje
                      </h3>
                      <div className="w-16 h-1 bg-primary mx-auto"></div>
                    </div>

                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">✅</div>
                        <h4 className="text-2xl font-bold text-green-600 mb-2">¡Mensaje enviado!</h4>
                        <p className="text-gray-600">Nos pondremos en contacto contigo pronto.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nombre *
                            </label>
                            <Input
                              name="name"
                              type="text"
                              placeholder="Tu nombre completo"
                              value={contactForm.name}
                              onChange={(value) => handleContactChange('name', value)}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email *
                            </label>
                            <Input
                              name="email"
                              type="email"
                              placeholder="tu@email.com"
                              value={contactForm.email}
                              onChange={(value) => handleContactChange('email', value)}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Asunto *
                          </label>
                          <Input
                            name="subject"
                            type="text"
                            placeholder="Asunto del mensaje"
                            value={contactForm.subject}
                            onChange={(value) => handleContactChange('subject', value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mensaje *
                          </label>
                          <textarea
                            name="message"
                            value={contactForm.message}
                            onChange={(e) => handleContactChange('message', e.target.value)}
                            rows={6}
                            placeholder="Cuéntanos cómo podemos ayudarte..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                            required
                          />
                        </div>
                        {/* Mensajes de error */}
                        {error && (
                          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{error}</p>
                          </div>
                        )}

                        <Button 
                          type="submit" 
                          variant="primary" 
                          size="lg" 
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
                        </Button>
                      </form>
                    )}
                  </div>
                ) : (
                  // Formulario de Inscripción
                  <div>
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        Únete a nuestra comunidad
                      </h3>
                      <div className="w-16 h-1 bg-primary mx-auto"></div>
                    </div>

                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">✅</div>
                        <h4 className="text-2xl font-bold text-green-600 mb-2">¡Inscripción exitosa!</h4>
                        <p className="text-gray-600">Nos pondremos en contacto contigo pronto.</p>
                      </div>
                    ) : (
                      <form ref={joinFormEl} onSubmit={handleJoinSubmit} className="space-y-6" encType="multipart/form-data">
                        {/* Datos Personales */}
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Datos Personales
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombres *
                              </label>
                              <Input
                                name="nombres"
                                type="text"
                                placeholder="Tu nombre"
                                value={joinForm.nombres}
                                onChange={(value) => handleJoinChange('nombres', value)}
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Apellidos *
                              </label>
                              <Input
                                name="apellidos"
                                type="text"
                                placeholder="Tu apellido"
                                value={joinForm.apellidos}
                                onChange={(value) => handleJoinChange('apellidos', value)}
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Documento de Identidad *
                              </label>
                              <Input
                                name="dni"
                                type="text"
                                placeholder="DNI, CE, etc."
                                value={joinForm.dni}
                                onChange={(value) => handleJoinChange('dni', value)}
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Edad *
                              </label>
                              <Input
                                name="edad"
                                type="number"
                                placeholder="Tu edad"
                                value={joinForm.edad}
                                onChange={(value) => handleJoinChange('edad', value)}
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ciudad *
                              </label>
                              <Input
                                name="ciudad"
                                type="text"
                                placeholder="Tu ciudad"
                                value={joinForm.ciudad}
                                onChange={(value) => handleJoinChange('ciudad', value)}
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Teléfono
                              </label>
                              <Input
                                name="telefono"
                                type="tel"
                                placeholder="Tu teléfono"
                                value={joinForm.telefono}
                                onChange={(value) => handleJoinChange('telefono', value)}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Información Adicional */}
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Información Adicional
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Correo Electrónico *
                              </label>
                              <Input
                                name="email"
                                type="email"
                                placeholder="tu@email.com"
                                value={joinForm.email}
                                onChange={(value) => handleJoinChange('email', value)}
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ocupación
                              </label>
                              <Input
                                type="text"
                                placeholder="Tu ocupación"
                                value={joinForm.ocupacion}
                                onChange={(value) => handleJoinChange('ocupacion', value)}
                              />
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              ¿En qué área te interesa participar? *
                            </label>
                            <select
                              name="interes"
                              value={joinForm.interes}
                              onChange={(e) => handleJoinChange('interes', e.target.value)}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                              <option value="">Selecciona una opción</option>
                              <option value="asesoria-legal">Asesoría Legal</option>
                              <option value="talleres">Talleres de Empoderamiento</option>
                              <option value="comunidad">Trabajo Comunitario</option>
                              <option value="voluntariado">Voluntariado</option>
                              <option value="otro">Otro</option>
                            </select>
                          </div>

                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              ¿Tienes experiencia previa en trabajo comunitario?
                            </label>
                            <textarea
                              name="experiencia"
                              value={joinForm.experiencia}
                              onChange={(e) => handleJoinChange('experiencia', e.target.value)}
                              rows={3}
                              placeholder="Cuéntanos sobre tu experiencia..."
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                            />
                          </div>

                          {/* Campo de CV */}
                          <div className="mt-4">
                              {/* Mostrar archivo seleccionado */}
                              {cvFile && (
                                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                                  <div className="flex items-center space-x-2">
                                    <FileText className="w-4 h-4 text-green-600" />
                                    <span className="text-sm text-green-700">{cvFile.name}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={removeCvFile}
                                    className="p-1 hover:bg-green-200 rounded-full transition-colors"
                                  >
                                    <X className="w-4 h-4 text-green-600" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                        {/* Mensajes de error */}
                        {error && (
                          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{error}</p>
                          </div>
                        )}

                        <Button 
                          type="submit" 
                          variant="primary" 
                          size="lg" 
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Enviando...' : 'Enviar Inscripción'}
                        </Button>
                      </form>
                    )}
                  </div>
                )}
              </Card>
            </div>

            {/* Información de contacto */}
            <div className="order-1 lg:order-2">
              <div className="space-y-6">
                <Card variant="outlined" className="p-8 bg-white border-gray-200 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de contacto</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Email</h4>
                        <p className="text-gray-600">{data.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Teléfono</h4>
                        <p className="text-gray-600">{data.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Dirección</h4>
                        <p className="text-gray-600">{data.address}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card variant="outlined" className="p-8 bg-white border-gray-200 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Horarios de atención</h3>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Horario</h4>
                      <p className="text-gray-600">{data.hours}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}; 