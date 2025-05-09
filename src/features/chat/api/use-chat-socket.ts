// useChatSocket.ts
import { useEffect, useCallback } from 'react';
import { socket } from './socket';
import { useChatStore } from '../model/chat-store';

export function useChatSocket(userId: string, chatId: string) {
    // Get necessary functions from chat store
    const { connect, disconnect, sendMessage } = useChatStore();
    
    // Connect to chat socket
    useEffect(() => {
        if (!userId || !chatId) return;
        
        console.log('[useChatSocket] Connecting to chat:', chatId);
        
        // Connect to chat room via socket store function
        // This will set up all the necessary event listeners
        connect(chatId, userId);
        
        // Cleanup on unmount
        return () => {
            console.log('[useChatSocket] Disconnecting from chat:', chatId);
            disconnect();
        };
    }, [userId, chatId, connect, disconnect]);
    
    // Helper function to send messages
    const sendChatMessage = useCallback((text: string) => {
        if (!text.trim() || !userId || !chatId) return;
        sendMessage(text, chatId, userId);
    }, [sendMessage, chatId, userId]);
    
    return {
        sendMessage: sendChatMessage
    };
}