import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/simulate/all');
}

const create = data => {
    return httpClient.post("/simulate/", data);
}

const get = id => {
    return httpClient.get(`/simulate/${id}`);
}

const simulate = id => {
    return httpClient.get(`/simulate/getM/${id}`);
}
export default { getAll, create, get, simulate };