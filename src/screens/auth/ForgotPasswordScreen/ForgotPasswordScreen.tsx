import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ForgotPasswordFormType,
  forgotPasswordSchema,
} from './forgotPasswordSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {RootStackParamList} from '@routes';
import {useResetNavigationSuccess} from '@hooks';
import {Button, FormTextInput, Screen, Text} from '@components';

type ScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPasswordScreen'
>;

export function ForgotPasswordScreen({navigation}: ScreenProps) {
  const {handleSubmit, control, formState} = useForm<ForgotPasswordFormType>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {reset} = useResetNavigationSuccess();

  const onSubmit = () => {
    reset({
      title: 'Enviamos as instruções para seu e-mail',
      description:
        'Clique no link enviado no seu e-mail para recuperar sua senha',
      icon: {
        name: 'messageRound',
        color: 'primary',
      },
    });
  };

  return (
    <Screen canGoBack>
      <Text preset="headingLarge" mb="s16">
        Esqueci minha senha
      </Text>
      <Text preset="paragraphLarge" mb="s32">
        Digite seu e-mail e enviaremos as instruções para redefinição de senha
      </Text>
      <FormTextInput
        control={control}
        label="E-mail"
        name="email"
        placeholder="Digite o seu e-mail"
        boxProps={{mb: 's40'}}
      />
      <Button
        disabled={!formState.isValid}
        onPress={handleSubmit(onSubmit)}
        title="Recuperar senha"
      />
    </Screen>
  );
}
