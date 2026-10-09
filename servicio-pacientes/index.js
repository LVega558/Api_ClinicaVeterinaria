const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a Base de Datos de Pacientes
const sequelize = new Sequelize(process.env.DB_PACIENTES || 'bd_pacientes', process.env.DB_USER || 'admin', process.env.DB_PASSWORD || 'adminpassword', {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5433,
    dialect: 'postgres',
    logging: false
});

// --- MODELOS (Tablas de la base de datos) ---
const Propietario = sequelize.define('Propietario', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING }
});

const Paciente = sequelize.define('Paciente', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    especie: { type: DataTypes.STRING, allowNull: false }, // Perro, Gato, Loro, etc.
    raza: { type: DataTypes.STRING },
    edad: { type: DataTypes.INTEGER }
});

// Relaciones: Un propietario tiene muchos pacientes (mascotas)
Propietario.hasMany(Paciente);
Paciente.belongsTo(Propietario);

// Sincronizar con la base de datos (Crea las tablas automáticamente)
sequelize.sync({ alter: true })
    .then(() => console.log('📦 Tablas de Pacientes sincronizadas.'))
    .catch(err => console.error('❌ Error sincronizando tablas:', err));


// --- RUTAS (Endpoints) ---
app.get('/', (req, res) => res.json({ mensaje: 'Bienvenido al Servicio de Pacientes' }));

// Ruta para registrar una nueva mascota con su dueño
app.post('/registrar', async (req, res) => {
    try {
        const { nombre_propietario, telefono, email, nombre_mascota, especie, raza, edad } = req.body;
        
        // 1. Crear el propietario en la base de datos
        const propietario = await Propietario.create({ nombre: nombre_propietario, telefono, email });
        
        // 2. Crear la mascota asociándola al ID del propietario que acabamos de crear
        const paciente = await Paciente.create({ 
            nombre: nombre_mascota, especie, raza, edad, PropietarioId: propietario.id 
        });

        res.json({ mensaje: 'Paciente registrado exitosamente', paciente, propietario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener todos los pacientes
app.get('/lista', async (req, res) => {
    // Busca todos los pacientes e incluye la información de su propietario
    const pacientes = await Paciente.findAll({ include: Propietario });
    res.json(pacientes);
});

const PORT = process.env.PACIENTES_PORT || 3001;
app.listen(PORT, () => console.log(`⚕️ Servicio de Pacientes corriendo en el puerto ${PORT}`));
