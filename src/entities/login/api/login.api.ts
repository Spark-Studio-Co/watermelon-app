import { ILoginRDO } from "./rdo/login.rdo";
import { apiClient } from "@/src/app/config/apiClient";
import axios from "axios";

export const login = async (data: ILoginRDO) => {
    try {
        const response = await apiClient.post('/api/auth/login', data)
        console.log("Login succseddful!", response.data)
        return response.data
    } catch (error: any) {
        console.log("API Error", error)
        console.log("Axios Error", axios.isAxiosError)
    }
}