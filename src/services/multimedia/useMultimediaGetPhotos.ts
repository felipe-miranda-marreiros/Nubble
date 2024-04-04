import {useEffect, useState} from 'react';

import {QueryKeys} from '@infra';
import {useInfiniteQuery} from '@tanstack/react-query';

import {multimediaService} from './multimediaService';

export function useMultimediaGetPhotos(
  hasPermission: boolean,
  onInitialLoad?: (imageUri: string) => void,
) {
  const [list, setList] = useState<string[]>([]);

  const {
    data,
    hasNextPage,
    fetchNextPage: fetchPage,
  } = useInfiniteQuery({
    queryKey: [QueryKeys.CameraRollList],
    queryFn: ({pageParam}) => multimediaService.getPhotos(pageParam),
    getNextPageParam: ({cursor}) => cursor,
    enabled: hasPermission,
  });

  function fetchNextPage() {
    if (!hasPermission) {
      fetchPage();
    }
  }

  useEffect(() => {
    if (data) {
      const newList = data.pages.reduce<string[]>((prev, curr) => {
        return [...prev, ...curr.photoList];
      }, []);

      setList(newList);

      if (onInitialLoad && data.pages.length === 1) {
        onInitialLoad(newList[0]);
      }
    }
  }, [data, onInitialLoad]);

  return {
    photoList: list,
    hasNextPage,
    fetchNextPage,
  };
}
