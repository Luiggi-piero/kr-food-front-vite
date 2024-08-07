import axios from 'axios';

// En cada peticion que se realice, se agregará el token al header
axios.interceptors.request.use(
    req => {
        const user = localStorage.getItem('user');
        const token = JSON.parse(user)?.token;
        if (token) {
            req.headers['access_token'] = token;
        }
        return req;
    },
    error => {
        return Promise.reject(error);
    }
);