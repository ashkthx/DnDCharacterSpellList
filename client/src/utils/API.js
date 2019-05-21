// Dependencies
import axios from "axios";

// Methods for user status
export default {
    userSignup: (userData) => {
        console.log("API: userSignup");
        return axios.post("/api/signup", userData);
    },
    userLogin: (userData) => {
        console.log("API: userLogin");
        return axios.post("/api/login", userData);
    },
    userLogout: () => {
        console.log("API: userLogout");
        return axios.get("/api/logout");
    },
    userInfo: () => {
        console.log("API: userInfo");
        return axios.get("/api/user_data");
    }
};