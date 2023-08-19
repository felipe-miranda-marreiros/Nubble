import {usePaginatedList} from '@infra';

import {postService} from '../postService';
import {Post} from '../postTypes';

export function usePostLis() {
  return usePaginatedList<Post>(postService.getList);
}
