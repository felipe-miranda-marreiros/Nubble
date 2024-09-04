import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {postService} from '../postService';

export function usePostGetById(id: number, enabled: boolean) {
  const {data, isLoading, isError, isFetching, refetch} = useQuery({
    queryFn: () => postService.getById(id),
    queryKey: [QueryKeys.PostGetById, id],
    staleTime: 1000 * 30,
    enabled,
  });

  return {
    post: data,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
}
