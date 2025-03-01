import axios from "axios";
import { apiClient } from "@/src/app/config/apiClient";
import { IRegisterRDO } from "./rdo/register.rdo";

export const register = async (data: IRegisterRDO) => {
    try {
        const response = await apiClient.post("/api/auth/register", data)
        console.log("Registered", response.data)
        return response.data
    } catch (error: any) {
        console.log("API Error", error)
        console.log('Axios Error', axios.isAxiosError)
    }
}