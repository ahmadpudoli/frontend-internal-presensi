// ** JWT Service Import
import apiService from './apiService';

// ** Export Service as useJwt
export default function useAPI(jwtOverrideConfig: any) {
    const api = new apiService(jwtOverrideConfig);
    return {
        api
    };
}
