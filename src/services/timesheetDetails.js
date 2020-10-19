import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
    return http.get(`/timesheetdetails`, { headers: authHeader() });
};

const get = id => {
    return http.get(`/timesheetdetails/${id}`, { headers: authHeader() });
};

const create = data => {
    return http.post("/timesheetdetails", data, { headers: authHeader() });
};

const update = (data) => {
    return http.put(`/timesheetdetails/`, data, { headers: authHeader() });
};

const remove = id => {
    return http.delete(`/timesheetdetails/${id}`, { headers: authHeader() });
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
};