import {useAuthSignUp} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {AuthScreenProps} from 'src/routes/navigationType';

import {
  ActivityIndicator,
  Button,
  FormPasswordInput,
  FormTextInput,
  Screen,
  Text,
} from '@components';
import {useResetNavigationSuccess} from '@hooks';
import {AuthStackParamList} from '@routes';

import {SignUpSchema, signUpSchema} from './signUpSchema';
import {useAsyncValidation} from './useAsyncValidation';

const resetParam: AuthStackParamList['SuccessScreen'] = {
  title: 'Sua conta foi criada com sucesso!',
  description: 'Agora é só fazer login na nossa plataforma',
  icon: {
    name: 'checkRound',
    color: 'success',
  },
};

const defaultValues: SignUpSchema = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  username: '',
};

export function SignUpScreen({}: AuthScreenProps<'SignUpScreen'>) {
  const {isLoading, signUp} = useAuthSignUp({
    onSuccess: () => {
      reset(resetParam);
    },
  });

  const {handleSubmit, watch, control, formState, getFieldState} =
    useForm<SignUpSchema>({
      defaultValues,
      resolver: zodResolver(signUpSchema),
      mode: 'onChange',
    });

  const {usernameValidation, emailValidation} = useAsyncValidation({
    getFieldState,
    watch,
  });

  const {reset} = useResetNavigationSuccess();

  const onSubmit = (data: SignUpSchema) => {
    signUp(data);
  };

  return (
    <Screen canGoBack scrollable>
      <Text mb="s32" preset="headingLarge">
        Criar uma conta
      </Text>
      <FormTextInput
        control={control}
        label="Username"
        name="username"
        placeholder="@"
        boxProps={{mb: 's20'}}
        errorMessage={usernameValidation.errorMessage}
        rightComponent={
          usernameValidation.isFetching ? (
            <ActivityIndicator size="small" />
          ) : undefined
        }
      />
      <FormTextInput
        control={control}
        label="Nome"
        name="firstName"
        placeholder="Digite o seu nome completo"
        boxProps={{mb: 's20'}}
      />
      <FormTextInput
        control={control}
        label="Sobrenome"
        name="lastName"
        placeholder="Digite o seu nome completo"
        boxProps={{mb: 's20'}}
      />
      <FormTextInput
        control={control}
        label="E-mail"
        name="email"
        placeholder="Digite o seu e-mail"
        boxProps={{mb: 's20'}}
        errorMessage={emailValidation.errorMessage}
        rightComponent={
          emailValidation.isFetching ? (
            <ActivityIndicator size="small" />
          ) : undefined
        }
      />
      <FormPasswordInput
        label="Senha"
        name="password"
        control={control}
        placeholder="Digite sua senha"
        boxProps={{mb: 's48'}}
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={
          !formState.isValid ||
          usernameValidation.isFetching ||
          usernameValidation.notReady
        }
        title="Criar conta"
        isLoading={isLoading}
      />
    </Screen>
  );
}
