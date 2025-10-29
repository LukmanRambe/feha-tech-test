import { User } from '../main/User';

export type UserContextType = {
  userData: User;
  refreshUser: () => Promise<void>;
};
