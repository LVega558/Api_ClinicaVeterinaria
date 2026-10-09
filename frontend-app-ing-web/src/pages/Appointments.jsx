import React, { useEffect, useState } from 'react';
import { citasService } from '../api/citasService';
import { pacientesService } from '../api/pacientesService';
import {
  CalendarDays,
  Plus,
  X,
  Clock,
  PawPrint,
  FileText,
  Loader2,
} from 'lucide-react';

const Appointments = () => {
  const [citas, setCitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [form, setForm] = useState({
    paciente_id: '',
    fecha: '',
    hora: '',
    motivo: '',
  });

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      citasService.getLista(),
      pacientesService.getLista(),
    ])
      .then(([citsData, pacsData]) => {
        setCitas(citsData);
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
      const payload = {
        ...form,
        fecha: form.hora ? `${form.fecha}T${form.hora}:00` : form.fecha,
      };
      await citasService.agendar(payload);
      setShowModal(false);
      setForm({ paciente_id: '', fecha: '', hora: '', motivo: '' });
      fetchData();
      showSnackbar('✓ Cita agendada exitosamente');
    } catch (err) {
      console.error(err);
      showSnackbar('✗ Error al agendar cita');
    }
  };

  const showSnackbar = (msg) => {
    setSnackbar(msg);
    setTimeout(() => setSnackbar(null), 3500);
  };

  const formatFecha = (fecha) => {
    if (!fecha) return '—';
    try {
      return new Date(fecha).toLocaleString('es-MX', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      });
    } catch { return fecha; }
  };

  const getPacienteNombre = (id) => {
    const p = pacientes.find(p => (p.id || p._id) == id);
    return p ? `${p.nombre_mascota} (${p.nombre_propietario})` : `ID: ${id}`;
  };

  const estadoBadge = (estado) => {
    const map = {
      Pendiente: 'badge-warning',
      Completada: 'badge-success',
      Cancelada: 'badge-error',
    };
    return map[estado] || 'badge-primary';
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="page-toolbar">
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '500', color: 'var(--on-background)', marginBottom: '4px' }}>
            Citas
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--on-surface-variant)' }}>
            {citas.length} cita{citas.length !== 1 ? 's' : ''} registrada{citas.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Agendar Cita
        </button>
      </div>

      {/* Table */}
      <div className="stitch-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div className="loading-spinner">
            <Loader2 size={32} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        ) : citas.length === 0 ? (
          <div className="empty-state">
            <CalendarDays size={48} color="var(--disabled)" />
            <p>No hay citas registradas aún.</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              <Plus size={16} /> Agendar primera cita
            </button>
          </div>
        ) : (
          <div className="stitch-table-wrapper">
            <table className="stitch-table">
              <thead>
                <tr>
                  <th>Fecha y Hora</th>
                  <th>Paciente</th>
                  <th>Motivo</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {citas.map((c) => (
                  <tr key={c.id || c._id}>
                    <td style={{ fontWeight: '500', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={14} color="var(--primary)" />
                        {formatFecha(c.fecha)}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <PawPrint size={14} color="var(--on-surface-variant)" />
                        {getPacienteNombre(c.paciente_id)}
                      </div>
                    </td>
                    <td style={{ color: 'var(--on-surface-variant)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FileText size={13} color="var(--on-surface-variant)" />
                        {c.motivo || '—'}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${estadoBadge(c.estado)}`}>
                        {c.estado || 'Pendiente'}
                      </span>
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
                <CalendarDays size={18} color="var(--primary)" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Agendar Cita
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
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Fecha *</label>
                    <input
                      className="form-control"
                      name="fecha"
                      type="date"
                      value={form.fecha}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Hora</label>
                    <input
                      className="form-control"
                      name="hora"
                      type="time"
                      value={form.hora}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Motivo de la Consulta *</label>
                  <textarea
                    className="form-control"
                    name="motivo"
                    value={form.motivo}
                    onChange={handleChange}
                    placeholder="Ej. Consulta general, vacunación, revisión..."
                    rows={3}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-text" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  <CalendarDays size={15} /> Agendar Cita
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

export default Appointments;
