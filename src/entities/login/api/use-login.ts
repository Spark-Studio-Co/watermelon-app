import { login } from "./login.api";
import { ILoginRDO } from "./rdo/login.rdo";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
    return useMutation<ILoginRDO, Error, ILoginRDO>({
        mutationFn: (data) => login(data)
    })
}