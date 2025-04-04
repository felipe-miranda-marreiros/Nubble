import {User, UserAPI} from '../User';

export interface AuthCredentials {
  token: string;
  user: User;
  tokenExpiresAt: string;
  refreshToken: string;
}

export interface AuthCredentialsAPI {
  auth: {
    type: string;
    token: string;
    refreshToken: string;
    expires_at: string;
  };
  user: UserAPI;
}

export interface SignInData {
  username?: string;
  email?: string;
  password: string;
}

export interface SignUpDataAPI {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface FieldIsAvailableAPI {
  message: string;
  isAvailable: boolean;
}

export interface ForgotPasswordParam {
  email: string;
}

export interface EditPasswordParams {
  currentPassword: string;
  newPassword: string;
}
