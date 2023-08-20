import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {postCommmentService} from '../postCommentService';
import {PostComment} from '../postCommentTypes';

export function usePostCommentCreate(
  postId: number,
  options: MutationOptions<PostComment>,
) {
  const queryClient = useQueryClient();

  const {mutate, isLoading, isError} = useMutation<
    PostComment,
    unknown,
    {message: string}
  >({
    mutationFn: ({message}) => postCommmentService.create(postId, message),
    onSuccess: async data => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.PostCommentList],
      });
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: () => {
      if (options?.onError) {
        options.onError(options?.errorMessage || 'Ocorreu um erro');
      }
    },
  });

  function createComment(message: string) {
    mutate({message});
  }

  return {
    createComment,
    isError,
    isLoading,
  };
}
