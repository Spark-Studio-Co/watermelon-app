import axios from "axios";
import Constants from 'expo-constants';

const devServerIp = Constants.expoConfig?.hostUri?.split(':')[0] || 'localhost';

export const apiClient = axios.create({
    baseURL: `http://${devServerIp}:6001`,
});