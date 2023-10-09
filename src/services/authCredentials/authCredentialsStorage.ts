import {AuthCredentials} from '@domain';

import {storage} from '../storage';

const AUTH_KEY = '@Auth';

async function set(credentials: AuthCredentials): Promise<void> {
  await storage.setItem(AUTH_KEY, credentials);
}

async function get(): Promise<AuthCredentials | null> {
  const credentials = await storage.getItem<AuthCredentials>(AUTH_KEY);
  return credentials;
}

async function remove(): Promise<void> {
  await storage.removeItem(AUTH_KEY);
}

export const authCredentialsStorage = {
  set,
  get,
  remove,
};
