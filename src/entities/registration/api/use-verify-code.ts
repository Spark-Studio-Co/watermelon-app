import { varifyCode } from "./verify-code.api";
import { IVerifyCodeRDO } from "./rdo/verify-code.rdo";
import { useMutation } from "@tanstack/react-query";

export const useVerifyCode = () => {
    return useMutation<IVerifyCodeRDO, Error, IVerifyCodeRDO>({
        mutationFn: (data) => varifyCode(data)
    })
}