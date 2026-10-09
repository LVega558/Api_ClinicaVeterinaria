import api from './axios';

export const citasService = {
  getLista: async () => {
    const response = await api.get('/api/citas/lista');
    return response.data;
  },
  agendar: async (data) => {
    const response = await api.post('/api/citas/agendar', data);
    return response.data;
  }
};
