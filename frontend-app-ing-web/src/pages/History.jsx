import React, { useEffect, useState } from 'react';
import { historialService } from '../api/historialService';
import { pacientesService } from '../api/pacientesService';
import {
  ClipboardList,
  Plus,
  X,
  PawPrint,
  Pill,
  Stethoscope,
  StickyNote,
  Loader2,
  Calendar,
} from 'lucide-react';

const History = () => {
  const [historial, setHistorial] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [form, setForm] = useState({
    paciente_id: '',
    diagnostico: '',
    medicamento: '',
    dosis: '',
    notas: '',
  });

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      historialService.getLista(),
      pacientesService.getLista(),
    ])
      .then(([histData, pacsData]) => {
        setHistorial(histData);
        setPacientes(pacsData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await historialService.registrar(form);
      setShowModal(false);
      setForm({ paciente_id: '', diagnostico: '', medicamento: '', dosis: '', notas: '' });
      fetchData();
      showSnackbar('✓ Historial registrado exitosamente');
    } catch (err) {
      console.error(err);
      showSnackbar('✗ Error al registrar historial');
    }
  };

  const showSnackbar = (msg) => {
    setSnackbar(msg);
    setTimeout(() => setSnackbar(null), 3500);
  };

  const getPacienteNombre = (id) => {
    const p = pacientes.find(p => (p.id || p._id) == id);
    return p ? `${p.nombre_mascota} (${p.nombre_propietario})` : `ID: ${id}`;
  };

  const formatFecha = (fecha) => {
    if (!fecha) return '—';
    try {
      return new Date(fecha).toLocaleDateString('es-MX', {
        day: '2-digit', month: 'short', year: 'numeric',
      });
    } catch { return fecha; }
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="page-toolbar">
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '500', color: 'var(--on-background)', marginBottom: '4px' }}>
            Historial Médico
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--on-surface-variant)' }}>
            {historial.length} registro{historial.length !== 1 ? 's' : ''} en el historial
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Nuevo Registro
        </button>
      </div>

      {/* Table */}
      <div className="stitch-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div className="loading-spinner">
            <Loader2 size={32} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        ) : historial.length === 0 ? (
          <div className="empty-state">
            <ClipboardList size={48} color="var(--disabled)" />
            <p>No hay historiales registrados aún.</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              <Plus size={16} /> Crear primer registro
            </button>
          </div>
        ) : (
          <div className="stitch-table-wrapper">
            <table className="stitch-table">
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Diagnóstico</th>
                  <th>Medicamento</th>
                  <th>Dosis</th>
                  <th>Fecha</th>
                  <th>Notas</th>
                </tr>
              </thead>
              <tbody>
                {historial.map((h) => (
                  <tr key={h.id || h._id}>
                    <td style={{ fontWeight: '500' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <PawPrint size={14} color="var(--primary)" />
                        {getPacienteNombre(h.paciente_id)}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Stethoscope size={13} color="var(--on-surface-variant)" />
                        <span className="badge badge-primary">{h.diagnostico || '—'}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--on-surface)' }}>
                        <Pill size={13} color="var(--secondary)" />
                        {h.medicamento || '—'}
                      </div>
                    </td>
                    <td style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem' }}>
                      {h.dosis || '—'}
                    </td>
                    <td style={{ color: 'var(--on-surface-variant)', whiteSpace: 'nowrap', fontSize: '0.875rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Calendar size={12} />
                        {formatFecha(h.fecha || h.createdAt)}
                      </div>
                    </td>
                    <td style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', maxWidth: '200px' }}>
                      {h.notas ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <StickyNote size={12} />
                          <span title={h.notas}>
                            {h.notas.length > 40 ? h.notas.substring(0, 40) + '...' : h.notas}
                          </span>
                        </div>
                      ) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h3>
                <ClipboardList size={18} color="var(--primary)" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Nuevo Registro de Historial
              </h3>
              <button className="icon-btn" onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Paciente *</label>
                  <select
                    className="form-control"
                    name="paciente_id"
                    value={form.paciente_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar paciente...</option>
                    {pacientes.map((p) => (
                      <option key={p.id || p._id} value={p.id || p._id}>
                        {p.nombre_mascota} — {p.nombre_propietario} ({p.especie})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Diagnóstico *</label>
                  <input
                    className="form-control"
                    name="diagnostico"
                    value={form.diagnostico}
                    onChange={handleChange}
                    placeholder="Ej. Infección respiratoria, control de vacunas..."
                    required
                  />
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Medicamento</label>
                    <input
                      className="form-control"
                      name="medicamento"
                      value={form.medicamento}
                      onChange={handleChange}
                      placeholder="Ej. Amoxicilina"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Dosis</label>
                    <input
                      className="form-control"
                      name="dosis"
                      value={form.dosis}
                      onChange={handleChange}
                      placeholder="Ej. 250mg cada 8h"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Notas Adicionales</label>
                  <textarea
                    className="form-control"
                    name="notas"
                    value={form.notas}
                    onChange={handleChange}
                    placeholder="Observaciones, próxima cita, indicaciones..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-text" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  <Plus size={15} /> Guardar Registro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {snackbar && (
        <div className="snackbar">
          {snackbar}
          <button className="snackbar-action" onClick={() => setSnackbar(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default History;
