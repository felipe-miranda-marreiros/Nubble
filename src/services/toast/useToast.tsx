import {ToastService} from './toastTypes';
import {useToastServiceZustand, useToastZustand} from './useToastStore';

export function useToast(): ToastService['toast'] {
  const toast = useToastZustand();
  return toast;
}

export function useToastService(): Pick<
  ToastService,
  'hideToast' | 'showToast'
> {
  const {hideToast, showToast} = useToastServiceZustand();

  return {
    hideToast,
    showToast,
  };
}
