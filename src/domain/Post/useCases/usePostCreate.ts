import {MutationOptions, QueryKeys} from '@infra';
import {ImageForUpload, multimediaService} from '@services';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {postService} from '../postService';
import {Post} from '../postTypes';

export function usePostCreate(options?: MutationOptions<Post>) {
  const queryClient = useQueryClient();

  const {mutate, isPending, isError} = useMutation<
    Post,
    unknown,
    {text: string; imageCover: ImageForUpload}
  >({
    mutationFn: ({imageCover, text}) =>
      postService.createPost(text, imageCover),
    onSuccess: post => {
      if (options?.onSuccess) {
        options.onSuccess(post);
      }
      queryClient.invalidateQueries({queryKey: [QueryKeys.PostList]});
    },
    onError: () => {
      if (options?.onError) {
        options.onError(options.errorMessage || 'Erro ao criar post');
      }
    },
  });

  async function createPost({
    description,
    imageUri,
  }: {
    description: string;
    imageUri: string;
  }) {
    const imageForUpload = await multimediaService.prepareImageForUpload(
      imageUri,
    );
    mutate({text: description, imageCover: imageForUpload});
  }

  return {
    createPost,
    isPending,
    isError,
  };
}
