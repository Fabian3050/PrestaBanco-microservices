import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/credit/get');
}

const create = (id, data) => {
    return httpClient.post(`/api/v1/credit/${id}`, data);
}

// Simplificado el método `get` para que solo acepte `id`
const get = (id) => {
    return httpClient.get(`/api/v1/credit/${id}`);
}

const getById = (id) => {
    return httpClient.get(`/api/v1/credit/get/${id}`);
}

const getTotalCost = (creditId) => {
    return httpClient.get(`/api/v1/credit/getTotalCost/${creditId}`);
}

const getTotalMonthly = (data) => {
    return httpClient.get(`/api/v1/credit/getTotalMonthly`, data);
}

const getCreditById = (id) => {
    return httpClient.get(`/api/v1/credit/getById/${id}`);
}

const updateStatus = (creditId, status) => {
    return httpClient.put(`/api/v1/credit/status/${creditId}`, { status });
  };

const remove = (id) => {
    return httpClient.delete(`/api/v1/credit/${id}`);
}

const getUserRut = data => {
    return httpClient.get(`/api/v1/credit/getUserId`, data);
}

export default { getAll, create, get, getById, remove , getUserRut, getTotalCost, getTotalMonthly, updateStatus , getCreditById};

