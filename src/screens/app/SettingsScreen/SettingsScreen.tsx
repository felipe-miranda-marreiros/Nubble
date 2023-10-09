import {useAuthSignOut} from '@domain';

import {Button, Screen, Text} from '@components';
import {AppScreenProps} from '@routes';

export function SettingsScreen({}: AppScreenProps<'SettingsScreen'>) {
  const {signOut, isLoading} = useAuthSignOut();

  return (
    <Screen canGoBack title="Configurações">
      <Text preset="headingLarge">Settings Screen</Text>
      <Button title="Sair da conta" onPress={signOut} isLoading={isLoading} />
    </Screen>
  );
}
