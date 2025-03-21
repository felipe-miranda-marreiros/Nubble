import {AuthCredentials, User} from '@domain';

export interface AuthCredentialsService {
  authCredentials: AuthCredentials | null;
  saveCredentials: (authCredentials: AuthCredentials) => Promise<void>;
  removeCredentials: () => Promise<void>;
  updateUser: (user: User) => void;
  isLoading: boolean;
  userId: null | number;
}
