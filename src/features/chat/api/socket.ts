import { io } from 'socket.io-client';

export const socket = io('https://watermelon-backend-production.up.railway.app', {
    transports: ['websocket'],
});

socket.on('connect', () => {
    console.log('[socket.ts] Connected to WebSocket:', socket.id);
});

socket.on('connect_error', (err) => {
    console.log('[socket.ts] Connection error:', err.message);
});