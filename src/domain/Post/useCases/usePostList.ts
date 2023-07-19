import {useEffect, useState} from 'react';

import {postService} from '../postService';
import {Post} from '../postTypes';

export function usePostLis() {
  const [postList, setPostList] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean | null>(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchInitialData = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const {data, meta} = await postService.getList(page);
      setPostList(data);
      if (meta.hasNextPage) {
        setPage(2);
      } else {
        setHasNextPage(false);
      }
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNextPage() {
    if (isLoading || !hasNextPage) {
      return;
    }
    try {
      setIsLoading(true);
      const {data, meta} = await postService.getList(page);
      setPostList(prevState => [...prevState, ...data]);
      if (meta.hasNextPage) {
        setPage(prev => prev + 1);
      } else {
        setHasNextPage(false);
      }
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    postList,
    isLoading,
    error,
    refresh: fetchInitialData,
    fetchNextPage,
  };
}
