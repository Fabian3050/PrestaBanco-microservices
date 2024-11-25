import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/creditEvaluation/get');
}

const create = (id,data) => {
    return httpClient.post(`/creditEvaluation/${id}`,data);
}

const get = (id) => {
    return httpClient.get(`/creditEvaluation/get/${id}`);
}

const getBycreditId = (id) => {
    return httpClient.get(`/creditEvaluation/getCreditId/${id}`);
}

const update = (data) => {
    return httpClient.put("/creditEvaluation/",data);
}

const remove = (id) => {
    return httpClient.delete(`/creditEvaluation/${id}`);
}

export default { getAll, create, get, update, remove, getBycreditId };

