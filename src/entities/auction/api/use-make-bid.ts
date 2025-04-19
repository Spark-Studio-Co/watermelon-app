import { apiClient } from "@/src/app/config/apiClient"
import { useMutation } from "@tanstack/react-query"

import { IMakeBidDto } from "./dto/use-add-bid.dto"

export const useMakeBid = () => {
    const mutation = useMutation({
        mutationFn: (dto: IMakeBidDto) => apiClient.post('/bids', dto)
    })
    return mutation
}
