import {MutationOptions, useMutation} from '@infra';

import {postCommmentService} from '../postCommentService';

export function usePostCommentRemove(options?: MutationOptions<string>) {
  return useMutation<{postCommentId: number}, string>(
    ({postCommentId}) => postCommmentService.remove(postCommentId),
    options,
  );
}
