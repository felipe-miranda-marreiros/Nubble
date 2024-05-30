import {useAuthCredentials, useOnboarding} from '@services';

export type Stack = 'Loading' | 'Auth' | 'App' | 'Onboarding';

export function useRouter(): Stack {
  const showOnboarding = useOnboarding();
  const {authCredentials, isLoading} = useAuthCredentials();

  if (isLoading) {
    return 'Loading';
  }

  if (showOnboarding) {
    return 'Onboarding';
  }

  if (authCredentials) {
    return 'App';
  }

  return 'Auth';
}
