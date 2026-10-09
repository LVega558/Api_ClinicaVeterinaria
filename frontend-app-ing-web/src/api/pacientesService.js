import api from './axios';

export const pacientesService = {
  getLista: async () => {
    const response = await api.get('/api/pacientes/lista');
    return response.data;
  },
  registrar: async (data) => {
    const response = await api.post('/api/pacientes/registrar', data);
    return response.data;
  }
};
