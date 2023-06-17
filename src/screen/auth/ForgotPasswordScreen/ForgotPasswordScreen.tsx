import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '../../../components/Button/Button';
import {Screen} from '../../../components/Screen/Screen';
import {Text} from '../../../components/Text/Text';
import {RootStackParamList} from '../../../routes/Routes';
import {useResetNavigationSuccess} from '../../../hooks/useResetNavigationSuccess';
import {
  ForgotPasswordFormType,
  forgotPasswordSchema,
} from './forgotPasswordSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {FormTextInput} from '../../../components/Form/FormTextInput';

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
