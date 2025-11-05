# Guía de Seguridad - MERN Herramientas AV

Esta guía detalla todas las medidas de seguridad implementadas en la aplicación y las mejores prácticas para mantenerla segura en producción.

## 🔒 Medidas de Seguridad Implementadas

### 1. Protección de Headers HTTP (Helmet)

**Implementado en:** `server/server.js`

```javascript
app.use(helmet({
    contentSecurityPolicy: { ... },
    crossOriginEmbedderPolicy: false,
}));
```

**Protege contra:**
- ✅ Cross-Site Scripting (XSS)
- ✅ Clickjacking
- ✅ MIME type sniffing
- ✅ Información expuesta del servidor

### 2. Rate Limiting (Límite de Peticiones)

**Implementado en:** `server/server.js`

```javascript
// General: 100 peticiones / 15 minutos
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

// Uploads: 10 subidas / 15 minutos
const uploadLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });
```

**Protege contra:**
- ✅ Ataques de fuerza bruta
- ✅ DDoS (Denegación de Servicio)
- ✅ Spam de archivos

### 3. CORS Configurado (Orígenes Permitidos)

**Implementado en:** `server/server.js`

Solo permite peticiones desde dominios autorizados configurados en `.env`:

```javascript
ALLOWED_ORIGINS=http://localhost:3000,https://tu-dominio.com
```

**Protege contra:**
- ✅ Peticiones no autorizadas desde otros dominios
- ✅ Cross-Origin Resource Sharing malicioso

### 4. Sanitización de Datos (NoSQL Injection)

**Implementado en:** `server/server.js`

```javascript
app.use(mongoSanitize({
    replaceWith: '_',
    onSanitize: ({ req, key }) => {
        console.warn(`Intento de inyección detectado en: ${key}`);
    },
}));
```

**Protege contra:**
- ✅ Inyecciones NoSQL
- ✅ Manipulación de queries MongoDB
- ✅ Acceso no autorizado a datos

### 5. Validación de Archivos

**Implementado en:** `server/middleware/validarArchivos.js`

Todas las subidas de archivos pasan por validaciones estrictas:

```javascript
✅ Solo extensiones .xlsx y .xls permitidas
✅ Verificación de MIME type correcto
✅ Tamaño máximo: 10MB por archivo
✅ Validación de número de archivos
```

**Protege contra:**
- ✅ Subida de archivos maliciosos (scripts, ejecutables)
- ✅ Ataques de zip bombs
- ✅ Consumo excesivo de almacenamiento

### 6. Límites de Payload

**Implementado en:** `server/server.js`

```javascript
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
```

**Protege contra:**
- ✅ Ataques de payload masivo
- ✅ Consumo excesivo de memoria

### 7. Manejo Seguro de Errores

**Implementado en:** `server/server.js`

En producción, no expone detalles internos del servidor:

```javascript
if (process.env.NODE_ENV === 'production') {
    res.status(err.status || 500).json({
        error: 'Ha ocurrido un error en el servidor'
    });
}
```

**Protege contra:**
- ✅ Exposición de stack traces
- ✅ Fuga de información sensible del sistema

### 8. Docker con Seguridad Reforzada

**Implementado en:** `docker-compose.yml`

```yaml
security_opt:
  - no-new-privileges:true
read_only: true
tmpfs:
  - /tmp
  - /app/uploads
```

**Protege contra:**
- ✅ Escalada de privilegios en contenedores
- ✅ Modificación del sistema de archivos
- ✅ Persistencia de malware

### 9. Archivos Sensibles Protegidos

**Implementado en:** `.gitignore`

```
server/uploads/     # Archivos de usuarios
.env                # Credenciales
.env.*              # Variables de entorno
```

**Protege contra:**
- ✅ Exposición de datos de clientes
- ✅ Fuga de credenciales en repositorios públicos

### 10. Variables de Entorno Seguras

**Implementado en:** `.env.example`, `server/.env.example`

Todas las credenciales deben configurarse en `.env` (nunca en código):

```env
MONGO_USERNAME=admin
MONGO_PASSWORD=CAMBIA_ESTO_POR_PASSWORD_SEGURO
ALLOWED_ORIGINS=https://tu-dominio.com
```

## 🛡️ Checklist de Seguridad para Producción

Antes de desplegar, verifica:

### Configuración de Servidor

- [ ] **Cambiar credenciales por defecto de MongoDB**
  ```env
  MONGO_USERNAME=admin_produccion
  MONGO_PASSWORD=ContraseñaSúperSegura123!@#
  ```

- [ ] **Configurar orígenes CORS correctamente**
  ```env
  ALLOWED_ORIGINS=https://tu-dominio.com,https://www.tu-dominio.com
  ```

- [ ] **Verificar que NODE_ENV esté en 'production'**
  ```env
  NODE_ENV=production
  ```

- [ ] **No exponer puerto de MongoDB públicamente**
  - En `docker-compose.yml`, eliminar o comentar: `ports: - "27017:27017"`

### Archivos y Datos

- [ ] **Eliminar archivos de uploads del repositorio**
  ```bash
  git rm -r --cached server/uploads/
  ```

- [ ] **Verificar que .env esté en .gitignore**
  ```bash
  cat .gitignore | grep .env
  ```

- [ ] **No commitear .env al repositorio**
  ```bash
  git status  # .env no debe aparecer
  ```

### Contenedores Docker

- [ ] **Usar imágenes oficiales actualizadas**
  - ✅ `mongo:7.0` (actualizada)
  - ✅ `node:18-alpine` (ligera y segura)
  - ✅ `nginx:alpine` (ligera y segura)

