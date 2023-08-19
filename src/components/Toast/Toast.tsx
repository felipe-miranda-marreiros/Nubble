import {useEffect} from 'react';

import {useToast, useToastService} from '@services';

import {ToastContent} from './components/ToastContent';

const DEFAULT_DURATION = 2000;

export function Toast() {
  const {hideToast} = useToastService();
  const toast = useToast();

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        hideToast();
      }, toast.duration || DEFAULT_DURATION);
    }
  }, [hideToast, toast]);

  if (!toast) {
    return null;
  }

  return <ToastContent toast={toast} />;
}
