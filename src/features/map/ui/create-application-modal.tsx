import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { Button } from "@/src/shared/ui/button/button";

import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { useRequestMarkerAccess } from "@/src/entities/markers/api/use-request-marker";
import { useCheckPendingRequest } from "@/src/entities/markers/api/use-check-pending-request";
import queryClient from "@/src/app/config/queryClient";

export const CreateApplicationModal = ({
  isSent,
  markerId,
}: {
  isSent?: boolean;
  markerId: string;
}) => {
  const { close } = useVisibleStore("createApplication");
  const { mutate, isPending: isMutating } = useRequestMarkerAccess();
  const { data: pendingData, isLoading } = useCheckPendingRequest(markerId);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (pendingData && !isLoading) {
      setIsPending(pendingData.isPending || false);
    }
  }, [pendingData, isLoading]);

  const handleSendApplication = () => {
    mutate(markerId, {
      onSuccess: () => {
        console.log("Success created application");
        close();
        queryClient.invalidateQueries({
          queryKey: ["markerApplications"],
        });
      },
    });
  };

  return (
    <View className="flex items-center flex-col h-[280px] w-[95%] mx-auto">
      <Text weight="medium" className="text-white text-[24px] mt-8">
        Доступ закрыт
      </Text>
      <Text
        weight="regular"
        className="text-[#ADA8A8] text-[14px] text-center mt-4"
      >
        Что бы получить доступ, отправьте заявку Администратору поинта.
      </Text>
      <Button
        onPress={handleSendApplication}
        variant="custom"
        className={`mt-auto w-full h-[50px] rounded-[10px] flex items-center justify-center ${
          isSent || isPending || isMutating ? "bg-[#898989]" : "bg-white"
        }`}
        disabled={isSent || isPending || isMutating}
      >
        <Text weight="medium" className="text-dark text-[20px]">
          {isPending
            ? "Заявка на рассмотрении"
            : isSent || isMutating
            ? "Заявка отправлена"
            : "Отправить заявку"}
        </Text>
      </Button>
      <Button
        onPress={close}
        variant="custom"
        className="mt-6 mb-4 w-full bg-[#343434] h-[50px] rounded-[10px] flex items-center justify-center"
      >
        <Text weight="medium" className="text-white text-[20px]">
          Закрыть
        </Text>
      </Button>
    </View>
  );
};
