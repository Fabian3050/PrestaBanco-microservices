import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/simulate/');
}

const create = data => {
    return httpClient.post("/api/v1/simulate/", data);
}

const get = id => {
    return httpClient.get(`/api/v1/simulate/${id}`);
}

const simulate = id => {
    return httpClient.get(`/api/v1/simulate/getM/${id}`);
}
export default { getAll, create, get, simulate };