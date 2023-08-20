import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {userService} from '../userService';

export function useUserGetById(id: number) {
  const {data, isLoading, isError, isFetching, refetch} = useQuery({
    queryFn: () => userService.getById(id),
    queryKey: [QueryKeys.UserGetById, id],
  });

  return {
    user: data,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
}
