import api from './axios';

export const estadoService = {
  getEstado: async () => {
    const response = await api.get('/estado');
    return response.data;
  }
};
