const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a Base de Datos de Pacientes
const sequelize = new Sequelize('patients_db', 'admin', 'adminpassword', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('📦 Conectado a la BD de Pacientes.'))
    .catch(err => console.error('❌ Error conectando a BD de Pacientes:', err));

// Rutas de prueba
app.get('/', (req, res) => res.json({ message: 'Bienvenido al Servicio de Pacientes' }));

const PORT = 3001;
app.listen(PORT, () => console.log(`⚕️ Patients Service corriendo en puerto ${PORT}`));
