import { View } from "react-native";
import Text from "@/src/shared/ui/text/text";

import { useActiveStore } from "@/src/shared/model/use-active-store";
import { useIncomingFriendsData } from "@/src/entities/friends/api/use-incoming-friends-data";
import { SearchInput } from "../../auction/ui/search-input/search-input";
import { Button } from "@/src/shared/ui/button/button";
import DarkBurgerIcon from "@/src/shared/icons/dark-burger-icon";

export const BookmarkTab = () => {
  const { active, setActive } = useActiveStore("bookmarks", "Point");
  const { data: incomingFriends } = useIncomingFriendsData();

  const tabs = ["Point", "Chats", "Friends"];

  return (
    <View className="w-full flex items-center justify-center mt-6 pb-6 flex-col">
      <Text weight="medium" className="text-white text-[32px]">
        Saved
      </Text>
      <View className="flex flex-row items-center justify-between w-[70%] mx-auto mt-7">
        {tabs.map((tab, index) => (
          <View key={index} className="flex flex-col items-center">
            <Text
              weight="regular"
              className="text-white text-[18px] mb-[3px]"
              onPress={() => setActive(tab)}
            >
              {tab}
            </Text>
            {incomingFriends?.length > 0 && tab === "Friends" && (
              <View className="w-[15px] h-[15px] rounded-[5px] bg-white items-center justify-center absolute -right-4 -top-3">
                <Text weight="regular" className="text-dark text-[10px]">
                  {incomingFriends?.length}
                </Text>
              </View>
            )}
            {active === tab && (
              <View className="w-[59px] h-[2px] rounded-[5px] bg-white" />
            )}
          </View>
        ))}
      </View>
      <View className="flex flex-row items-center justify-between w-[85%] gap-x-4 mt-8">
        <SearchInput />
        <Button
          variant="custom"
          className="bg-[#E6E6E6] rounded-full w-[42px] h-[42px] flex items-center justify-center"
          // onPress={toggleModal}
        >
          <DarkBurgerIcon />
        </Button>
      </View>
    </View>
  );
};
