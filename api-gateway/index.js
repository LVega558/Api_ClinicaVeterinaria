const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Rutas redirigidas a cada microservicio
app.use('/api/pacientes', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/api/citas', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
app.use('/api/historial', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));

app.get('/estado', (req, res) => {
    res.json({ estado: 'El API Gateway está funcionando', servicios: ['pacientes (3001)', 'citas (3002)', 'historial (3003)'] });
});

app.listen(PORT, () => {
    console.log(`🚀 API Gateway corriendo en http://localhost:${PORT}`);
});
