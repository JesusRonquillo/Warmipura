# Configuración del Servicio de Email - Warmipura

## Descripción
Este proyecto incluye un servicio de email que permite a los usuarios enviar mensajes de contacto y solicitudes de inscripción directamente desde la página web.

## Funcionalidades Implementadas

### 1. Formulario de Contacto
- Nombre, email, asunto y mensaje
- Envía email a `contacto@warmipura.org`
- Validación de campos requeridos

### 2. Formulario de Inscripción (Únete)
- Datos personales completos
- Información adicional y experiencia
- **Subida de CV** (PDF, DOC, DOCX, máximo 5MB)
- Envía email a `recursos.humanos@warmipura.org`

## Métodos de Envío Disponibles

### 1. Mailto (Implementado por defecto)
- **Ventaja**: No requiere configuración adicional
- **Funcionamiento**: Abre el cliente de email del usuario con el mensaje pre-llenado
- **Limitación**: No adjunta archivos CV automáticamente

### 2. EmailJS (Opcional)
- **Ventaja**: Envío automático sin intervención del usuario
- **Requerimientos**: Cuenta de EmailJS y configuración
- **Funcionamiento**: Envía emails directamente desde el navegador

### 3. Backend Personalizado
- **Ventaja**: Control total sobre el proceso de envío
- **Requerimientos**: Servidor backend con endpoint `/api/email/`
- **Funcionamiento**: Envía datos al servidor para procesamiento

## Configuración

### 1. Emails de Destino
Edita `src/config/email.ts`:
```typescript
export const EMAIL_CONFIG = {
  CONTACT_EMAIL: 'tu-email@warmipura.org',
  JOIN_EMAIL: 'recursos-humanos@warmipura.org',
  // ... otras configuraciones
};
```

### 2. Configurar EmailJS (Opcional)
Si quieres usar EmailJS:

1. Instala la dependencia:
```bash
npm install @emailjs/browser
```

2. Crea una cuenta en [EmailJS](https://www.emailjs.com/)

3. Configura en `src/config/email.ts`:
```typescript
EMAILJS: {
  SERVICE_ID: 'tu_service_id',
  CONTACT_TEMPLATE_ID: 'tu_template_contacto',
  JOIN_TEMPLATE_ID: 'tu_template_inscripcion',
  PUBLIC_KEY: 'tu_public_key'
}
```

4. Descomenta el código EmailJS en `src/services/emailService.ts`

### 3. Configurar Backend (Opcional)
Si quieres usar tu propio backend:

1. Crea endpoints en tu servidor:
   - `POST /api/email/contact`
   - `POST /api/email/join`

2. Descomenta el código del backend en `src/services/emailService.ts`

## Uso

### Para Usuarios
1. **Contacto**: Llenar formulario y hacer clic en "Enviar Mensaje"
2. **Inscripción**: Llenar formulario, subir CV (opcional) y hacer clic en "Enviar Inscripción"

### Para Desarrolladores
```typescript
import { EmailService } from './services/emailService';

// Enviar email de contacto
const success = await EmailService.sendContactEmail({
  name: 'Juan Pérez',
  email: 'juan@email.com',
  subject: 'Consulta general',
  message: 'Hola, tengo una pregunta...'
});

// Enviar email de inscripción
const success = await EmailService.sendJoinEmail({
  nombres: 'Juan',
  apellidos: 'Pérez',
  // ... otros campos
  cvFile: file // opcional
});
```

## Notas Importantes

### Archivos CV
- **Formatos aceptados**: PDF, DOC, DOCX
- **Tamaño máximo**: 5MB
- **Validación**: Se valida tipo y tamaño antes de permitir subida
- **Limitación actual**: Con mailto, el archivo no se adjunta automáticamente

### Seguridad
- Los formularios incluyen validación básica del lado del cliente
- Se recomienda implementar validación adicional en el servidor
- Los archivos CV se validan por tipo MIME y tamaño

### Personalización
- Los templates de email se pueden personalizar en `src/services/emailService.ts`
- Los estilos de los formularios están en `src/components/organisms/ContactSection.tsx`
- Los mensajes de error y éxito se pueden modificar según necesidades

## Solución de Problemas

### Error "No se pudo enviar el email"
- Verifica que el email de destino esté configurado correctamente
- Asegúrate de que el navegador permita abrir aplicaciones de email
- Revisa la consola del navegador para errores específicos

### CV no se sube
- Verifica que el archivo sea PDF, DOC o DOCX
- Asegúrate de que el archivo no exceda 5MB
- Revisa que el navegador soporte la API File

### Problemas con EmailJS
- Verifica que las credenciales estén correctas
- Asegúrate de que los templates existan en tu cuenta
- Revisa la documentación de EmailJS para troubleshooting

## Próximos Pasos Recomendados

1. **Implementar EmailJS** para envío automático de emails
2. **Agregar validación del servidor** para mayor seguridad
3. **Implementar notificaciones** de confirmación por email
4. **Agregar captcha** para prevenir spam
5. **Implementar almacenamiento** de CVs en la nube (S3, etc.)
