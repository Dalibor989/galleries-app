import axios from 'axios';

class AuthService
{
    constructor() {
        this.apiCall = axios.create({
            baseURL: "http://127.0.0.1:8000/api",
        })

        this.apiCall.interceptors.request.use((config) => {
            const token = localStorage.getItem("token");
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    };

    
}

export default AuthService;