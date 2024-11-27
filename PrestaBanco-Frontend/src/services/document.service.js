import httpClient from "../http-common";

const getFile = id => {
    return httpClient.get(`/document/${id}`);
}

const create = id => {
    return httpClient.post(`/document/${id}`);
}

const getAll = () => {
    return httpClient.get(`/simulate/all`);
}

export default { getAll, create, getFile };