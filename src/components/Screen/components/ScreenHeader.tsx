import {useNavigation} from '@react-navigation/native';

import {Box, Icon, ScreenProps, Text, TouchableOpacityBox} from '@components';

type Props = Pick<ScreenProps, 'title' | 'canGoBack'>;

export const ICON_SIZE = 20;

export function ScreenHeader({title, canGoBack}: Props) {
  const navigate = useNavigation();

  return (
    <Box
      flexDirection="row"
      mb="s24"
      justifyContent="space-between"
      alignItems="center">
      {canGoBack && (
        <TouchableOpacityBox
          onPress={navigate.goBack}
          flexDirection="row"
          alignItems="center">
          <Icon name="arrowLeft" color="primary" />
          {!title && (
            <Text preset="paragraphMedium" semiBold marginLeft="s8">
              Voltar
            </Text>
          )}
        </TouchableOpacityBox>
      )}
      {title && <Text preset="headingSmall">{title}</Text>}
      {title && <Box width={ICON_SIZE} />}
    </Box>
  );
}
