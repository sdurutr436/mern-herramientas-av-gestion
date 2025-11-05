# Herramientas AV - Gestión

Sistema de gestión integral para apartamentos turísticos desarrollado con el stack MERN (MongoDB, Express, React, Node.js). Proporciona herramientas automatizadas para gestionar reservas, contactos y visualización de ocupación.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Despliegue con Docker](#-despliegue-con-docker)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Tecnologías](#-tecnologías)

## ✨ Características

### 1. **Generador de Correos para Llegadas Tardías**
- Filtra automáticamente reservas con llegada >= 20:00h
- Genera texto personalizado para cada huésped
- Incluye información del apartamento y contacto del huésped
- Copia al portapapeles con un clic

### 2. **Exportador de Contactos Google**
- Convierte reservas a formato CSV para Google Contacts
- Agrupa reservas por huésped y teléfono
- Formato profesional con fecha y apartamento
- Descarga directa del archivo generado

### 3. **Mapa de Calor de Ocupación**
- Visualiza ocupación de apartamentos por fecha
- Cruza datos de reservas con base de apartamentos
- Datos JSON estructurados para visualización
- Filtrado por fecha específica

### 4. **Gestión de Apartamentos**
- Importación masiva desde archivos XLSX
- Almacenamiento persistente en MongoDB
- Actualización automática de datos existentes
- Información detallada: dirección, capacidad, ranking, etc.

## 🏗 Arquitectura del Proyecto

```
mern-herramientas-av-gestion/
├── client/                 # Frontend React
│   ├── public/            # Archivos estáticos
│   └── src/
│       ├── atoms/         # Componentes atómicos (Button, Input, etc.)
│       ├── molecules/     # Componentes moleculares (Card, FileUpload, etc.)
│       ├── organisms/     # Componentes complejos (Forms, Results)
│       ├── templates/     # Layouts y plantillas
│       ├── pages/         # Páginas de la aplicación
│       └── css/           # Estilos CSS
│
└── server/                # Backend Node.js/Express
    ├── controllers/       # Lógica de negocio
    ├── models/           # Modelos de MongoDB
    ├── routes/           # Definición de rutas API
    ├── utils/            # Utilidades (parsers XLSX, etc.)
    ├── uploads/          # Archivos temporales subidos
    └── server.js         # Punto de entrada del servidor
```

## 📦 Requisitos Previos

- **Node.js** >= 14.x
- **MongoDB** >= 4.x
- **npm** o **yarn**

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd mern-herramientas-av-gestion
```

### 2. Instalar dependencias del servidor

```bash
cd server
npm install
```

### 3. Instalar dependencias del cliente

```bash
cd ../client
npm install
```

## ⚙ Configuración

### Configuración del Servidor

Edita `server/server.js` para configurar la conexión a MongoDB:

```javascript
mongoose.connect('mongodb://localhost:27017/herramientasAV', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
```

**Nota**: Para producción, usa variables de entorno para credenciales sensibles.

### Puerto del Servidor

Por defecto, el servidor corre en el puerto `5000`. Puedes cambiarlo modificando:

```javascript
const PORT = process.env.PORT || 5000;
```

### Proxy del Cliente

El cliente React está configurado para hacer proxy al backend en `client/package.json`:

```json
"proxy": "http://localhost:5000"
```

## 🎯 Uso

### Iniciar el Servidor

```bash
cd server
node server.js
```

El servidor estará disponible en `http://localhost:5000`

### Iniciar el Cliente

```bash
cd client
npm start
```

La aplicación estará disponible en `http://localhost:3000`

### Flujo de Trabajo Típico

#### 1. Importar Apartamentos
- Navega a `/apartamentos`
- Carga un archivo XLSX con la estructura:
  ```
  ID | Tipología | Grupo | Dirección | Código | Huéspedes | ...
  ```
- Los datos se almacenan permanentemente en MongoDB

#### 2. Generar Correos
- Navega a `/correo`
- Carga archivo XLSX de reservas con columnas:
  - `Hora estimada de llegada`
  - `Check in`
  - `Referencia` (nombre huésped)
  - `Teléfono`
  - `ID Tipologie` (ID apartamento)
- El sistema filtra llegadas >= 20:00h
- Copia el texto generado para enviar por correo

#### 3. Exportar Contactos Google
- Navega a `/contactos`
- Carga archivo XLSX de reservas
- Descarga el CSV generado
- Importa en Google Contacts (categoría "myContacts")

#### 4. Visualizar Mapa de Calor
- Navega a `/mapa`
- Carga archivos de reservas y apartamentos
- Selecciona fecha de consulta
- Obtén datos JSON con ocupación por apartamento

## � Despliegue con Docker

La aplicación está completamente dockerizada y lista para desplegar en cualquier entorno.

### Requisitos

- **Docker** >= 20.x
- **Docker Compose** >= 2.x

### Configuración Rápida

1. **Crea un archivo `.env`** en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
MONGO_USERNAME=admin
MONGO_PASSWORD=tu_password_seguro
MONGO_DB=herramientas
PORT=5000
NODE_ENV=production
```

2. **Construye y levanta los contenedores:**

```bash
docker-compose up -d --build
```

Esto creará y arrancará 3 servicios:
- **MongoDB** (puerto 27017)
- **Backend** (puerto 5000)
- **Frontend** (puerto 80)

3. **Accede a la aplicación:**

Abre tu navegador en `http://localhost`

### Comandos Docker Útiles

**Ver logs en tiempo real:**
```bash
docker-compose logs -f
```

**Ver logs de un servicio específico:**
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

**Detener los contenedores:**
```bash
docker-compose down
```

**Detener y eliminar volúmenes (⚠️ elimina la base de datos):**
```bash
docker-compose down -v
```

**Reconstruir solo un servicio:**
```bash
docker-compose up -d --build backend
```

**Acceder a la shell de un contenedor:**
```bash
docker exec -it mern-herramientas-backend sh
docker exec -it mern-herramientas-frontend sh
docker exec -it mern-herramientas-mongodb mongosh
```

### Arquitectura Docker

```
┌─────────────────────────────────────────────────────────┐
│                   Docker Network                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Frontend   │  │   Backend    │  │   MongoDB    │  │
│  │  (Nginx)     │──│  (Node.js)   │──│  (Database)  │  │
│  │  Port: 80    │  │  Port: 5000  │  │  Port: 27017 │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│         │                  │                  │          │
│         └──────────────────┴──────────────────┘          │
│                    mern-network                          │
└─────────────────────────────────────────────────────────┘
```

### Características del Docker Setup

#### Frontend (React + Nginx)
- **Build multi-etapa** para optimizar tamaño de imagen
- **Nginx** como servidor web de producción
- **Gzip compression** habilitada
- **Cache** de assets estáticos (1 año)
- **Proxy reverso** a backend para `/api/*`
- **React Router** configurado (todas las rutas → `index.html`)

#### Backend (Node.js + Express)
- **Imagen Alpine** para menor tamaño
- **Health check** endpoint en `/api/health`
- **Variables de entorno** para configuración
- **Volumen persistente** para `/uploads`
- **Reinicio automático** con `restart: unless-stopped`

#### MongoDB
- **Imagen oficial** MongoDB 7.0
- **Autenticación** configurada vía variables de entorno
- **Volúmenes persistentes** para datos y configuración
- **Health check** con mongosh ping
- **Inicialización automática** de base de datos

### Volúmenes Persistentes

Los datos se almacenan en volúmenes Docker:

```yaml
volumes:
  mongodb_data:        # Datos de MongoDB
  mongodb_config:      # Configuración de MongoDB
  ./server/uploads:    # Archivos subidos (bind mount)
```

### Health Checks

Todos los servicios tienen health checks configurados:

- **MongoDB**: `mongosh ping` cada 30s
- **Backend**: `wget /api/health` cada 30s
- **Frontend**: `wget localhost:80` cada 30s

### Variables de Entorno

| Variable | Descripción | Por Defecto |
|----------|-------------|-------------|
| `MONGO_USERNAME` | Usuario de MongoDB | `admin` |
| `MONGO_PASSWORD` | Contraseña de MongoDB | `password123` |
| `MONGO_DB` | Nombre de la base de datos | `herramientas` |
| `PORT` | Puerto del backend | `5000` |
| `NODE_ENV` | Entorno Node.js | `production` |

### Despliegue en Producción

Para desplegar en un servidor:

1. **Copia el proyecto al servidor:**
```bash
scp -r . usuario@servidor:/ruta/destino
```

2. **Conecta al servidor:**
```bash
ssh usuario@servidor
```

3. **Configura las variables de entorno:**
```bash
cd /ruta/destino
nano .env
```

4. **Levanta los contenedores:**
```bash
docker-compose up -d --build
```

5. **Configura un dominio (opcional):**
   - Actualiza el proxy de nginx para tu dominio
   - Añade certificados SSL con Let's Encrypt

### Monitorización

**Ver estado de contenedores:**
```bash
docker-compose ps
```

**Ver uso de recursos:**
```bash
docker stats
```

**Verificar health de los servicios:**
```bash
docker inspect mern-herramientas-backend | grep -A 10 Health
```

### Troubleshooting

**El backend no se conecta a MongoDB:**
- Verifica que MongoDB esté healthy: `docker-compose ps`
- Revisa logs: `docker-compose logs mongodb`
- Verifica variables de entorno en `.env`

**El frontend no se conecta al backend:**
- Verifica que el backend esté corriendo: `docker-compose ps`
- Revisa configuración de nginx en `client/nginx.conf`
- Verifica que el proxy apunte a `backend:5000`

**Problemas de permisos en uploads:**
```bash
docker exec -it mern-herramientas-backend sh
mkdir -p /app/uploads
chmod 755 /app/uploads
```

**Reiniciar todos los servicios:**
```bash
docker-compose restart
```

## �📂 Estructura del Proyecto

### Cliente (React)

#### Atomic Design Pattern

El frontend sigue el patrón Atomic Design:

- **Atoms** (`client/src/atoms/`)
  - `Button.jsx`: Botones reutilizables
  - `Input.jsx`: Inputs de formulario
  - `Loader.jsx`: Indicador de carga
  - `FileInput.jsx`: Input de archivos

- **Molecules** (`client/src/molecules/`)
  - `Card.jsx`: Tarjeta contenedora
  - `FileUpload.jsx`: Componente completo de subida
  - `Alert.jsx`: Alertas y notificaciones

- **Organisms** (`client/src/organisms/`)
  - `FormCorreo.jsx`: Formulario de correos
  - `FormContactos.jsx`: Formulario de contactos
  - `FormMapaCalor.jsx`: Formulario de mapa
  - `Resultados.jsx`: Visualización de resultados

- **Templates** (`client/src/templates/`)
  - `MainLayout.jsx`: Layout principal con navegación
  - `HerramientaTemplate.jsx`: Template de herramientas

- **Pages** (`client/src/pages/`)
  - `HomePage.jsx`: Página de inicio
  - `CorreoPage.jsx`: Página de correos
  - `ContactosPage.jsx`: Página de contactos
  - `MapaCalorPage.jsx`: Página de mapa
  - `ApartamentosPage.jsx`: Página de apartamentos

### Servidor (Node.js/Express)

#### Modelos

- `Apartamento.js`: Schema de MongoDB para apartamentos
  ```javascript
  {
    id: Number,           // ID único
    tipologia: String,    // Tipo de apartamento
    direccion: String,    // Dirección completa
    codigo: String,       // Código interno
    huespedesMin: Number, // Capacidad mínima
    huespedesMax: Number, // Capacidad máxima
    city: String,         // Ciudad
    // ...otros campos
  }
  ```

#### Controladores

- `correoController.js`
  - `generarCorreo`: Filtra llegadas tardías y genera texto personalizado

- `contactoController.js`
  - `exportarGoogleContacts`: Genera CSV para Google Contacts
  - `formatearFecha`: Convierte fechas al formato 251031

- `mapaController.js`
  - `obtenerMapaCalor`: Cruza reservas con apartamentos por fecha

- `apartamentoController.js`
  - `importarApartamentos`: Importa masivamente desde XLSX
  - `getAllApartamentos`: Consulta todos los apartamentos

#### Rutas

- `correoRoutes.js`: `POST /api/correo/generar`
- `contactoRoutes.js`: `POST /api/contactos/google`
- `mapaRoutes.js`: `POST /api/mapa/obtener`
- `apartamentoRoutes.js`: 
  - `POST /api/apartamentos/import`
  - `GET /api/apartamentos`

#### Utilidades

- `parseXLSX.js`
  - `parseApartamentosXLSX`: Parser de archivos de apartamentos
  - Mapeo flexible de columnas

- `parseXLSXHuesped.js`
  - Parser de archivos de reservas
  - Normalización de nombres de columnas

## 🔌 API Endpoints

### Correos

**POST** `/api/correo/generar`

Genera texto de correo para llegadas tardías.

**Request:**
- `Content-Type: multipart/form-data`
- `reservas`: archivo XLSX

**Response:**
```json
{
  "correo": "Nombre del huésped: Juan Pérez\n...",
  "total": 5
}
```

### Contactos

**POST** `/api/contactos/google`

Exporta contactos en formato CSV para Google.

**Request:**
- `Content-Type: multipart/form-data`
- `reservas`: archivo XLSX

**Response:**
- Archivo CSV descargable
- Nombre: `YYMMDD_contactos_YYMMDD.csv`

### Mapa de Calor

**POST** `/api/mapa/obtener`

Obtiene datos de ocupación por fecha.

**Request:**
- `Content-Type: multipart/form-data`
- `reservas`: archivo XLSX
- `apartamentos`: archivo XLSX
- `fecha`: string (formato fecha)

**Response:**
```json
{
  "mapa": [
    {
      "id": 1,
      "nombre": "Soto Urban Apartment",
      "direccion": "Calle Example 123",
      "city": "Madrid",
      "ocupacion": 2
    }
  ]
}
```

### Apartamentos

**POST** `/api/apartamentos/import`

Importa apartamentos a la base de datos.

**Request:**
- `Content-Type: multipart/form-data`
- `file`: archivo XLSX

**Response:**
```json
{
  "message": "Importación finalizada",
  "nuevos": 15,
  "repetidos": 3
}
```

**GET** `/api/apartamentos`

Consulta todos los apartamentos almacenados.

**Response:**
```json
[
  {
    "id": 1,
    "tipologia": "Estudio",
    "direccion": "Calle Example 123",
    "codigo": "APT001",
    "huespedesMin": 1,
    "huespedesMax": 2,
    "city": "Madrid"
  }
]
```

## 🛠 Tecnologías

### Frontend
- **React** 19.2.0 - Librería UI
- **React Router DOM** 7.9.5 - Enrutamiento
- **CSS Custom Properties** - Estilos personalizados

### Backend
- **Express** 5.1.0 - Framework web
- **Mongoose** 8.19.2 - ODM para MongoDB
- **Multer** 2.0.2 - Manejo de archivos
- **ExcelJS** 4.4.0 - Parser de XLSX
- **XLSX** 0.18.5 - Utilidad de hojas de cálculo
- **CORS** 2.8.5 - Middleware de CORS

### Base de Datos
- **MongoDB** - Base de datos NoSQL

## 📝 Formato de Archivos

### Archivo de Apartamentos (XLSX)

Columnas esperadas (flexible):
```
ID | Tipología | Grupo | Dirección | Código | Huéspedes | Mín Huéspedes | 
Máx Huéspedes | N. unidades asociadas | Orden | Ranking | City | Canc
```

### Archivo de Reservas (XLSX)

Columnas esperadas (flexible):
```
Referencia | Teléfono | Check in | Hora estimada de llegada | 
ID Tipologie | Habitaciones
```

**Nota**: El parser es flexible y busca variaciones de nombres de columnas.

## 🎨 Sistema de Diseño

### Paleta de Colores

Definida en `client/src/css/variables.css`:

```css
--color-primary: rgb(11, 32, 39);      /* Fondo principal / Botón primario */
--color-secondary: rgb(127, 123, 130); /* Botones neutros, bordes */
--color-accent: rgb(249, 200, 70);     /* Botones destacados, hover */
--color-danger: rgb(137, 6, 32);       /* Botones de borrar, error */
--color-text: rgb(20, 22, 24);         /* Texto principal */
--color-bg: rgb(245, 247, 249);        /* Fondo general */
```

## 📄 Licencia

Este proyecto está bajo licencia ISC.

## 👥 Autor

Sergio Durán Utrera - duruser26 en Git (Hecho desde la cuenta de alumno de IES Rafael Alberti)

---

**Nota**: Los archivos en `server/uploads/` son temporales y se generan durante el procesamiento de archivos. No deben versionarse en producción. Asegúrate de añadir esta carpeta al `.gitignore`.
