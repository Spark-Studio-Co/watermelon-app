export type RootStackParamList = {
  Home: undefined;
  PointBio: {
    id: string;
    ownerId: string;
    isPrivate?: boolean;
  };
  PrivatePointCreation: {
    coordinate?: {
      latitude: number;
      longitude: number;
    };
  };
  PrivateChat: {
    chatId: string;
    participants: string[];
    chatType: string;
  };
};
