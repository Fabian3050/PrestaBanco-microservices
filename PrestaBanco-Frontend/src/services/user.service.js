import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/user/get');
}

const create = data => {
    return httpClient.post("/user/", data);
}

const getById = id => {
    return httpClient.get(`/user/get/${id}`);
}

const update = (data,userId) => {
    return httpClient.put(`/user/${userId}`,data);
}

const remove = id => {
    return httpClient.delete(`/user/${id}`);
}
export default { getAll, create, getById, update, remove };