import axios from 'axios';
import jwtDefaultConfig from './jwtDefaultConfig';
export default class JwtService {
    // ** jwtConfig <= Will be used by this service
    jwtConfig = { ...jwtDefaultConfig };

    // ** For Refreshing Token
    isAlreadyFetchingAccessToken = false;

    // ** For Refreshing Token
    subscribers = [];

    constructor(jwtOverrideConfig: any) {
        this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };

        // ** Request Interceptor
        axios.interceptors.request.use(
            (config) => {
                // ** Get token from localStorage
                const accessToken = this.getToken();

                config.headers.common = {
                    'X-API-Key': process.env.REACT_APP_API_KEY
                };
                // ** If token is present add it to request's Authorization Header
                if (accessToken) {
                    // ** eslint-disable-next-line no-param-reassign
                    config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // ** Add request/response interceptor
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    // addSubscriber(callback) {
    //     this.subscribers.push(callback);
    // }

    getToken() {
        return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
    }

    getRefreshToken() {
        return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
    }

    setToken(value: string) {
        localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
    }

    login(
        ...args: {
            email: string;
            password: string; //             // ** Check: https://pixinvent.ticksy.com/ticket/2413870
        }[]
    ) {
        return axios.post(this.jwtConfig.loginEndpoint, ...args);
    }

    loginInternal(
        ...args: {
            username: string;
            password: string; //             // ** Check: https://pixinvent.ticksy.com/ticket/2413870
        }[]
    ) {
        return axios.post(this.jwtConfig.loginInternalEndpoint, ...args);
    }

    logout(endpoint: string) {
        return axios.post(`${process.env.REACT_APP_API_URL}${endpoint}`);
    }

    register(...args: any[]) {
        return axios.post(this.jwtConfig.registerEndpoint, ...args);
    }

    refreshToken() {
        return axios.post(this.jwtConfig.refreshEndpoint, {
            refresh_token: this.getRefreshToken()
        });
    }
}
