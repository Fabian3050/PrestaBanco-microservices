import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/credit/get');
}

const create = (id, data) => {
    return httpClient.post(`/credit/${id}`, data);
}

// Simplificado el método `get` para que solo acepte `id`
const get = (id) => {
    return httpClient.get(`/credit/${id}`);
}

const getById = (id) => {
    return httpClient.get(`/credit/get/${id}`);
}

const getTotalCost = (creditId) => {
    return httpClient.get(`/credit/getTotalCost/${creditId}`);
}

const getTotalMonthly = (data) => {
    return httpClient.get(`/credit/getTotalMonthly`, data);
}

const getCreditByUserId = (id) => {
    return httpClient.get(`/credit/getAllCreditUserId/${id}`);
}

const getCreditById = (id) => {
    return httpClient.get(`/credit/getById/${id}`);
}

const updateStatus = (creditId, status) => {
    return httpClient.put(`/credit/status/${creditId}`, { status });
  };

const remove = (id) => {
    return httpClient.delete(`/credit/${id}`);
}

const getUserRut = data => {
    return httpClient.get(`/credit/getUserId`, data);
}

export default { getAll, create, get, getById, remove , getUserRut, getTotalCost, getTotalMonthly, updateStatus , getCreditById, getCreditByUserId};

