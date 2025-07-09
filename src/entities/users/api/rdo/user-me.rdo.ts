export interface IUserMeRDO {
    id: string,
    name: string,
    username: string,
    email: string,
    avatar: string | null,
    level: { expNeeded: number, id: number },
    balance: number,
    isVerified: boolean,
    isPremium: boolean,
    registrationDate?: string,
    // Privacy settings
    isMapAccess?: boolean,
    isAuction?: boolean,
    isActivities?: boolean,
    // Notification settings
    isAllNotifications?: boolean,
    isNewMessages?: boolean,
    isFriendsRequests?: boolean
}