import React from "react";
import { ScrollView, View } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { Button } from "@/src/shared/ui/button/button";
import { PointTab } from "../../auction/ui/point-tab/point-tab";

import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { useMarkerApplications } from "@/src/entities/markers/api/use-marker-applications";

import CrossIcon from "@/src/shared/icons/cross-icon";

export const PointApplicationsModal = ({ markerId }: { markerId: string }) => {
  const { close } = useVisibleStore("pointApplications");

  const { data: applications } = useMarkerApplications(markerId);

  return (
    <View
      className="bg-[#313034] w-full py-5 rounded-[15px] flex flex-col items-center justify-center relative"
      style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
    >
      <Text weight="regular" className="text-white text-[20px]">
        Заявки
      </Text>
      <Button className="absolute right-3 top-3" onPress={close}>
        <CrossIcon />
      </Button>
      <ScrollView
        className="w-[90%] max-h-[60vh] mt-6"
        showsVerticalScrollIndicator={false}
      >
        {applications?.map((application, index) => (
          <View key={index} className="mb-4">
            <PointTab
              type="standard"
              isApplication
              username={application.username}
              name={application.name}
              requestId={application.id}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
