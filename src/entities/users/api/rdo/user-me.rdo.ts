export interface IUserMeRDO {
    id: string,
    name: string,
    username: string,
    email: string,
    avatar: string | null,
    level: { expNeeded: number, id: number },
    balance: number,
    isVerified: boolean,
    isPremium: boolean
}