import {NavigationContainer} from '@react-navigation/native';

import {ActivityIndicator, Box} from '@components';
import {Stack, useRouter} from '@hooks';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {OnboardingStack} from './OnboardingStack';

function LoadingScreen() {
  return (
    <Box
      flex={1}
      backgroundColor="background"
      justifyContent="center"
      alignItems="center">
      <ActivityIndicator size="large" />
    </Box>
  );
}

const stacks: Record<Stack, React.ReactElement> = {
  Loading: <LoadingScreen />,
  Auth: <AuthStack />,
  App: <AppStack />,
  Onboarding: <OnboardingStack />,
};

export function Routes() {
  const stack = useRouter();

  return <NavigationContainer>{stacks[stack]}</NavigationContainer>;
}
