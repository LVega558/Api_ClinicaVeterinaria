import React, { useEffect, useState } from 'react';
import { estadoService } from '../api/estadoService';
import {
  PawPrint,
  CalendarCheck,
  ClipboardList,
  Activity,
  CheckCircle,
  AlertCircle,
  Zap,
  Layers,
} from 'lucide-react';

const Dashboard = () => {
  const [estado, setEstado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    estadoService.getEstado()
      .then(setEstado)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const servicios = estado?.servicios || [];
  const apiActiva = estado?.estado === 'El API Gateway está funcionando';

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Bienvenido al sistema de gestión de la Clínica Veterinaria</p>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon primary">
            <PawPrint size={24} color="var(--primary)" />
          </div>
          <div className="stat-card-value">—</div>
          <div className="stat-card-label">Pacientes Registrados</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon secondary">
            <CalendarCheck size={24} color="var(--secondary)" />
          </div>
          <div className="stat-card-value">—</div>
          <div className="stat-card-label">Citas Programadas</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon success">
            <ClipboardList size={24} color="var(--success)" />
          </div>
          <div className="stat-card-value">—</div>
          <div className="stat-card-label">Historiales Médicos</div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="dashboard-grid">
        {/* Sistema Info */}
        <div className="stitch-card">
          <div className="card-title">
            <Activity size={16} color="var(--primary)" />
            Información del Sistema
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--on-surface-variant)', marginBottom: 'var(--space-md)' }}>
            <strong>Gestión Triage / Derivación</strong> — Sistema de Inventario y Producción Veterinaria
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge badge-success">✓ Operativo</span>
            <span className="badge badge-warning">⚡ Triage Activo</span>
            <span className="badge badge-primary">● Microservicios</span>
          </div>
        </div>

        {/* Estado de API */}
        <div className="stitch-card">
          <div className="card-title">
            <Layers size={16} color="var(--primary)" />
            Estado de Servicios API
          </div>
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : !estado ? (
            <div className="empty-state" style={{ padding: 'var(--space-xl)' }}>
              <AlertCircle size={32} color="var(--on-surface-variant)" />
              <p>No se pudo conectar al API Gateway</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div className="service-item">
                <span className="service-name">API Gateway</span>
                <span className={`badge ${apiActiva ? 'badge-success' : 'badge-error'}`}>
                  {apiActiva ? '✓ Activo' : '✗ Inactivo'}
                </span>
              </div>
              {servicios.map((servicio, index) => (
                <div key={index} className="service-item">
                  <span className="service-name">{servicio.split(' ')[0]}</span>
                  <span className="badge badge-success">✓ Conectado</span>
                </div>
              ))}
              {servicios.length === 0 && (
                <div className="service-item">
                  <span className="service-name" style={{ color: 'var(--on-surface-variant)', fontSize: '0.85rem' }}>
                    Conectando microservicios...
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick Guide */}
      <div className="stitch-card">
        <div className="card-title">
          <Zap size={16} color="var(--primary)" />
          Guía Rápida
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-md)' }}>
          <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', background: 'var(--primary-container)', textAlign: 'center' }}>
            <PawPrint size={28} color="var(--primary)" style={{ marginBottom: '8px' }} />
            <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--primary)' }}>Pacientes</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', marginTop: '4px' }}>Registra y consulta mascotas</div>
          </div>
          <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', background: 'var(--secondary-container)', textAlign: 'center' }}>
            <CalendarCheck size={28} color="var(--secondary)" style={{ marginBottom: '8px' }} />
            <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#e65100' }}>Citas</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', marginTop: '4px' }}>Agenda consultas y revisiones</div>
          </div>
          <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', background: 'var(--success-container)', textAlign: 'center' }}>
            <ClipboardList size={28} color="var(--success)" style={{ marginBottom: '8px' }} />
            <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#2e7d32' }}>Historial</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', marginTop: '4px' }}>Historial médico completo</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
