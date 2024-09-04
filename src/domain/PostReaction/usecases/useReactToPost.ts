import {useState} from 'react';

import {
  Post,
  PostReactionBase,
  PostReactionType,
  postReactionService,
} from '@domain';
import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

type Params = {
  post: Post;
  postReactionType: PostReactionType;
  options?: MutationOptions<PostReactionBase>;
  queryKeys?: QueryKeys[];
};

export function useReactToPost({
  post,
  queryKeys,
  postReactionType,
  options,
}: Params) {
  const initialHasReacted = postReactionService.hasReactedToPost(
    post.reactions,
    postReactionType,
  );
  const queryClient = useQueryClient();

  const initialReactionCount =
    postReactionType === 'like' ? post.reactionCount : post.favoriteCount;

  const [reactionState, setReactionState] = useState({
    hasReacted: initialHasReacted,
    reactionCount: initialReactionCount,
  });

  const {mutate} = useMutation<PostReactionBase, Error>({
    mutationFn: () =>
      postReactionService.reactToPost(post.id, postReactionType),
    onSuccess: () => {
      if (queryKeys) {
        queryKeys.forEach(
          async query =>
            await queryClient.invalidateQueries({queryKey: [query]}),
        );
      }
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
      toggleReaction();
    },
  });

  function reactToPost() {
    toggleReaction();
    mutate();
  }

  function toggleReaction() {
    setReactionState(prev => ({
      hasReacted: !prev.hasReacted,
      reactionCount: prev.hasReacted
        ? prev.reactionCount - 1
        : prev.reactionCount + 1,
    }));
  }

  return {
    hasReacted: reactionState.hasReacted,
    reactionCount: reactionState.reactionCount,
    reactToPost,
  };
}
