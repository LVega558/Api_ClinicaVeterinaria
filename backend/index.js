const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.API_GATEWAY_PORT || 3000;

app.use(cors());

// Rutas redirigidas a cada microservicio
app.use('/api/pacientes', createProxyMiddleware({ target: process.env.PACIENTES_SERVICE_URL || 'http://localhost:3001', changeOrigin: true }));
app.use('/api/citas', createProxyMiddleware({ target: process.env.CITAS_SERVICE_URL || 'http://localhost:3002', changeOrigin: true }));
app.use('/api/historial', createProxyMiddleware({ target: process.env.HISTORIAL_SERVICE_URL || 'http://localhost:3003', changeOrigin: true }));

app.get('/estado', (req, res) => {
    res.json({ estado: 'El API Gateway está funcionando', servicios: ['pacientes (3001)', 'citas (3002)', 'historial (3003)'] });
});

app.listen(PORT, () => {
    console.log(`🚀 API Gateway corriendo en http://localhost:${PORT}`);
});
