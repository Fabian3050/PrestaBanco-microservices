import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/creditEvaluation/get');
}

const create = (id,data) => {
    return httpClient.post(`/api/v1/creditEvaluation/${id}`,data);
}

const get = (id) => {
    return httpClient.get(`/api/v1/creditEvaluation/get/${id}`);
}

const getBycreditId = (id) => {
    return httpClient.get(`/api/v1/creditEvaluation/getCreditId/${id}`);
}

const update = (data) => {
    return httpClient.put("/api/v1/creditEvaluation/",data);
}

const remove = (id) => {
    return httpClient.delete(`/api/v1/creditEvaluation/${id}`);
}

export default { getAll, create, get, update, remove, getBycreditId };

