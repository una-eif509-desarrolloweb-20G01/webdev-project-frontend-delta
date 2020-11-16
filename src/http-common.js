import axios from "axios";

export default axios.create({
    baseURL: "https://webdev-backend.herokuapp.com/api/v1/",
    headers: {
        "Content-type": "application/json"
    }
});