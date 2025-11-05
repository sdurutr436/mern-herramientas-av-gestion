const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();

// Configuración
const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy - necesario para Railway/Heroku/etc
app.set('trust proxy', 1);

// SEGURIDAD - Helmet (protección de headers HTTP)
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    crossOriginEmbedderPolicy: false,
}));

// SEGURIDAD - Rate Limiting (protección contra ataques de fuerza bruta)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // límite de 100 peticiones por IP
    message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde.',
    standardHeaders: true,
    legacyHeaders: false,
});

const uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // límite de 10 uploads por IP
    message: 'Demasiadas subidas de archivos, por favor intenta más tarde.',
});

app.use('/api/', limiter);

// SEGURIDAD - CORS configurado (solo dominios permitidos)
const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ['http://localhost:3000', 'http://localhost'];

app.use(cors({
    origin: function (origin, callback) {
        // Permitir peticiones sin origen (como Postman, curl, apps móviles)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'La política CORS no permite el acceso desde este origen.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    optionsSuccessStatus: 200
}));

// Middleware
app.use(express.json({ limit: '10mb' })); // Limitar tamaño de JSON
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// SEGURIDAD - Sanitización de datos (protección contra NoSQL injection)
app.use(mongoSanitize({
    replaceWith: '_',
    onSanitize: ({ req, key }) => {
        console.warn(`Intento de inyección detectado en: ${key}`);
    },
}));

// Conexión a MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/herramientasAV';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Backend MERN listo!');
});

// Health check endpoint para Docker
app.get('/api/health', (req, res) => {
    const health = {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    };
    res.status(200).json(health);
});

// Arrancar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Apartamentos (persistente)
const apartamentoRoutes = require('./routes/apartamentoRoutes');
app.use('/api/apartamentos', uploadLimiter, apartamentoRoutes);

// Correo (temporal en memoria)
const correoRoutes = require('./routes/correoRoutes');
app.use('/api/correo', uploadLimiter, correoRoutes);

// Contactos (temporal en memoria)
const contactoRoutes = require('./routes/contactoRoutes');
app.use('/api/contactos', uploadLimiter, contactoRoutes);

// Mapa de calor (temporal en memoria)
const mapaRoutes = require('./routes/mapaRoutes');
app.use('/api/mapa', uploadLimiter, mapaRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    
    // No exponer detalles del error en producción
    if (process.env.NODE_ENV === 'production') {
        res.status(err.status || 500).json({
            error: 'Ha ocurrido un error en el servidor',
            message: err.status === 404 ? 'Recurso no encontrado' : 'Error interno del servidor'
        });
    } else {
        res.status(err.status || 500).json({
            error: err.message,
            stack: err.stack
        });
    }
});

// Ruta 404
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});
