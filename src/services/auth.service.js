import http from "../http-common";

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

export default {
    signup,
    login,
    logout,
    getCurrentUser,
};