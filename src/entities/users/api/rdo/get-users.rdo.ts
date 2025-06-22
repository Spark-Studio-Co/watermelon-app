export interface IGetUsersRDO {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string | null;
  level: number;
  balance: number;
  isVerified: boolean;
  isPremium: boolean;
}
