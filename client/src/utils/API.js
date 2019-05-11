import axios from "axios";

export default {
    userSignup: (userData) => {
        console.log("API: userSignup")
        return axios.post("/api/signup", userData);
    }
};