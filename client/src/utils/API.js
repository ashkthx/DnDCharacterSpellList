// Dependencies
import axios from "axios";

// Methods for user status
export default {
    // User methods
    userSignup: (userData) => {
        console.log("API: userSignup");
        return axios.post("/api/user/signup", userData);
    },
    userLogin: (userData) => {
        console.log("API: userLogin");
        return axios.post("/api/user/login", userData);
    },
    userLogout: () => {
        console.log("API: userLogout");
        return axios.get("/api/user/logout");
    },
    userInfo: () => {
        console.log("API: userInfo");
        return axios.get("/api/user/user_data");
    },

    // Character methods
    characterCreate: (characterData) => {        
        console.log("API: characterCreate");
        return axios.post("/api/character/create", characterData);
    },
    characterData: (characterId) => {
        console.log("API: characterData");
        return axios.get("/api/character/data/" + characterId);
    }
};