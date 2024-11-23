import httpClient from "../http-common";

const getFile = id => {
    return httpClient.get(`/api/v1/document/${id}`);
}

const create = id => {
    return httpClient.post(`/api/v1/document/${id}`);
}

const getAll = () => {
    return httpClient.get(`/api/v1/simulate/all`);
}

export default { getAll, create, getFile };