import {Text} from '../../../components/Text/Text';
import {Button} from '../../../components/Button/Button';
import {Screen} from '../../../components/Screen/Screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes/Routes';
import {useResetNavigationSuccess} from '../../../hooks/useResetNavigationSuccess';
import {useForm} from 'react-hook-form';
import {FormTextInput} from '../../../components/Form/FormTextInput';
import {FormPasswordInput} from '../../../components/Form/FormPasswordInput';
import {SignUpFormType, signUpSchema} from './signUpSchema';
import {zodResolver} from '@hookform/resolvers/zod';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;

export function SignUpScreen({navigation}: ScreenProps) {
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

    // reset({
    //   title: 'Sua conta foi criada com sucesso!',
    //   description: 'Agora é só fazer login na nossa plataforma',
    //   icon: {
    //     name: 'checkRound',
    //     color: 'success',
    //   },
    // });
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
