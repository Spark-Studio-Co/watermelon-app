import axios from "axios";
import { apiClient } from "@/src/app/config/apiClient";
import { IVerifyCodeRDO } from "./rdo/verify-code.rdo";

export const varifyCode = async (data: IVerifyCodeRDO) => {
    try {
        const response = await apiClient.post("/auth/verify-code", data)
        console.log("Code verified", response.data)
        return response.data
    } catch (error: any) {
        console.log("API Error", error)
        console.log('Error', axios.isAxiosError)
    }
}