const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a BD
const sequelize = new Sequelize(process.env.DB_CITAS || 'bd_citas', process.env.DB_USER || 'admin', process.env.DB_PASSWORD || 'adminpassword', {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5433,
    dialect: 'postgres',
    logging: false
});

// Modelo de Cita
const Cita = sequelize.define('Cita', {
    paciente_id: { type: DataTypes.INTEGER, allowNull: false }, // Guardamos el ID del paciente (viene del otro microservicio)
    fecha: { type: DataTypes.DATE, allowNull: false },
    motivo: { type: DataTypes.STRING, allowNull: false },
    estado: { type: DataTypes.STRING, defaultValue: 'Pendiente' } // Pendiente, Completada, Cancelada
});

sequelize.sync({ alter: true }).then(() => console.log('📦 Tablas de Citas sincronizadas.'));

// Rutas
app.post('/agendar', async (req, res) => {
    try {
        const { paciente_id, fecha, motivo } = req.body;
        const cita = await Cita.create({ paciente_id, fecha, motivo });
        res.json({ mensaje: 'Cita agendada exitosamente', cita });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/lista', async (req, res) => {
    const citas = await Cita.findAll();
    res.json(citas);
});

app.get('/', (req, res) => res.json({ mensaje: 'Bienvenido al Servicio de Citas' }));

const PORT = process.env.CITAS_PORT || 3002;
app.listen(PORT, () => console.log(`📅 Servicio de Citas corriendo en el puerto ${PORT}`));
