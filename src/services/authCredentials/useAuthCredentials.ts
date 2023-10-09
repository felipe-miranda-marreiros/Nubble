import {useContext} from 'react';

import {AuthCredentialsService} from './authCredentialsTypes';
import {AuthCredentialsContext} from './Providers/AuthCredentialsProvider';

export function useAuthCredentials(): AuthCredentialsService {
  const context = useContext(AuthCredentialsContext);

  if (!context) {
    throw new Error(
      'useAuthCredentials should be used within a AuthCredentialsProvider',
    );
  }

  return context;
}

// export const useAuthCredentialsZustand = create<AuthCredentialsService>()(
//   persist(
//     set => ({
//       authCredentials: null,
//       isLoading: false,
//       saveCredentials: async authCredentials => set({authCredentials}),
//       removeCredentials: async () => set({authCredentials: null}),
//     }),
//     {
//       name: '@Auth',
//       storage: storage,
//     },
//   ),
// );
