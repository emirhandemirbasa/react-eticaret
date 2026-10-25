import axios from "axios";

axios.interceptors.request.use((config) => {
    const session = JSON.parse(localStorage.getItem("session"));

    if (session && session.token) {
        config.headers.Authorization = "Bearer " + session.token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});