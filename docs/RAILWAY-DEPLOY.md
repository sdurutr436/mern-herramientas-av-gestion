# 🚂 Guía de Despliegue en Railway

## Configuración Completa - 3 Servicios

Tu aplicación en Railway necesita **3 servicios separados**:

1. **MongoDB** (Base de datos)
2. **Backend** (Node.js/Express) 
3. **Frontend** (React)

---

## 📋 Paso a Paso

### 1. Crear Proyecto en Railway

1. Ve a [railway.app](https://railway.app)
2. Login con GitHub
3. **New Project** → **Deploy from GitHub repo**
4. Selecciona: `sdurutr436/mern-herramientas-av-gestion`

---

### 2. Añadir MongoDB

1. En tu proyecto, click **+ New**
2. Selecciona **Database** → **Add MongoDB**
3. Railway creará automáticamente el servicio
4. Copia la variable `MONGO_URL` (la necesitarás)

---

### 3. Configurar Backend (Servicio 1)

1. Click **+ New** → **GitHub Repo** (mismo repositorio)
2. Railway detectará el código

#### Configuración del Backend:

**Settings → Service Settings:**
```
Root Directory: server
Start Command: npm start
```

**Variables (Settings → Variables):**
```
NODE_ENV=production
PORT=5000
MONGODB_URI=${{MongoDB.MONGO_URL}}
ALLOWED_ORIGINS=${{Frontend.RAILWAY_PUBLIC_DOMAIN}}
```

**Networking:**
- Click "Generate Domain" para obtener una URL pública
- Anota esta URL (ej: `backend-production-xxxx.up.railway.app`)

---

### 4. Configurar Frontend (Servicio 2)

1. Click **+ New** → **GitHub Repo** (mismo repositorio otra vez)

#### Configuración del Frontend:

**Settings → Service Settings:**
```
Root Directory: client
Build Command: npm install && npm run build
Start Command: npx serve -s build -l $PORT
```

**Variables (Settings → Variables):**
```
REACT_APP_API_URL=https://backend-production-xxxx.up.railway.app
```
*(Reemplaza con la URL de tu backend)*

**Networking:**
- Click "Generate Domain" 
- Esta será tu URL pública final: `https://frontend-production-xxxx.up.railway.app`

---

### 5. Actualizar CORS en Backend

Vuelve al servicio Backend y actualiza la variable:

```
ALLOWED_ORIGINS=https://frontend-production-xxxx.up.railway.app
```
*(Reemplaza con la URL real de tu frontend)*

---

### 6. Configurar Proxy en React (Local)

Para que funcione en desarrollo local también, necesitamos un pequeño cambio:

Crea el archivo `client/src/config.js`:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export default API_URL;
```

Luego en tus componentes, usa:
```javascript
import API_URL from './config';
// En lugar de '/api/...' usa:
fetch(`${API_URL}/api/...`)
```

---

## ✅ Verificación

Después de desplegar, verifica:

1. **MongoDB**: Estado "Active" ✅
2. **Backend**: 
   - Logs sin errores
   - Accede a `https://tu-backend.railway.app/api/health`
   - Debería responder: `{"status":"OK"...}`

3. **Frontend**:
   - Accede a `https://tu-frontend.railway.app`
   - La página se carga correctamente

---

## 🔧 Solución de Problemas

### Backend no conecta a MongoDB
- Verifica que `MONGODB_URI` tenga el valor correcto
- En Variables del Backend, debería estar: `${{MongoDB.MONGO_URL}}`

### Frontend muestra error de CORS
- Verifica `ALLOWED_ORIGINS` en Backend
- Debe ser la URL exacta del Frontend (con https://)

### Frontend no se conecta al Backend
- Verifica `REACT_APP_API_URL` en Variables del Frontend
- Debe ser la URL pública del Backend

---

## 💰 Costos

Railway cobra por uso:
- **Gratis**: $5 USD de crédito/mes
- **Después**: ~$5-10 USD/mes para esta aplicación
- Puedes monitorear el uso en el Dashboard

---

## 🚀 Deploy Automático

Cada vez que hagas `git push` a GitHub, Railway:
- ✅ Detecta los cambios
- ✅ Reconstruye automáticamente
- ✅ Despliega la nueva versión

---

## 📊 Estructura Final

```
Railway Project: mern-herramientas-av-gestion
│
├── MongoDB Service
│   └── MONGO_URL (compartida con Backend)
│
├── Backend Service (server/)
│   ├── Variables:
│   │   ├── MONGODB_URI=${{MongoDB.MONGO_URL}}
│   │   ├── ALLOWED_ORIGINS=${{Frontend.RAILWAY_PUBLIC_DOMAIN}}
│   │   ├── NODE_ENV=production
│   │   └── PORT=5000
│   └── URL: https://backend-xxxx.up.railway.app
│
└── Frontend Service (client/)
    ├── Variables:
    │   └── REACT_APP_API_URL=https://backend-xxxx.up.railway.app
    └── URL: https://frontend-xxxx.up.railway.app ← TU WEB PÚBLICA
```

---

## 🎯 URL Final de tu Aplicación

Tu página web estará disponible en:
```
https://frontend-production-xxxx.up.railway.app
```

¡Comparte esta URL con quien quieras! 🎉

---

## 📝 Notas Importantes

1. **Primer despliegue**: Puede tardar 3-5 minutos
2. **Variables**: Asegúrate de usar `${{NombreServicio.VARIABLE}}` para referencias entre servicios
3. **Dominios personalizados**: Puedes añadir tu propio dominio en Settings → Networking
4. **Logs**: Revisa los logs de cada servicio si algo falla

---

¿Necesitas ayuda con algún paso? ¡Avísame! 🚂
