const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a Base de Datos de Citas
const sequelize = new Sequelize('bd_citas', 'admin', 'adminpassword', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('📦 Conectado a la BD de Citas.'))
    .catch(err => console.error('❌ Error conectando a BD de Citas:', err));

// Rutas de prueba
app.get('/', (req, res) => res.json({ mensaje: 'Bienvenido al Servicio de Citas' }));

const PORT = 3002;
app.listen(PORT, () => console.log(`📅 Servicio de Citas corriendo en el puerto ${PORT}`));
