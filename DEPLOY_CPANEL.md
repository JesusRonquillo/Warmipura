# Guía de Despliegue en cPanel - Proyecto Warmipura

## 📋 Preparación Completada

✅ **Configuración de Vite**: Se configuró `base: './'` para rutas relativas
✅ **Compilación exitosa**: El proyecto se compiló sin errores
✅ **Archivo .htaccess**: Creado con configuración para SPA
✅ **Rutas relativas**: Los assets ahora usan rutas relativas (`./assets/`)

## 🚀 Pasos para Desplegar en cPanel

### 1. Acceder a cPanel
1. Inicia sesión en tu cPanel
2. Busca la sección **"Archivos"** y haz clic en **"Administrador de archivos"**

### 2. Navegar al Directorio Público
1. En el Administrador de archivos, navega a la carpeta `public_html`
2. Si tu sitio web estará en un subdirectorio (ej: `public_html/warmipura/`), crea esa carpeta primero

### 3. Subir Archivos
1. **Selecciona todos los archivos** de la carpeta `dist/` de tu proyecto local
2. **Comprime** los archivos en un archivo ZIP
3. En cPanel, **sube el archivo ZIP** a `public_html` (o al subdirectorio correspondiente)
4. **Extrae** el archivo ZIP en cPanel
5. **Elimina** el archivo ZIP después de extraer

### 4. Verificar Archivos Subidos
Asegúrate de que estos archivos estén en tu directorio web:
- `index.html`
- `.htaccess`
- Carpeta `assets/` con todos los archivos CSS, JS e imágenes

### 5. Configurar Dominio (Opcional)
Si usas un subdirectorio:
1. Ve a **"Subdominios"** en cPanel
2. Crea un subdominio que apunte a tu carpeta (ej: `warmipura.tudominio.com`)

## 🔧 Configuración Adicional

### Verificar .htaccess
El archivo `.htaccess` ya está configurado para:
- ✅ Redirigir todas las rutas a `index.html` (necesario para React Router)
- ✅ Configurar caché para mejor rendimiento
- ✅ Habilitar compresión GZIP
- ✅ Configurar headers de seguridad

### Estructura de Archivos en el Servidor
```
public_html/
├── index.html
├── .htaccess
└── assets/
    ├── index-D6o82xPb.js
    ├── index-CUxzy4pD.css
    ├── App-DtjVXyUJ.js
    ├── App-B8CTSuDn.css
    └── [todas las imágenes y otros assets]
```

## 🌐 Acceso al Sitio

Una vez desplegado, tu sitio estará disponible en:
- **Dominio principal**: `https://tudominio.com`
- **Subdirectorio**: `https://tudominio.com/warmipura/`
- **Subdominio**: `https://warmipura.tudominio.com`

## 🐛 Solución de Problemas

### Si las imágenes no cargan:
1. Verifica que la carpeta `assets/` esté completa
2. Revisa que los permisos de archivos sean correctos (644 para archivos, 755 para carpetas)

### Si las rutas no funcionan:
1. Verifica que el archivo `.htaccess` esté presente
2. Asegúrate de que el servidor tenga habilitado `mod_rewrite`

### Si hay errores 404:
1. Verifica que `index.html` esté en la raíz del directorio web
2. Revisa que las rutas en el navegador coincidan con la estructura de archivos

## 📞 Soporte

Si encuentras problemas durante el despliegue:
1. Revisa los logs de error en cPanel
2. Verifica que todos los archivos se subieron correctamente
3. Asegúrate de que el archivo `.htaccess` esté presente y configurado correctamente

---

**¡Tu proyecto Warmipura está listo para ser desplegado! 🎉**
