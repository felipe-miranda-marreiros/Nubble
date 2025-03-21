import {MutationOptions} from '@infra';
import {useMutation} from '@tanstack/react-query';
import {errorUtils} from '@utils';

import {authService} from '../authService';
import {EditPasswordParams} from '../authTypes';

export function useAuthUpdatePassword(options?: MutationOptions<string>) {
  const {mutate, isLoading} = useMutation<string, unknown, EditPasswordParams>({
    mutationFn: params => authService.updatePassword(params),
    retry: false,
    onSuccess: message => {
      if (options?.onSuccess) {
        options?.onSuccess(message);
      }
    },
    onError: error => {
      if (options?.onError) {
        options.onError(errorUtils.getErrorMessage(error));
      }
    },
  });

  return {
    updatePassword: (params: EditPasswordParams) => mutate(params),
    isLoading,
  };
}
