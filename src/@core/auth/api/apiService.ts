import axios from 'axios';
import jwtDefaultConfig from '../jwt/jwtDefaultConfig';
// import useJwt from '@src/auth/jwt/useJwt';
// import { toast } from 'react-toastify';
// import Toast from '@presensi_online/general/components/Toast';
export default class apiService {
    // ** jwtConfig <= Will be used by this service
    jwtConfig = { ...jwtDefaultConfig };

    // ** For Refreshing Token
    isAlreadyFetchingAccessToken = false;

    // ** For Refreshing Token
    subscribers = [];

    constructor(jwtOverrideConfig: {
        loginEndpoint: string;
        registerEndpoint: string;
        refreshEndpoint: string;
        logoutEndpoint: string;
        tokenType: string;
        storageTokenKeyName: string;
        storageRefreshTokenKeyName: string;
    }) {
        this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };
    }

    postData(endpoint: string, ...args: any[]) {
        const response = axios.post(`${process.env.REACT_APP_API_URL}${endpoint}`, ...args);
        return response;
    }

    putData(endpoint: string, ...args: any[]) {
        const response = axios.put(`${process.env.REACT_APP_API_URL}${endpoint}`, ...args);
        return response;
    }

    postDataWithErrorHandling(endpoint: string, ...args: any[]) {
        const response = axios.post(`${process.env.REACT_APP_API_URL}${endpoint}`, ...args);
        return response;
    }

    getData(endpoint: string, ...args: any[]) {
        const response = axios.get(`${process.env.REACT_APP_API_URL}${endpoint}`, ...args);
        return response;
    }
    deleteData(endpoint: string, ...args: any[]) {
        const response = axios.delete(`${process.env.REACT_APP_API_URL}${endpoint}`, ...args);
        return response;
    }
}
