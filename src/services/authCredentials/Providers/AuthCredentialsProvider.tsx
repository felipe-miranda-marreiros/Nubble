import {createContext, useEffect, useState} from 'react';

import {AuthCredentials, authService} from '@domain';

import {authCredentialsStorage} from '../authCredentialsStorage';
import {AuthCredentialsService} from '../authCredentialsTypes';

export const AuthCredentialsContext = createContext<AuthCredentialsService>({
  authCredentials: null,
  isLoading: true,
  saveCredentials: async () => {},
  removeCredentials: async () => {},
});

export function AuthCredentialsProvider({children}: React.PropsWithChildren) {
  const [authCredentials, setAuthCredentials] =
    useState<AuthCredentials | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    startAuthCredentials();
  }, []);

  async function startAuthCredentials() {
    try {
      const credentials = await authCredentialsStorage.get();
      if (credentials) {
        authService.updateToken(credentials.token);
        setAuthCredentials(credentials);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  async function saveCredentials(credentials: AuthCredentials): Promise<void> {
    authCredentialsStorage.set(credentials);
    authService.updateToken(credentials.token);
    setAuthCredentials(credentials);
  }

  async function removeCredentials(): Promise<void> {
    authCredentialsStorage.remove();
    authService.removeToken();
    setAuthCredentials(null);
  }

  return (
    <AuthCredentialsContext.Provider
      value={{authCredentials, isLoading, removeCredentials, saveCredentials}}>
      {children}
    </AuthCredentialsContext.Provider>
  );
}
