import {Post} from '@domain';

import {Box} from '../Box/Box';
import {ProfileUser} from '../ProfileUser/ProfileUser';

import {PostActions} from './components/PostActions';
import {PostBottom} from './components/PostBottom';
import {PostImage} from './components/PostImage';

interface PostItemProps {
  post: Post;
  hideCommentAction?: boolean;
}

export function PostItem({post, hideCommentAction}: PostItemProps) {
  return (
    <Box paddingHorizontal="s24">
      <ProfileUser
        user={{
          id: post.author.id,
          profileUrl: post.author.profileURL,
          username: post.author.userName,
        }}
      />
      <PostImage imageURL={post.imageURL} />
      <PostActions post={post} hideCommentAction={hideCommentAction} />
      <PostBottom
        hideCommentAction={hideCommentAction}
        author={post.author}
        commentCount={post.commentCount}
        id={post.id}
        text="This is my first post!"
      />
    </Box>
  );
}
