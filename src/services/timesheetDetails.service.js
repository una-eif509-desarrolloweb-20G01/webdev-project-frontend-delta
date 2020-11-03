import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
    return http.get(`/timesheetDetails`, { headers: authHeader() });
};

const get = id => {
    return http.get(`/timesheetDetails/${id}`, { headers: authHeader() });
};

const create = data => {
    return http.post("/timesheetDetails", data, { headers: authHeader() });
};

const update = (data) => {
    return http.put(`/timesheetDetails/`, data, { headers: authHeader() });
};

const remove = id => {
    return http.delete(`/timesheetDetails/${id}`, { headers: authHeader() });
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
};