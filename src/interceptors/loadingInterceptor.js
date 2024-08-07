import axios from 'axios';

export const setLoadingInterceptor = ({ showLoading, hideLoading }) => {
    axios.interceptors.request.use(
        req => {
            // Evita que se muestre el loading cuando cargamos una imagen a cloudinary
            // La imagen esta en una instancia de FormData (servicio uploadService)
            if (!(req.data instanceof FormData)) showLoading();
            return req;
        },
        error => {
            hideLoading();
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        res => {
            hideLoading();
            return res;
        },
        error => {
            hideLoading();
            return Promise.reject(error);
        }
    );
};

export default setLoadingInterceptor;