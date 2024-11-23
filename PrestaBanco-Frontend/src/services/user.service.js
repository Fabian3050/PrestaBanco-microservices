import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/user/get');
}

const create = data => {
    return httpClient.post("/api/v1/user/", data);
}

const getById = id => {
    return httpClient.get(`/api/v1/user/get/${id}`);
}

const update = data => {
    return httpClient.put('/api/v1/user/', data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/user/${id}`);
}
export default { getAll, create, getById, update, remove };