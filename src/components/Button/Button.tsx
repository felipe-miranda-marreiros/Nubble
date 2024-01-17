import React from 'react';

import {
  ActivityIndicator,
  TouchableOpacityBox,
  Text,
  TouchableOpacityBoxProps,
} from '@components';

import {ButtonPreset, buttonPresets} from './buttonPresets';

export interface ButtonProps extends TouchableOpacityBoxProps {
  title: string;
  isLoading?: boolean;
  preset?: ButtonPreset;
  disabled?: boolean;
}

export function Button({
  title,
  isLoading,
  preset = 'primary',
  disabled,
  ...touchableOpacityBoxProps
}: ButtonProps) {
  const buttonPreset = buttonPresets[preset][disabled ? 'disabled' : 'default'];

  return (
    <TouchableOpacityBox
      testID="button"
      disabled={disabled || isLoading}
      alignItems="center"
      justifyContent="center"
      paddingHorizontal="s20"
      height={50}
      borderRadius="s16"
      {...buttonPreset.container}
      {...touchableOpacityBoxProps}>
      {isLoading ? (
        <ActivityIndicator color={buttonPreset.content} />
      ) : (
        <Text color={buttonPreset.content} preset="paragraphMedium" bold>
          {title}
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
