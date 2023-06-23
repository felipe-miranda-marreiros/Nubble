import {useState} from 'react';

import {TextInput, TextInputProps} from '@components';

import {Icon} from '../Icon/Icon';

export type PasswordInputProps = Omit<TextInputProps, 'rightComponent'>;

export function PasswordInput(props: PasswordInputProps) {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  const toggleSecureTextEntry = () => {
    setIsSecureTextEntry(prevState => !prevState);
  };

  return (
    <TextInput
      secureTextEntry={isSecureTextEntry}
      {...props}
      rightComponent={
        <Icon
          name={isSecureTextEntry ? 'eyeOn' : 'eyeOff'}
          color="gray2"
          onPress={toggleSecureTextEntry}
        />
      }
    />
  );
}
