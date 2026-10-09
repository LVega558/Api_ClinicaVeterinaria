import api from './axios';

export const historialService = {
  getLista: async () => {
    const response = await api.get('/api/historial/lista');
    return response.data;
  },
  registrar: async (data) => {
    const response = await api.post('/api/historial/registrar', data);
    return response.data;
  }
};
