import {
  SignUpData,
  useAuthIsEmailAvailable,
  useAuthIsUserNameAvailable,
} from '@domain';
import {UseFormGetFieldState, UseFormWatch} from 'react-hook-form';

interface Props {
  watch: UseFormWatch<SignUpData>;
  getFieldState: UseFormGetFieldState<SignUpData>;
}

interface ReturnValues {
  errorMessage?: string;
  notReady: boolean;
  isFetching: boolean;
}

export function useAsyncValidation({watch, getFieldState}: Props): {
  usernameValidation: ReturnValues;
  emailValidation: ReturnValues;
} {
  const username = watch('username');
  const usernameState = getFieldState('username');
  const usernameIsValid = !usernameState.invalid && usernameState.isDirty;

  const email = watch('email');
  const emailState = getFieldState('email');
  const emailIsValid = !emailState.invalid && emailState.isDirty;

  const userNameQuery = useAuthIsUserNameAvailable({
    username,
    enabled: usernameIsValid,
  });

  const emailQuery = useAuthIsEmailAvailable({
    email,
    enabled: emailIsValid,
  });

  return {
    usernameValidation: {
      errorMessage: userNameQuery.isUnavailable
        ? 'username indisponível'
        : undefined,
      notReady: userNameQuery.isFetching || userNameQuery.isUnavailable,
      isFetching: userNameQuery.isFetching,
    },
    emailValidation: {
      isFetching: emailQuery.isFetching,
      notReady: emailQuery.isFetching || emailQuery.isUnavailable,
      errorMessage: emailQuery.isUnavailable ? 'email indisponível' : undefined,
    },
  };
}
