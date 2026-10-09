const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a BD
const sequelize = new Sequelize(process.env.DB_HISTORIAL || 'bd_historial', process.env.DB_USER || 'admin', process.env.DB_PASSWORD || 'adminpassword', {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5433,
    dialect: 'postgres',
    logging: false
});

// Modelo de Historial/Tratamiento
const Tratamiento = sequelize.define('Tratamiento', {
    paciente_id: { type: DataTypes.INTEGER, allowNull: false }, // ID de la mascota
    diagnostico: { type: DataTypes.STRING, allowNull: false },
    medicamento: { type: DataTypes.STRING },
    fecha: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
});

sequelize.sync({ alter: true }).then(() => console.log('📦 Tablas de Historial sincronizadas.'));

// Rutas
app.post('/registrar', async (req, res) => {
    try {
        const { paciente_id, diagnostico, medicamento } = req.body;
        const tratamiento = await Tratamiento.create({ paciente_id, diagnostico, medicamento });
        res.json({ mensaje: 'Historial registrado exitosamente', tratamiento });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/lista', async (req, res) => {
    const historiales = await Tratamiento.findAll();
    res.json(historiales);
});

app.get('/', (req, res) => res.json({ mensaje: 'Bienvenido al Servicio de Historial Médico' }));

const PORT = process.env.HISTORIAL_PORT || 3003;
app.listen(PORT, () => console.log(`🏥 Servicio de Historial corriendo en el puerto ${PORT}`));
