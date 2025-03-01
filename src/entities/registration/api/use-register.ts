import { register } from "./register.api";
import { IRegisterRDO } from "./rdo/register.rdo";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
    return useMutation<IRegisterRDO, Error, IRegisterRDO>({
        mutationFn: (data) => register(data)
    })
}