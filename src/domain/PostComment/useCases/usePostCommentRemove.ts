import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {postCommmentService} from '../postCommentService';

export function usePostCommentRemove(
  postId: number,
  options?: MutationOptions<string>,
) {
  const queryClient = useQueryClient();

  const {mutate} = useMutation<string, unknown, {postCommentId: number}>({
    mutationFn: ({postCommentId}) => postCommmentService.remove(postCommentId),
    onSuccess: async message => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.PostCommentList, postId],
      });
      if (options?.onSuccess) {
        options.onSuccess(message);
      }
    },
    onError: () => {
      if (options?.onError) {
        options.onError(options.errorMessage || 'Ocorreu um erro');
      }
    },
  });

  return {
    mutate,
  };
}
