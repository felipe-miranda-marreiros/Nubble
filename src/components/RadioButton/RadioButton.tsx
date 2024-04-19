import {Box, PressableBox} from '../Box/Box';

export interface RadioButtonProps {
  isSelected: boolean;
  onPress: () => void;
}

export function RadioButton({isSelected, onPress}: RadioButtonProps) {
  return (
    <PressableBox
      hitSlop={10}
      onPress={onPress}
      justifyContent="center"
      alignItems="center"
      height={20}
      width={20}
      borderWidth={isSelected ? 2 : 1}
      borderColor={isSelected ? 'primary' : 'onBackgroundGray2'}
      borderRadius="s12">
      <Box
        backgroundColor={isSelected ? 'primary' : undefined}
        height={12}
        width={12}
        borderRadius="s12"
      />
    </PressableBox>
  );
}
