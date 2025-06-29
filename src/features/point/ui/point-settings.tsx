import { View, Alert } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { Button } from "@/src/shared/ui/button/button";
import { PointSettingsTab } from "./point-settings-tab";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CrossIcon from "@/src/shared/icons/cross-icon";

import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { useMarkerStore } from "@/src/entities/markers/model/use-marker-store";
import { useDeleteMarker } from "@/src/entities/markers/api/use-delete-marker";
import { useNavigation } from "@react-navigation/native";
import { useMarkerApplications } from "@/src/entities/markers/api/use-marker-applications";
import { useMarkerDataById } from "@/src/entities/markers/api/use-marker-data-by-id";
import { apiClient } from "@/src/app/config/apiClient";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const PointSettings = ({ markerId }: { markerId: string }) => {
  const { id } = useMarkerStore();
  const { mutate: deleteMarker } = useDeleteMarker();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { data: applications } = useMarkerApplications(markerId);
  const { data: markerData } = useMarkerDataById(markerId);

  // State for privacy toggle
  const [isContentRestricted, setIsContentRestricted] = useState(false);
  const [isTogglingPrivacy, setIsTogglingPrivacy] = useState(false);

  // Load privacy state from marker data or AsyncStorage
  useEffect(() => {
    const loadPrivacyState = async () => {
      try {
        if (markerId) {
          const storedPrivacy = await AsyncStorage.getItem(
            `point_privacy_${markerId}`
          );

          if (storedPrivacy !== null) {
            setIsContentRestricted(storedPrivacy === "true");
          } else if (markerData?.isPrivate !== undefined) {
            setIsContentRestricted(markerData.isPrivate);
          }
        }
      } catch (error) {
        console.error(
          "Error loading point privacy state from AsyncStorage:",
          error
        );
        // Fallback to marker data
        setIsContentRestricted(false);
      }
    };

    loadPrivacyState();
  }, [markerData, markerId]);

  // Handle privacy toggle
  const handleTogglePrivacy = async () => {
    if (!markerId || isTogglingPrivacy) return;

    const newPrivacyStatus = !isContentRestricted;

    // Update UI immediately
    setIsContentRestricted(newPrivacyStatus);
    setIsTogglingPrivacy(true);

    try {
      // Save to AsyncStorage first for immediate persistence
      await AsyncStorage.setItem(
        `point_privacy_${markerId}`,
        String(newPrivacyStatus)
      );

      // Then update on the server using the content restriction endpoint with query parameter
      await apiClient.patch(
        `/markers/${markerId}/set-content-restriction?isContentRestricted=${newPrivacyStatus}`
      );

      queryClient.invalidateQueries({
        queryKey: ["markerById", markerId],
      });

      console.log(
        `✅ Is Content restricted: ${newPrivacyStatus ? "true" : "false"}`
      );
    } catch (error) {
      setIsContentRestricted(!newPrivacyStatus);

      // Also revert in AsyncStorage
      try {
        await AsyncStorage.setItem(
          `point_privacy_${markerId}`,
          String(!newPrivacyStatus)
        );
      } catch (storageError) {
        console.error(
          "Error reverting point privacy in AsyncStorage:",
          storageError
        );
      }

      console.error("❌ Error updating point privacy:", error);
      Alert.alert(
        "Ошибка",
        "Не удалось обновить настройки приватности. Пожалуйста, попробуйте позже."
      );
    } finally {
      setIsTogglingPrivacy(false);
    }
  };

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
      description: "Сделать поинт закрытым",
      isPrivate: true,
      isClicked: isContentRestricted,
      isLoading: isTogglingPrivacy,
      onPress: handleTogglePrivacy,
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
      <Button
        className="absolute right-3 top-3"
        onPress={close}
        variant="custom"
      >
        <CrossIcon />
      </Button>
      <View className="w-[90%] gap-y-7 mt-6">
        {settings.map((item, index) => (
          <View key={index} className="flex flex-col gap-y-6">
            <PointSettingsTab
              title={item.title}
              description={item.description}
              onPress={
                item.title === "Приватность"
                  ? item.onPress
                  : () => handleOpenSettings(item.title)
              }
              isPrivate={item.isPrivate}
              isClicked={item.isClicked}
              isLoading={item.isLoading}
              applications={item.applications}
            />
          </View>
        ))}
      </View>
      <Button
        variant="custom"
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
