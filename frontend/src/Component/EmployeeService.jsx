import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8085/search'
});

export const getEmployees = () => api.get('/alldata').then(res => res.data);
export const addEmployee = (data) => api.post('/employees', data).then(res => res.data);
export const updateEmployee = (id, data) => api.put(`/updatedata/${id}`, data).then(res => res.data);
export const deleteEmployee = (id) => api.delete(`/deletedata/${id}`).then(res => res.data);