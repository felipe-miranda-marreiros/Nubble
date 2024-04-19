import {Icon, PressableBox, Text} from '@components';

export interface MenuItemProps {
  label: string;
  onPress: () => void;
}

export function MenuItem({label, onPress}: MenuItemProps) {
  return (
    <PressableBox
      paddingVertical="s16"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      onPress={onPress}>
      <Text semiBold>{label}</Text>
      <Icon name="chevronRight" />
    </PressableBox>
  );
}
