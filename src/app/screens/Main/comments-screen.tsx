import { MainLayout } from "../../layouts/main-layout";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CommentMessage } from "@/src/features/comments/ui/comment-message";

import { useCommentsData } from "@/src/entities/feed/api/use-comments-data";
import { useFeedStore } from "@/src/entities/feed/model/use-feed-store";
import { useEffect } from "react";

type RouteParams = {
  id: string;
};

export const CommentsScreen = ({
  route,
}: {
  route: {
    params: RouteParams;
  };
}) => {
  const { id } = route.params;
  const { data: comments } = useCommentsData(id);
  const { setPostId } = useFeedStore();

  useEffect(() => {
    setPostId(id);
  }, [id]);

  return (
    <MainLayout isBack title="Комментарии" isChat>
      <View className="flex flex-col w-full bg-[#2C2B2F] rounded-[15px] min-h-[77vh]">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 h-full w-full items-start mt-9 ml-10">
            {Array.isArray(comments) &&
              comments?.map((comment: any, index: number) => {
                const date = new Date(comment?.createdAt);
                const formattedDate = new Intl.DateTimeFormat("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(date);

                return (
                  <View key={index} className="mb-6 w-[60%]">
                    <CommentMessage
                      nickname={`@${comment?.user?.username}`}
                      comment={comment?.content}
                      date={formattedDate}
                    />
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </View>
    </MainLayout>
  );
};
