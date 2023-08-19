import {usePaginatedList} from '@infra';

import {postCommmentService} from '../postCommentService';
import {PostComment} from '../postCommentTypes';

export function usePostCommentList(postId: number) {
  function getList(page: number) {
    return postCommmentService.getList(postId, page);
  }

  return usePaginatedList<PostComment>(getList);
}
