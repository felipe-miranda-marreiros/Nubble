import {Post} from '@domain';

import {Box, Text} from '@components';

type Props = Pick<Post, 'author' | 'text' | 'commentCount'>;

export function PostBottom({author, commentCount, text}: Props) {
  const commentText = getCommentText(commentCount);

  return (
    <Box>
      <Text preset="paragraphMedium" bold>
        {author.userName}
      </Text>
      <Text preset="paragraphMedium" color="gray1">
        {text}
      </Text>
      {commentCount > 0 && (
        <Text mt="s8" preset="paragraphSmall" bold color="primary">
          {commentText}
        </Text>
      )}
    </Box>
  );
}

function getCommentText(commentCount: number) {
  let commentText;
  if (commentCount === 0) {
    return null;
  } else if (commentCount === 1) {
    commentText = 'ver comentário';
  } else {
    commentText = `ver ${commentCount} comentários`;
  }
  return commentText;
}
