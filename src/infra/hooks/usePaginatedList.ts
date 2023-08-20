import {useEffect, useState} from 'react';

import {useInfiniteQuery} from '@tanstack/react-query';
import {Page} from '@types';

export interface UsePaginatedList<TData> {
  list: TData[];
  isError: boolean;
  isLoading: boolean;
  hasNextPage: boolean | undefined;
  refresh: () => void;
  fetchNextPage: () => void;
}

export function usePaginatedList<Data>(
  queryKey: readonly unknown[],
  getList: (page: number) => Promise<Page<Data>>,
): UsePaginatedList<Data> {
  const [list, setList] = useState<Data[]>([]);

  const {data, isError, isLoading, refetch, hasNextPage, fetchNextPage} =
    useInfiniteQuery({
      queryKey,
      queryFn: ({pageParam = 1}) => getList(pageParam),
      getNextPageParam: ({meta}) => {
        if (meta.hasNextPage) {
          return meta.currentPage + 1;
        }
      },
    });

  useEffect(() => {
    if (data) {
      const newList = data.pages.reduce<Data[]>((prev, curr) => {
        return [...prev, ...curr.data];
      }, []);
      setList(newList);
    }
  }, [data]);

  return {
    list,
    isLoading,
    isError,
    refresh: refetch,
    fetchNextPage,
    hasNextPage,
  };
}
