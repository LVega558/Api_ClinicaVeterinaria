import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  PawPrint,
  CalendarDays,
  ClipboardList,
  Bell,
  Search,
  ChevronDown,
} from 'lucide-react';
import '../assets/css/stitch.css';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { to: '/',          label: 'Dashboard',  Icon: LayoutDashboard },
    { to: '/pacientes', label: 'Pacientes',  Icon: PawPrint        },
    { to: '/citas',     label: 'Citas',      Icon: CalendarDays    },
    { to: '/historial', label: 'Historial',  Icon: ClipboardList   },
  ];

  return (
    <div className="stitch-layout">
      {/* Sidebar */}
      <aside className="stitch-sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <PawPrint size={22} color="white" />
          </div>
          <div className="brand-text">
            <h2>Huellitas</h2>
            <p>Sistema Clínica Veterinaria</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ to, label, Icon }) => (
            <Link key={to} to={to} className={path === to ? 'active' : ''}>
              <span className="nav-icon">
                <Icon size={18} />
              </span>
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="stitch-main-wrapper">
        <header className="stitch-header">
          <div className="header-search">
            <span className="search-icon">
              <Search size={16} />
            </span>
            <input type="text" placeholder="Buscar pacientes, citas..." />
          </div>
          <div className="header-actions">
            <button className="icon-btn" title="Notificaciones">
              <Bell size={20} />
            </button>
            <div className="user-profile">
              <div className="avatar">A</div>
              <div className="user-info">
                <span className="user-name">Admin</span>
                <span className="user-role">Veterinario</span>
              </div>
              <ChevronDown size={14} color="var(--on-surface-variant)" />
            </div>
          </div>
        </header>

        <main className="stitch-main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
