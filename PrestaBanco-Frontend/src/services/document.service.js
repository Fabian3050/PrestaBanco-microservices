import httpClient from "../http-common";

const getFile = id => {
    return httpClient.get(`/document/${id}`);
}

const create = (data,id) => {
    return httpClient.post(`/document/${id}`, data);
}

const getAll = () => {
    return httpClient.get(`/document/all`);
}

const getAllByCreditId = creditId => {
    return httpClient.get(`/document/getByCreditId/${creditId}`);
}

export default { getAll, create, getFile , getAllByCreditId };