import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNavigationPanel } from '@/src/features/bottom-navigation-panel/ui/bottom-panel';
import { UserTab } from '@/src/features/user/ui/user-tab';
import Text from '@/src/shared/ui/text/text';
import { Button } from '@/src/shared/ui/button/button';
import { WeeklyChallengeTab } from '@/src/features/weekly-challenge-tab/ui/weekly-challenge-tab';
import { ChatInput } from '@/src/features/comments/ui/chat-input';
import { ChatTab } from '@/src/features/chat/ui/chat-tab';
import { ActivityTab } from '@/src/features/activity/ui/activity-tab';
import { TasksTab } from '@/src/features/tasks/ui/tasks-tab';
import { BookmarkTab } from '@/src/features/bookmarks/ui/bookmark-tab';
import { hp } from '@/src/shared/utils/resize-dimensions';
import RightArrowIcon from '@/src/shared/icons/right-arrow-icon';
import { useNavigation } from '@react-navigation/native';
import { useRef, useEffect } from 'react';

export type ChatInputType = "comments" | "private" | "group"

interface MainLayoutProps {
    children: React.ReactNode;
    isUserTab?: boolean;
    isBack?: boolean;
    title?: string;
    isMap?: boolean;
    isWeeklyChallenge?: boolean;
    isScrollable?: boolean;
    isChat?: boolean;
    chatInputType?: ChatInputType;
    isActivity?: boolean;
    isTasks?: boolean;
    isBookmarks?: boolean;
    onSend?: (text: string) => void;
}

export const MainLayout = ({ children, isUserTab, isBack, title, isMap, isWeeklyChallenge, isScrollable = true, isChat = false, chatInputType, isActivity = false, isTasks = false, isBookmarks = false, onSend }: MainLayoutProps) => {
    const navigation = useNavigation();
    const chatScrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        if (isChat && chatScrollRef.current) {
            setTimeout(() => {
                chatScrollRef.current?.scrollToEnd({ animated: true });
            }, 50);
        }
    }, [children]);

    return (
        <KeyboardAvoidingView
            behavior={isChat ? (Platform.OS === 'ios' ? 'padding' : 'height') : undefined}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <View className="flex-1 bg-[#1B1C1E]">
                <StatusBar style="light" translucent={true} backgroundColor='transparent' />
                <SafeAreaView style={{ flex: 1 }}>
                    {isTasks && <TasksTab />}
                    {isBookmarks && <BookmarkTab />}
                    {isActivity && <ActivityTab />}
                    {(chatInputType === 'group' || chatInputType === 'private') && <ChatTab isGlobal={chatInputType === 'group'} />}
                    {isMap ? (
                        <>
                            <View>
                                {children}
                            </View>
                            {!isBack && <BottomNavigationPanel />}
                        </>
                    ) : isChat ? (
                        <>
                            <ScrollView
                                ref={chatScrollRef}
                                contentContainerStyle={{ paddingBottom: hp(12), paddingHorizontal: 16 }}
                                keyboardShouldPersistTaps="handled"
                                showsVerticalScrollIndicator={false}
                            >
                                {children}
                            </ScrollView>
                            <ChatInput type={chatInputType || 'comments'} onSend={onSend} />
                        </>
                    ) : isScrollable ? (
                        <>
                            {isBack && <View className='flex flex-row items-center gap-x-3 mx-4 my-4'><Button variant='custom' className='rotate-180' onPress={() => navigation.goBack()}><RightArrowIcon /></Button><Text weight='regular' className='text-white text-[16px]'>{title}</Text></View>}
                            {isUserTab && <UserTab />}
                            {isWeeklyChallenge && (
                                <View className=" mx-auto px-4 mb-4 w-[90%]">
                                    <Text weight="bold" className="text-white text-[24px]">Weekly Challenge</Text>
                                    <WeeklyChallengeTab />
                                </View>
                            )}
                            <ScrollView
                                contentContainerStyle={{ paddingBottom: hp(12), paddingHorizontal: 16 }}
                                keyboardShouldPersistTaps="handled"
                                showsVerticalScrollIndicator={false}
                            >
                                {children}
                            </ScrollView>
                            {!isBack && <BottomNavigationPanel />}
                        </>
                    ) : (
                        <>
                            {isBack && <View className='flex flex-row items-center gap-x-3 mx-4 my-4'><Button variant='custom' className='rotate-180' onPress={() => navigation.goBack()}><RightArrowIcon /></Button><Text weight='regular' className='text-white text-[16px]'>{title}</Text></View>}
                            {isUserTab && <UserTab />}
                            {isWeeklyChallenge && (
                                <View className=" mx-auto px-4 mb-4 w-[90%] min-h-[100vh] flex-1">
                                    <Text weight="bold" className="text-white text-[24px]">Weekly Challenge</Text>
                                    <WeeklyChallengeTab />
                                </View>
                            )}
                            <View className=" mx-auto px-4 mb-44">
                                {children}
                            </View>
                            {!isBack && <BottomNavigationPanel />}
                        </>
                    )}
                </SafeAreaView>
            </View>
        </KeyboardAvoidingView>
    );
};