- [ ] **Health checks configurados en todos los servicios**

- [ ] **Límites de recursos configurados** (opcional)
  ```yaml
  deploy:
    resources:
      limits:
        cpus: '0.50'
        memory: 512M
  ```

### Red y Firewall

- [ ] **Configurar firewall en el servidor**
  ```bash
  sudo ufw allow 22/tcp    # SSH
  sudo ufw allow 80/tcp    # HTTP
  sudo ufw allow 443/tcp   # HTTPS
  sudo ufw enable
  ```

- [ ] **Cerrar puertos innecesarios**
  - ❌ No exponer puerto 5000 (backend) públicamente
  - ❌ No exponer puerto 27017 (MongoDB) públicamente

- [ ] **Configurar SSL/TLS (HTTPS)**
  ```bash
  sudo certbot --nginx -d tu-dominio.com
  ```

### Monitoreo y Logs

- [ ] **Configurar logs de acceso**
  ```javascript
  // server.js
  const morgan = require('morgan');
  app.use(morgan('combined'));
  ```

- [ ] **Revisar logs regularmente**
  ```bash
  docker-compose logs -f backend
  ```

- [ ] **Configurar alertas de seguridad** (opcional)
  - Usar servicios como Sentry, LogRocket, etc.

## 🚨 Vulnerabilidades a Evitar

### ❌ NO HACER

1. **NO hardcodear credenciales en el código**
   ```javascript
   // ❌ MAL
   mongoose.connect('mongodb://admin:password123@...');
   
   // ✅ BIEN
   mongoose.connect(process.env.MONGODB_URI);
   ```

2. **NO exponer información sensible en logs**
   ```javascript
   // ❌ MAL
   console.log('Password:', password);
   
   // ✅ BIEN
   console.log('Usuario autenticado');
   ```

3. **NO usar dependencias desactualizadas**
   ```bash
   npm audit fix
   npm update
   ```

4. **NO permitir cualquier origen en CORS**
   ```javascript
   // ❌ MAL
   app.use(cors({ origin: '*' }));
   
   // ✅ BIEN
   app.use(cors({ origin: process.env.ALLOWED_ORIGINS.split(',') }));
   ```

5. **NO ejecutar contenedores como root**
   - ✅ Las imágenes Alpine ya usan usuarios no privilegiados

## 🔍 Auditoría de Seguridad

### Revisar Vulnerabilidades en Dependencias

```bash
cd server
npm audit

cd ../client
npm audit
```

**Resolver vulnerabilidades:**
```bash
npm audit fix
# o
npm audit fix --force  # si las automáticas no funcionan
```

### Herramientas de Análisis

#### OWASP Dependency-Check
```bash
npm install -g dependency-check
dependency-check --project server --scan ./server
```

#### Snyk
```bash
npm install -g snyk
snyk test
snyk monitor
```

#### Docker Scan
```bash
docker scan mern-herramientas-backend
```

## 🔐 Mejoras Futuras (Recomendadas)

### 1. Autenticación de Usuarios (JWT)

```bash
npm install jsonwebtoken bcrypt
```

Implementar login/registro con tokens JWT para proteger endpoints sensibles.

### 2. HTTPS en Desarrollo

```bash
npm install --save-dev mkcert
```

Usar certificados locales para pruebas HTTPS.

### 3. Encriptación de Datos Sensibles

```bash
npm install crypto-js
```

Encriptar datos personales antes de almacenarlos en MongoDB.

### 4. Logs Centralizados

Integrar con:
- **ELK Stack** (Elasticsearch, Logstash, Kibana)
- **Graylog**
- **Splunk**

### 5. WAF (Web Application Firewall)

Usar servicios como:
- **Cloudflare** (gratis con plan básico)
- **AWS WAF**
- **Azure WAF**

### 6. Backups Automatizados y Encriptados

```bash
# Backup con encriptación
mongodump --archive | gpg --encrypt > backup.dump.gpg
```

## 📚 Recursos Adicionales

### Documentación

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Docker Security](https://docs.docker.com/engine/security/)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)

### Herramientas de Testing

- [OWASP ZAP](https://www.zaproxy.org/) - Scanner de vulnerabilidades
- [Burp Suite](https://portswigger.net/burp) - Testing de penetración
- [Nmap](https://nmap.org/) - Escaneo de puertos

## 🆘 Incidentes de Seguridad

### Si detectas un problema de seguridad:

1. **NO publiques el problema en issues públicos**
2. **Contacta directamente al mantenedor**
3. **Documenta el problema en detalle**
4. **Espera a que se solucione antes de divulgar**

### Respuesta a Incidentes

1. **Aislar** el sistema comprometido
2. **Revisar logs** para detectar alcance del ataque
3. **Cambiar credenciales** inmediatamente
4. **Actualizar** sistema y dependencias
5. **Documentar** el incidente para prevención futura

---

## ✅ Resumen de Seguridad

La aplicación MERN Herramientas AV implementa **10 capas de seguridad** fundamentales:

1. ✅ Headers HTTP protegidos (Helmet)
2. ✅ Rate limiting contra ataques de fuerza bruta
3. ✅ CORS configurado con dominios permitidos
4. ✅ Sanitización contra NoSQL injection
5. ✅ Validación estricta de archivos subidos
6. ✅ Límites de payload
7. ✅ Manejo seguro de errores en producción
8. ✅ Contenedores Docker reforzados
9. ✅ Archivos sensibles protegidos (.gitignore)
10. ✅ Variables de entorno para credenciales

**La aplicación está lista para producción siguiendo el checklist de esta guía.**

---

**Última actualización:** Noviembre 2025
