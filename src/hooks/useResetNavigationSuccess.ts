import {useNavigation} from '@react-navigation/native';

import {AuthStackParamList} from '@routes';

/**
 * Permite resetar o estado do Stack Navigator.
 * Ao entrar na página de SuccessScreen, o estado
 * passará para: LoginScreen[0] - SuccessScreen[1].
 * Ao concluir o cadastro com sucesso, usuário não
 * poderá voltar para a tela de cadastro novamente.
 * Seja pelo botão de voltar fisico ou pela navegação
 * virtual.
 */

export function useResetNavigationSuccess() {
  const navigation = useNavigation();

  const reset = (params: AuthStackParamList['SuccessScreen']) => {
    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'LoginScreen',
        },
        {
          name: 'SuccessScreen',
          params,
        },
      ],
    });
  };

  return {reset};
}
