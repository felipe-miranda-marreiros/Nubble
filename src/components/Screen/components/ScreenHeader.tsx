import {BackButton, Box, BoxProps, ScreenProps, Text} from '@components';

type Props = Pick<ScreenProps, 'title' | 'canGoBack' | 'HeaderComponent'> &
  BoxProps;

export const ICON_SIZE = 20;

export function ScreenHeader({
  title,
  canGoBack,
  HeaderComponent,
  ...boxProps
}: Props) {
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
      {canGoBack && <BackButton showBackLabel={showBackLabel} />}
      {HeaderComponent}
      {title && <Text preset="headingSmall">{title}</Text>}
      {title && <Box width={ICON_SIZE} />}
    </Box>
  );
}
