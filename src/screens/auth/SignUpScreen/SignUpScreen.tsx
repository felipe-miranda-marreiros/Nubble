import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {AuthScreenProps} from 'src/routes/navigationType';

import {
  Button,
  FormPasswordInput,
  FormTextInput,
  Screen,
  Text,
} from '@components';
import {useResetNavigationSuccess} from '@hooks';

import {SignUpFormType, signUpSchema} from './signUpSchema';

export function SignUpScreen({navigation}: AuthScreenProps<'SignUpScreen'>) {
  const {handleSubmit, control, formState} = useForm<SignUpFormType>({
    defaultValues: {
      email: '',
      fullname: '',
      password: '',
      username: '',
    },
    resolver: zodResolver(signUpSchema),
  });

  const {reset} = useResetNavigationSuccess();

  const onSubmit = (data: SignUpFormType) => {
    console.log(data);

    reset({
      title: 'Sua conta foi criada com sucesso!',
      description: 'Agora é só fazer login na nossa plataforma',
      icon: {
        name: 'checkRound',
        color: 'success',
      },
    });
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
      />
      <FormTextInput
        control={control}
        label="Nome completo"
        name="fullname"
        placeholder="Digite o seu nome completo"
        boxProps={{mb: 's20'}}
      />
      <FormTextInput
        control={control}
        label="E-mail"
        name="email"
        placeholder="Digite o seu e-mail"
        boxProps={{mb: 's20'}}
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
        disabled={!formState.isValid}
        title="Criar conta"
      />
    </Screen>
  );
}
