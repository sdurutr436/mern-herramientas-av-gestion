const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Configuración
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/herramientasAV', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Backend MERN listo!');
});

// Arrancar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Apartamentos (persistente)
const apartamentoRoutes = require('./routes/apartamentoRoutes');
app.use('/api/apartamentos', apartamentoRoutes);

// Correo (temporal en memoria)
const correoRoutes = require('./routes/correoRoutes');
app.use('/api/correo', correoRoutes);

// Contactos (temporal en memoria)
const contactoRoutes = require('./routes/contactoRoutes');
app.use('/api/contactos', contactoRoutes);

// Mapa de calor (temporal en memoria)
const mapaRoutes = require('./routes/mapaRoutes');
app.use('/api/mapa', mapaRoutes);
