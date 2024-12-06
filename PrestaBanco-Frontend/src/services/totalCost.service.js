import httpClient from "../http-common";

const create = (data,creditId) => {
    return httpClient.post(`/totalCost/${creditId}`, data);
}

const getById = id => {
    return httpClient.get(`/totalCost/getById/${id}`);
}

const getByCreditId = creditId => {
    return httpClient.get(`/totalCost/getByCreditId/${creditId}`);
}

const remove = id => {
    return httpClient.delete(`/totalCost/${id}`);
}

export default { create, getById, getByCreditId, remove };