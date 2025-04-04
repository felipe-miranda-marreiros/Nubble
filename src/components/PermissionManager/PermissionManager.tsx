import {Linking, Platform} from 'react-native';

import {PermissionName, usePermission} from '@services';

import {ActivityIndicator} from '../ActivityIndicator/ActivityIndicator';
import {Box} from '../Box/Box';
import {Button} from '../Button/Button';
import {Screen} from '../Screen/Screen';
import {Text} from '../Text/Text';

interface PermissionManagerProps {
  permissionName: PermissionName;
  description: string;
  children: React.ReactElement;
}

export function PermissionManager({
  children,
  description,
  permissionName,
}: PermissionManagerProps) {
  const {status, isLoading} = usePermission(permissionName);

  if (status === 'granted') {
    return children;
  }

  return (
    <Screen flex={1} canGoBack>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text textAlign="center" preset="headingSmall">
          {description}
        </Text>
        {isLoading && <ActivityIndicator color="primary" />}
        {status === 'unavailable' && (
          <Text
            preset="paragraphMedium"
            color="error"
            bold
            marginHorizontal="s16"
            textAlign="center">
            Este recurso não está disponível para este dispositivo
          </Text>
        )}
        {status === 'never_ask_again' && (
          <Box>
            {Platform.OS === 'android' && (
              <Text
                preset="paragraphMedium"
                color="error"
                bold
                marginHorizontal="s16"
                textAlign="center">
                É necessário abrir e fechar o App novamente após alterar as
                configurações
              </Text>
            )}
            <Button
              mt="s16"
              title="Abrir configurações"
              onPress={Linking.openSettings}
            />
          </Box>
        )}
      </Box>
    </Screen>
  );
}
