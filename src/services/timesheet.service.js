import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
    return http.get(`/timesheets`, { headers: authHeader() });
};

const get = id => {
    return http.get(`/timesheets/${id}`, { headers: authHeader() });
};

const create = data => {
    return http.post("/timesheets", data, { headers: authHeader() });
};

const update = (data) => {
    return http.put(`/timesheets/`, data, { headers: authHeader() });
};

const remove = id => {
    return http.delete(`/timesheets/${id}`, { headers: authHeader() });
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
};