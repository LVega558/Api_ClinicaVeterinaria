const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a Base de Datos de Historial
const sequelize = new Sequelize('bd_historial', 'admin', 'adminpassword', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('📦 Conectado a la BD de Historial Médico.'))
    .catch(err => console.error('❌ Error conectando a BD de Historial Médico:', err));

// Rutas de prueba
app.get('/', (req, res) => res.json({ mensaje: 'Bienvenido al Servicio de Historial Médico' }));

const PORT = 3003;
app.listen(PORT, () => console.log(`🏥 Servicio de Historial corriendo en el puerto ${PORT}`));
