import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
    return http.get(`/hours`, { headers: authHeader() });
};

const get = id => {
    return http.get(`/hours/${id}`, { headers: authHeader() });
};

const create = data => {
    return http.post("/hours", data, { headers: authHeader() });
};

const update = (data) => {
    return http.put(`/hours/`, data, { headers: authHeader() });
};

const remove = id => {
    return http.delete(`/hours/${id}`, { headers: authHeader() });
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
};