import React, { useState } from "react";
import { View, Alert, TextInput } from "react-native";
import { Button } from "@/src/shared/ui/button/button";
import Text from "@/src/shared/ui/text/text";
import CrossIcon from "@/src/shared/icons/cross-icon";
import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { useChatStore } from "../model/chat-store";
import { useReportViolation } from "../api/use-report-violation";

type EntityType = 'chat' | 'point';

type ChatViolationModalProps = {
  /**
   * The type of entity being reported (chat or point)
   * @default 'chat'
   */
  entityType?: EntityType;
  /**
   * The ID of the entity being reported
   * If not provided, will use currentChatId from chat store (for backward compatibility)
   */
  entityId?: string;
};

export const ChatViolationModal = ({ entityType = 'chat', entityId }: ChatViolationModalProps = {}) => {
  const { close } = useVisibleStore("chatViolations");
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [details, setDetails] = useState<string>("");
  const [showDetailsInput, setShowDetailsInput] = useState(false);
  
  // Get current chat ID (as fallback if entityId is not provided)
  const currentChatId = useChatStore((state) => state.currentChatId);
  
  // Determine the actual entity ID to use
  const actualEntityId = entityId || (entityType === 'chat' ? currentChatId : undefined);
  
  // Use the report violation hook
  const { mutate: reportViolation, isPending: isReporting } = useReportViolation();
  const violations = [
    {
      title: "Комментарии...",
      reason: "inappropriate_comments",
      onPress: () => handleViolationSelect("inappropriate_comments"),
    },
    {
      title: "Ошибочная категория",
      reason: "wrong_category",
      onPress: () => handleViolationSelect("wrong_category"),
    },
    {
      title: "Нарушение правил",
      reason: "rules_violation",
      onPress: () => handleViolationSelect("rules_violation"),
    },
    {
      title: "Другое",
      reason: "other",
      onPress: () => handleViolationSelect("other"),
    },
  ];
  
  // Handle violation selection
  const handleViolationSelect = (reason: string) => {
    setSelectedReason(reason);
    setShowDetailsInput(true);
  };
  
  // Handle report submission
  const handleSubmitReport = () => {
    if (!selectedReason || !actualEntityId) return;
    
    reportViolation(
      {
        type: entityType,
        entityId: actualEntityId,
        reason: selectedReason,
        details: details.trim() || undefined
      },
      {
        onSuccess: () => {
          Alert.alert(
            "Жалоба отправлена",
            "Спасибо за вашу жалобу. Мы рассмотрим её в ближайшее время.",
            [{ text: "OK", onPress: () => close() }]
          );
        },
        onError: () => {
          Alert.alert(
            "Ошибка",
            "Не удалось отправить жалобу. Пожалуйста, попробуйте позже.",
            [{ text: "OK" }]
          );
        }
      }
    );
  };

  return (
    <View
      className="bg-[#313034] w-full py-5 rounded-[15px] flex flex-col items-center justify-center relative"
      style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
    >
      <Text weight="regular" className="text-white text-[20px]">
        {showDetailsInput ? "Детали жалобы" : `Сообщить о нарушении ${entityType === 'point' ? 'точки' : 'чата'}`}
      </Text>
      <Button className="absolute right-3 top-3" onPress={close}>
        <CrossIcon />
      </Button>
      
      {!showDetailsInput ? (
        // Show violation options
        <View className="flex flex-col w-[90%] gap-y-5 mt-8">
          {violations.map((violation, index) => (
            <Button 
              key={index} 
              onPress={violation.onPress}
              className="py-2 px-4 rounded-md bg-[#3A393C]"
            >
              <Text weight="regular" className="text-white text-[14px]">
                {violation.title}
              </Text>
            </Button>
          ))}
        </View>
      ) : (
        // Show details input
        <View className="flex flex-col w-[90%] gap-y-5 mt-8">
          <TextInput
            className="bg-[#3A393C] text-white p-3 rounded-md min-h-[100px] w-full"
            placeholder="Опишите детали нарушения..."
            placeholderTextColor="#8E8E93"
            multiline
            value={details}
            onChangeText={setDetails}
            style={{ textAlignVertical: 'top' }}
          />
          
          <View className="flex flex-row justify-between w-full mt-4">
            <Button 
              className="py-2 px-4 rounded-md bg-[#3A393C] flex-1 mr-2"
              onPress={() => {
                setShowDetailsInput(false);
                setSelectedReason(null);
              }}
            >
              <Text weight="regular" className="text-white text-[14px] text-center">
                Назад
              </Text>
            </Button>
            
            <Button 
              className="py-2 px-4 rounded-md bg-[#FF3B30] flex-1 ml-2"
              onPress={handleSubmitReport}
              disabled={isReporting}
            >
              <Text weight="regular" className="text-white text-[14px] text-center">
                {isReporting ? "Отправка..." : "Отправить"}
              </Text>
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};
