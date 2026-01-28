import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const customerAPI = {
  getAll: () => axios.get(`${API_URL}/customers`),
  getByCode: (code) => axios.get(`${API_URL}/customers/${code}`),
  create: (data) => axios.post(`${API_URL}/customers`, data),
  update: (code, data) => axios.put(`${API_URL}/customers/${code}`, data),
  delete: (code) => axios.delete(`${API_URL}/customers/${code}`)
};

export const lotAPI = {
  getAll: () => axios.get(`${API_URL}/lots`),
  getById: (id) => axios.get(`${API_URL}/lots/${id}`),
  create: (data) => axios.post(`${API_URL}/lots`, data),
  update: (id, data) => axios.put(`${API_URL}/lots/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/lots/${id}`)
};