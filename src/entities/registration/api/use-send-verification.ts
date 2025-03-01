import { sendVerification } from "./send-verification.api";
import { ISendVerificationRDO } from "./rdo/send-verification.rdo";
import { useMutation } from "@tanstack/react-query";

export const useSendVerification = () => {
    return useMutation<ISendVerificationRDO, Error, ISendVerificationRDO>({
        mutationFn: (data) => sendVerification(data)
    })
}