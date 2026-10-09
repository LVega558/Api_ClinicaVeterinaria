import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const PatientList = React.lazy(() => import('../pages/PatientList'));
const Appointments = React.lazy(() => import('../pages/Appointments'));
const History = React.lazy(() => import('../pages/History'));

const AppRoutes = () => {
  return (
    <Router>
      <MainLayout>
        <Suspense fallback={<div style={{ padding: '2rem' }}>Cargando...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pacientes" element={<PatientList />} />
            <Route path="/citas" element={<Appointments />} />
            <Route path="/historial" element={<History />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;
