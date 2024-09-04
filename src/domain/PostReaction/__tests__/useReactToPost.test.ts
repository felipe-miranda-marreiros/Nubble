import {act, renderHook, waitFor} from 'test-utils';

import {postReactionService} from '../postReactionService';
import {useReactToPost} from '../usecases/useReactToPost';

import {
  mockedPostWithLike,
  mockedPostWithoutLike,
  mockedPostWithoutLikeResponse,
} from './mockedData/mockedData';

describe('useReactToPost', () => {
  it('when react to post, hasReacted and reactionCount should be update', async () => {
    jest
      .spyOn(postReactionService, 'reactToPost')
      .mockResolvedValueOnce(mockedPostWithoutLikeResponse);

    const {result} = renderHook(() =>
      useReactToPost({
        post: mockedPostWithoutLike,
        postReactionType: 'like',
      }),
    );

    expect(result.current.hasReacted).toBe(false);
    expect(result.current.reactionCount).toBe(
      mockedPostWithoutLike.reactionCount,
    );

    await act(() => {
      result.current.reactToPost();
    });

    await waitFor(() => expect(result.current.hasReacted).toBe(true));
    await waitFor(() =>
      expect(result.current.reactionCount).toBe(
        mockedPostWithoutLike.reactionCount + 1,
      ),
    );
  });
  it('when failed a react to post, hasReacted and reactionCount should return to original state', async () => {
    jest
      .spyOn(postReactionService, 'reactToPost')
      .mockRejectedValueOnce(new Error());

    const onError = jest.fn();

    const {result} = renderHook(() =>
      useReactToPost({
        post: mockedPostWithLike,
        postReactionType: 'like',
        options: {
          onError,
        },
      }),
    );

    await act(() => {
      result.current.reactToPost();
    });

    await waitFor(() => {
      expect(result.current.reactionCount).toBe(
        mockedPostWithLike.reactionCount,
      );
      expect(onError).toHaveBeenCalled();
    });
  });
});
