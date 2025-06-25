import { useMutation } from "@tanstack/react-query";
import { reportViolation } from "./chat-api";

/**
 * Custom hook for reporting violations
 */
export const useReportViolation = () => {
  return useMutation({
    mutationFn: async ({
      type,
      entityId,
      reason,
      details,
    }: {
      type: 'point' | 'chat' | 'publication' | 'message';
      entityId: string;
      reason: string;
      details?: string;
    }) => {
      return await reportViolation(type, entityId, reason, details);
    },
  });
};
