# 🎨 Desplegar Frontend en Railway

## Estado Actual
✅ Backend desplegado: `https://mern-herramientas-av-gestion-production.up.railway.app`
✅ MongoDB conectado
❌ Frontend: **Pendiente de desplegar**

---

## 🚀 Pasos para Desplegar el Frontend

### 1. Crear Servicio de Frontend en Railway

1. Ve a tu proyecto en Railway: https://railway.app
2. Click en **+ New Service**
3. Selecciona **GitHub Repo**
4. Selecciona el mismo repositorio: `sdurutr436/mern-herramientas-av-gestion`

---

### 2. Configurar el Servicio

#### A. Root Directory
En **Settings → Service Settings**:
```
Root Directory: client
```

#### B. Variables de Entorno
En **Settings → Variables**, añade:

```
REACT_APP_API_URL=https://mern-herramientas-av-gestion-production.up.railway.app
```

**Importante**: Esta es la URL de tu backend que ya está funcionando.

---

### 3. Generar URL Pública

1. Ve a **Settings → Networking**
2. Click en **Generate Domain**
3. Railway te dará una URL como: `https://mern-herramientas-av-gestion-production-xxxx.up.railway.app`

**¡Anota esta URL! La necesitarás para actualizar el CORS.**

---

### 4. Actualizar CORS en el Backend

Una vez tengas la URL del frontend, debes actualizar el backend:

1. En Railway, ve al servicio **Backend**
2. Ve a **Variables**
3. Actualiza la variable `ALLOWED_ORIGINS`:

**Cambiar de:**
```
ALLOWED_ORIGINS=*
```

**A:**
```
ALLOWED_ORIGINS=https://tu-frontend-url.up.railway.app
```

4. El backend se redesplegará automáticamente

---

### 5. Verificar Despliegue

#### Frontend:
1. Accede a tu URL del frontend
2. Verifica que la página carga correctamente
3. Navega por las diferentes secciones

#### Conexión Backend-Frontend:
1. Prueba subir un archivo en cualquiera de las herramientas
2. Verifica que no haya errores de CORS en la consola del navegador
3. Comprueba que las peticiones al backend funcionan

---

## 📊 URLs de tu Aplicación

Después del despliegue tendrás:

| Servicio | URL |
|----------|-----|
| **Frontend (Tu Web)** | `https://frontend-xxxx.up.railway.app` |
| **Backend (API)** | `https://mern-herramientas-av-gestion-production.up.railway.app` |
| **Health Check** | `https://mern-herramientas-av-gestion-production.up.railway.app/api/health` |

---

## 🔍 Solución de Problemas

### Error: "Failed to fetch" o errores de red
✅ **Solución**: Verifica que `REACT_APP_API_URL` en el frontend apunte a la URL correcta del backend

### Error: CORS
✅ **Solución**: Actualiza `ALLOWED_ORIGINS` en el backend con la URL exacta del frontend (incluyendo https://)

### La página se ve pero no funciona
✅ **Solución**: 
1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Network"
3. Verifica que las peticiones al backend tengan status 200

### Build falla en Railway
✅ **Solución**: Los archivos `nixpacks.json` ya están configurados correctamente, Railway debería detectarlos automáticamente

---

## ✅ Checklist Final

- [ ] Servicio de Frontend creado en Railway
- [ ] Root Directory configurado: `client`
- [ ] Variable `REACT_APP_API_URL` añadida
- [ ] URL pública generada para el frontend
- [ ] Variable `ALLOWED_ORIGINS` actualizada en el backend
- [ ] Frontend accesible desde navegador
- [ ] No hay errores de CORS
- [ ] Funcionalidades probadas (subir archivos, etc.)

---

## 🎉 ¡Listo!

Una vez completados todos los pasos, tu aplicación estará 100% funcional en internet.

**Tu página web estará en**: `https://tu-frontend-url.up.railway.app`

Puedes compartir esta URL con quien quieras. ¡Tu aplicación está en producción! 🚀

---

## 💡 Próximos Pasos Opcionales

1. **Dominio personalizado**: Puedes configurar tu propio dominio (ej: `miapp.com`)
2. **Monitoreo**: Railway te muestra métricas de uso y logs en tiempo real
3. **Actualizaciones**: Cada `git push` desplegará automáticamente

