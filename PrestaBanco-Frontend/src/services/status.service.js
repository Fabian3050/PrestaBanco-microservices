import httpClient from "../http-common";

const getById = id => {
    return httpClient.get(`/status/${id}`);
}

const create = (data,creditId) => {
    return httpClient.post(`/status/${creditId}`, data);
}

const getByCreditId = creditId => {
    return httpClient.get(`/status/byCreditId/${creditId}`);
}

const getAll = () => {
    return httpClient.get('/status/get');
}

const update = (data,creditId) => {
    return httpClient.put(`/status/${creditId}`, data);
}

const remove = id => {
    return httpClient.delete(`/status/${id}`);
}

export default { getById, create, getByCreditId, getAll, update, remove };