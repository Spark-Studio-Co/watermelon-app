import { View } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { Button } from "@/src/shared/ui/button/button";
import { PointSettingsTab } from "./point-settings-tab";

import CrossIcon from "@/src/shared/icons/cross-icon";

import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { useMarkerStore } from "@/src/entities/markers/model/use-marker-store";
import { useDeleteMarker } from "@/src/entities/markers/api/use-delete-marker";
import { useNavigation } from "@react-navigation/native";
import { useMarkerApplications } from "@/src/entities/markers/api/use-marker-applications";

export const PointSettings = ({ markerId }: { markerId: string }) => {
  const { id } = useMarkerStore();
  const { mutate: deleteMarker } = useDeleteMarker();
  const navigation = useNavigation();

  const { data: applications } = useMarkerApplications(markerId);

  const { close } = useVisibleStore("pointSettings");
  const { open: openRadiusSettings } = useVisibleStore("pointRadius");
  const { open: openRadiusColorSettings } = useVisibleStore("radiusColor");
  const { open: openPointNameSettings } = useVisibleStore("pointName");
  const { open: openPointBioSettings } = useVisibleStore("pointBioSettings");
  const { open: openPointApplicationsSettings } =
    useVisibleStore("pointApplications");

  const handleOpenSettings = (title: string) => {
    close();

    setTimeout(() => {
      switch (title) {
        case "Заявки":
          openPointApplicationsSettings();
          break;
        case "Радиус":
          openRadiusSettings();
          break;
        case "Цвет радиуса":
          openRadiusColorSettings();
          break;
        case "Название":
          openPointNameSettings();
          break;
        case "bio":
          openPointBioSettings();
          break;
        default:
          console.log("No matching setting for:", title);
      }
    }, 300);
  };

  const settings = [
    {
      title: "Приватность",
      description: "Сделать поинт закрытым ",
      isPrivate: true,
    },
    {
      title: "Заявки",
      applications: applications?.length || 0,
    },
    {
      title: "Название",
      description: "Редактировать название Point",
    },
    {
      title: "bio",
      description: "Редактировать описание Point",
    },
    {
      title: "Радиус",
      description: "Вы можете настроить радиус",
    },
    {
      title: "Цвет радиуса",
      description: "Вы можете изменить цвет радиуса",
    },
  ];

  const handleDelete = () => {
    if (!id) return;
    deleteMarker(id);

    setTimeout(() => {
      close();
      navigation.navigate("Map" as never);
    }, 300);
  };

  return (
    <View
      className="bg-[#313034] w-full py-5 rounded-[15px] flex flex-col items-center relative"
      style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
    >
      <Text weight="regular" className="text-white text-[20px]">
        Настройки
      </Text>
      <Button className="absolute right-3 top-3" onPress={close}>
        <CrossIcon />
      </Button>
      <View className="w-[90%] gap-y-7 mt-6">
        {settings.map((item, index) => (
          <View key={index} className="flex flex-col gap-y-6">
            <PointSettingsTab
              title={item.title}
              description={item.description}
              onPress={() => handleOpenSettings(item.title)}
              isPrivate={item.isPrivate}
              applications={item.applications}
            />
          </View>
        ))}
      </View>
      <Button
        onPress={handleDelete}
        className="flex items-center justify-center w-[90%] mt-16 mb-4"
      >
        <Text weight="regular" className="text-[#FFFFFF] text-[20px]">
          Удалить Point
        </Text>
      </Button>
    </View>
  );
};
