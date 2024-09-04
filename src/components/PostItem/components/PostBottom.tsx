import {Post} from '@domain';
import {useNavigation} from '@react-navigation/native';

import {Box, Text} from '@components';

type Props = Pick<Post, 'author' | 'text' | 'commentCount' | 'id'> & {
  hideCommentAction?: boolean;
};

export function PostBottom({
  author,
  hideCommentAction,
  commentCount,
  text,
  id,
}: Props) {
  const commentText = hideCommentAction ? null : getCommentText(commentCount);

  const navigation = useNavigation();

  function navigateToPostCommentScreen() {
    navigation.navigate('PostCommentScreen', {
      postId: id,
      postAuthorId: author.id,
    });
  }

  return (
    <Box>
      <Text preset="paragraphMedium" bold>
        {author.userName}
      </Text>
      <Text preset="paragraphMedium" color="gray1">
        {text}
      </Text>
      {commentCount > 0 && (
        <Text
          onPress={navigateToPostCommentScreen}
          mt="s8"
          preset="paragraphSmall"
          bold
          color="primary">
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
