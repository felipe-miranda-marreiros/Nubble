import React, {useEffect, useImperativeHandle} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {User, authService, useUserUpdate} from '@domain';
import {useAsyncValidation} from '@form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

import {FormTextInput} from '@components';

import {EditProfileSchema, editProfileSchema} from '../editProfileSchema';

export type EditProfileFormRef = {
  onSubmit: () => void;
};

type Props = {
  user: User;
  onChangeIsValid: (isValid: boolean) => void;
  onChangeIsLoading: (isLoading: boolean) => void;
};

export function EditProfileFormComponent(
  {user, onChangeIsValid, onChangeIsLoading}: Props,
  ref: React.Ref<EditProfileFormRef>,
) {
  const {control, watch, formState, handleSubmit, getFieldState} =
    useForm<EditProfileSchema>({
      resolver: zodResolver(editProfileSchema),
      defaultValues: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      mode: 'onChange',
    });

  const navigation = useNavigation();
  const {isLoading, updateUser} = useUserUpdate({
    onSuccess: () => {
      navigation.goBack();
    },
    // onError: errorMessage => {

    // }
  });

  useEffect(() => {
    onChangeIsLoading(isLoading);
  }, [isLoading, onChangeIsLoading]);

  const usernameValidation = useAsyncValidation({
    watch,
    getFieldState,
    fieldName: 'username',
    errorMessage: 'username indisponível',
    isAvailableFunc: authService.isUserNameAvailable,
  });

  useEffect(() => {
    onChangeIsValid(formState.isValid && !usernameValidation.notReady);
  }, [formState.isValid, onChangeIsValid, usernameValidation.notReady]);

  useImperativeHandle(ref, () => ({
    onSubmit: () => {
      handleSubmit(formValues => updateUser(formValues))();
    },
  }));

  return (
    <View>
      <FormTextInput
        control={control}
        name="username"
        label="Seu username"
        placeholder="@"
        errorMessage={usernameValidation.errorMessage}
        boxProps={{mb: 's20'}}
        rightComponent={
          usernameValidation.isFetching ? (
            <ActivityIndicator size="small" />
          ) : undefined
        }
      />

      <FormTextInput
        control={control}
        name="firstName"
        autoCapitalize="words"
        label="Nome"
        placeholder="Digite seu nome"
        boxProps={{mb: 's20'}}
      />
      <FormTextInput
        control={control}
        name="lastName"
        autoCapitalize="words"
        label="Sobrenome"
        placeholder="Digite seu sobrenome"
        boxProps={{mb: 's20'}}
      />
    </View>
  );
}

export const EditProfileForm = React.forwardRef(EditProfileFormComponent);
