import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {useDebounce} from '@hooks';

import {authService} from '../authService';

interface Params<T extends {length: number}> {
  value: T;
  enabled: boolean;
  queryKey: QueryKeys;
  isAvailableFunc: (value: T) => Promise<boolean>;
}

function useAuthIsValueAvailable<T extends {length: number}>({
  value,
  enabled,
  isAvailableFunc,
}: Params<T>) {
  const debouncedValue = useDebounce(value, 1500);

  const {data, isFetching} = useQuery({
    queryKey: [QueryKeys.isUserNameAvailable, debouncedValue],
    queryFn: () => isAvailableFunc(debouncedValue),
    retry: false,
    staleTime: 20000,
    enabled: enabled && debouncedValue.length > 0,
  });

  const isDebouncing = debouncedValue !== value;

  return {
    isUnavailable: data === false,
    isFetching: isDebouncing || isFetching,
  };
}

export function useAuthIsUserNameAvailable({
  username,
  enabled,
}: {
  username: string;
  enabled: boolean;
}) {
  const {isFetching, isUnavailable} = useAuthIsValueAvailable({
    enabled,
    value: username,
    queryKey: QueryKeys.isUserNameAvailable,
    isAvailableFunc: authService.isUserNameAvailable,
  });

  return {
    isUnavailable,
    isFetching,
  };
}

export function useAuthIsEmailAvailable({
  email,
  enabled,
}: {
  email: string;
  enabled: boolean;
}) {
  const {isFetching, isUnavailable} = useAuthIsValueAvailable({
    enabled,
    value: email,
    queryKey: QueryKeys.isUserNameAvailable,
    isAvailableFunc: authService.isEmailAvailable,
  });

  return {
    isUnavailable,
    isFetching,
  };
}
