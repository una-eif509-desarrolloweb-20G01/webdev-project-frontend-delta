import http from "../http-common";
import authHeader from "./auth-header";

const signup = data => {
    return http.post("/users/sign-up", data);
};

const getDetails = () => {
    return http.get(`/users/details`, { headers: authHeader() });
};

export default {
    signup,
    getDetails
};