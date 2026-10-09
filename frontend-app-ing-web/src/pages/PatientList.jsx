import React, { useEffect, useState } from 'react';
import { pacientesService } from '../api/pacientesService';
import {
  PawPrint,
  Plus,
  X,
  User,
  Phone,
  Mail,
  Stethoscope,
  Search,
  Loader2,
} from 'lucide-react';

const PatientList = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    nombre_propietario: '',
    telefono: '',
    email: '',
    nombre_mascota: '',
    especie: '',
    raza: '',
    edad: '',
  });

  const fetchPacientes = () => {
    setLoading(true);
    pacientesService.getLista()
      .then(setPacientes)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPacientes(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await pacientesService.registrar(form);
      setShowModal(false);
      setForm({ nombre_propietario: '', telefono: '', email: '', nombre_mascota: '', especie: '', raza: '', edad: '' });
      fetchPacientes();
      showSnackbar('✓ Paciente registrado exitosamente');
    } catch (err) {
      console.error(err);
      showSnackbar('✗ Error al registrar paciente');
    }
  };

  const showSnackbar = (msg) => {
    setSnackbar(msg);
    setTimeout(() => setSnackbar(null), 3500);
  };

  const especieEmoji = (especie) => {
    const map = { Perro: '🐶', Gato: '🐱', Loro: '🦜', Reptil: '🦎', Otro: '🐾' };
    return map[especie] || '🐾';
  };

  const filtered = pacientes.filter(p =>
    !search ||
    p.nombre_mascota?.toLowerCase().includes(search.toLowerCase()) ||
    p.nombre_propietario?.toLowerCase().includes(search.toLowerCase()) ||
    p.especie?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Toolbar */}
      <div className="page-toolbar">
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '500', color: 'var(--on-background)', marginBottom: '4px' }}>
            Pacientes
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--on-surface-variant)' }}>
            {pacientes.length} paciente{pacientes.length !== 1 ? 's' : ''} registrado{pacientes.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} />
          Registrar Paciente
        </button>
      </div>

      {/* Search bar */}
      <div style={{ marginBottom: 'var(--space-md)' }}>
        <div className="header-search" style={{ width: '100%', maxWidth: '360px' }}>
          <span className="search-icon"><Search size={15} /></span>
          <input
            type="text"
            placeholder="Buscar por nombre, especie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Patient Table */}
      <div className="stitch-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div className="loading-spinner">
            <Loader2 size={32} color="var(--primary)" className="spinner-lucide" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <PawPrint size={48} color="var(--disabled)" />
            <p>{search ? 'No se encontraron coincidencias.' : 'No hay pacientes registrados aún.'}</p>
            {!search && (
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                <Plus size={16} /> Registrar primer paciente
              </button>
            )}
          </div>
        ) : (
          <div className="stitch-table-wrapper">
            <table className="stitch-table">
              <thead>
                <tr>
                  <th>Mascota</th>
                  <th>Especie / Raza</th>
                  <th>Edad</th>
                  <th>Propietario</th>
                  <th>Teléfono</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id || p._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.3rem' }}>{especieEmoji(p.especie)}</span>
                        <span style={{ fontWeight: '600', color: 'var(--on-surface)' }}>{p.nombre_mascota}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-primary" style={{ marginRight: '6px' }}>{p.especie}</span>
                      {p.raza && <span style={{ color: 'var(--on-surface-variant)', fontSize: '0.85rem' }}>{p.raza}</span>}
                    </td>
                    <td style={{ color: 'var(--on-surface-variant)' }}>
                      {p.edad ? `${p.edad} año${p.edad != 1 ? 's' : ''}` : '—'}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <User size={14} color="var(--on-surface-variant)" />
                        <span style={{ fontWeight: '500' }}>{p.nombre_propietario}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        {p.telefono ? <><Phone size={13} />{p.telefono}</> : '—'}
                      </div>
                    </td>
                    <td style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        {p.email ? <><Mail size={13} />{p.email}</> : '—'}
                      </div>
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
                <PawPrint size={18} color="var(--primary)" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Registrar Paciente
              </h3>
              <button className="icon-btn" onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="divider-text">
                  <User size={13} /> Datos del Propietario
                </div>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">Nombre del Propietario *</label>
                    <input
                      className="form-control"
                      name="nombre_propietario"
                      value={form.nombre_propietario}
                      onChange={handleChange}
                      placeholder="Ej. Juan Pérez"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Teléfono *</label>
                    <input
                      className="form-control"
                      name="telefono"
                      type="tel"
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="Ej. 555-1234"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      className="form-control"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                </div>

                <div className="divider-text">
                  <Stethoscope size={13} /> Datos de la Mascota
                </div>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">Nombre de la Mascota *</label>
                    <input
                      className="form-control"
                      name="nombre_mascota"
                      value={form.nombre_mascota}
                      onChange={handleChange}
                      placeholder="Ej. Bella"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Especie *</label>
                    <select
                      className="form-control"
                      name="especie"
                      value={form.especie}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Perro">🐶 Perro</option>
                      <option value="Gato">🐱 Gato</option>
                      <option value="Loro">🦜 Loro</option>
                      <option value="Reptil">🦎 Reptil</option>
                      <option value="Otro">🐾 Otro</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Raza</label>
                    <input
                      className="form-control"
                      name="raza"
                      value={form.raza}
                      onChange={handleChange}
                      placeholder="Ej. Labrador"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Edad (años)</label>
                    <input
                      className="form-control"
                      name="edad"
                      type="number"
                      min="0"
                      max="30"
                      value={form.edad}
                      onChange={handleChange}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-text" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  <Plus size={15} /> Guardar Paciente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Snackbar */}
      {snackbar && (
        <div className="snackbar">
          {snackbar}
          <button className="snackbar-action" onClick={() => setSnackbar(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default PatientList;
