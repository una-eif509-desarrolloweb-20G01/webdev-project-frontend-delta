import http from "../http-common";
import UserService from "./user.service"

const signup = data => {
    return http.post('/users/sign-up', data);
};

const login = async data => {
    let response;
    try{
        response = await http.post('/login', data);
        console.log(response.headers.authorization);
        if (response.headers.authorization) {
            localStorage.setItem("user.headers", JSON.stringify(response.headers));
            response = await UserService.getDetails();
            if(response.data) localStorage.setItem("user.data", JSON.stringify(response.data));
        }
    }catch(error){
        console.log(error);
    }
    return response;
};

const logout = () => {
    localStorage.removeItem("user.headers");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user.headers"));
};

const getCurrentUserDetails = () => {
    return JSON.parse(localStorage.getItem("user.data"));
};

export default {
    signup,
    login,
    logout,
    getCurrentUser,
    getCurrentUserDetails
};