import {FlatList, ListRenderItemInfo} from 'react-native';

import {useAuthSignOut} from '@domain';

import {Button, Screen, Separator} from '@components';
import {AppScreenProps} from '@routes';

import {MenuItem, MenuItemProps} from './components/MenuItem';

export function SettingsScreen({navigation}: AppScreenProps<'SettingsScreen'>) {
  const {signOut, isLoading} = useAuthSignOut();

  function renderItem({item}: ListRenderItemInfo<MenuItemProps>) {
    return <MenuItem {...item} />;
  }

  const items: MenuItemProps[] = [
    {
      label: 'Termos de uso',
      onPress: () => {},
    },
    {
      label: 'Política de privacidade',
      onPress: () => {},
    },
    {
      label: 'Modo escuro',
      onPress: () => navigation.navigate('DarkModeScreen'),
    },
  ];

  return (
    <Screen flex={1} canGoBack title="Configurações">
      <FlatList
        bounces={false}
        ItemSeparatorComponent={Separator}
        data={items}
        renderItem={renderItem}
        ListFooterComponent={
          <Button
            mt="s48"
            title="Sair da conta"
            onPress={signOut}
            isLoading={isLoading}
          />
        }
      />
    </Screen>
  );
}
