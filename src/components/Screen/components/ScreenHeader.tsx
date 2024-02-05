import {useNavigation} from '@react-navigation/native';

import {
  Box,
  BoxProps,
  Icon,
  ScreenProps,
  Text,
  TouchableOpacityBox,
} from '@components';

type Props = Pick<ScreenProps, 'title' | 'canGoBack' | 'HeaderComponent'> &
  BoxProps;

export const ICON_SIZE = 20;

export function ScreenHeader({
  title,
  canGoBack,
  HeaderComponent,
  ...boxProps
}: Props) {
  const navigate = useNavigation();

  const showBackLabel = !title && !HeaderComponent;

  if (!title && !HeaderComponent && !canGoBack) {
    return null;
  }

  return (
    <Box
      flexDirection="row"
      mb="s24"
      justifyContent="space-between"
      alignItems="center"
      {...boxProps}>
      {canGoBack && (
        <TouchableOpacityBox
          testID="screen-back-button"
          onPress={navigate.goBack}
          flexDirection="row"
          mr="s10"
          alignItems="center">
          <Icon name="arrowLeft" color="primary" />
          {showBackLabel && (
            <Text preset="paragraphMedium" semiBold marginLeft="s8">
              Voltar
            </Text>
          )}
        </TouchableOpacityBox>
      )}
      {HeaderComponent}
      {title && <Text preset="headingSmall">{title}</Text>}
      {title && <Box width={ICON_SIZE} />}
    </Box>
  );
}
