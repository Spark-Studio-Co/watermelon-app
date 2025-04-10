import axios from "axios";
import { useAuthStore } from "@/src/entities/registration/api/use-auth-store";

const apiClient = axios.create({
    baseURL: `https://watermelon-backend-production.up.railway.app/api/`,
});

apiClient.interceptors.request.use(
    async (config) => {
        const { token } = useAuthStore.getState();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export { apiClient };