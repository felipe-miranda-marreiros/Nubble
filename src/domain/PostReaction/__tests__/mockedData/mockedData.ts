import {Post, PostReactionBase} from '@domain';

export const mockedPostWithoutLike: Post = {
  id: 1,
  imageURL: 'fake-url',
  commentCount: 5,
  favoriteCount: 2,
  reactionCount: 8,
  text: 'this is the text (post description)',
  author: {
    id: 2,
    name: 'Maria Julia',
    profileURL: 'https://example.com',
    userName: 'mariajulia',
  },
  reactions: [],
};

export const mockedPostWithLike: Post = {
  id: 1,
  imageURL: 'fake-url',
  commentCount: 5,
  favoriteCount: 2,
  reactionCount: 8,
  text: 'this is the text (post description)',
  author: {
    id: 2,
    name: 'Maria Julia',
    profileURL: 'https://example.com',
    userName: 'mariajulia',
  },
  reactions: [{emojiType: 'like', postId: mockedPostWithoutLike.id}],
};

export const mockedPostWithoutLikeResponse: PostReactionBase = {
  id: 4,
  emojiType: 'like',
  postId: mockedPostWithoutLike.id,
  userId: 1,
  createdAt: '2021-08-01T00:00:00Z',
  updatedAt: '2021-08-01T00:00:00Z',
  isChecked: true,
};
