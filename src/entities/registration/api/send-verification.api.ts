import axios from 'axios';
import { apiClient } from "@/src/app/config/apiClient";
import { ISendVerificationRDO } from "./rdo/send-verification.rdo";

export const sendVerification = async (data: ISendVerificationRDO) => {
    try {
        const response = await apiClient.post("/auth/send-verification", data)
        console.log("Email sent", response.data)
        return response.data
    } catch (error: any) {
        console.log('API Error:', error)
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                throw new Error('Network error - Please check if the API server is running')
            }
            throw new Error(error.response.data?.message || 'API error - Failed to send verification code')
        }
        throw error
    }
}