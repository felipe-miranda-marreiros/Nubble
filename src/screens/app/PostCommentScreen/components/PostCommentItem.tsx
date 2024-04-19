import {Alert, Pressable} from 'react-native';

import {PostComment, postCommmentService, usePostCommentRemove} from '@domain';
import {useToastService} from '@services';

import {Box, ProfileAvatar, Text} from '@components';

interface Props {
  postId: number;
  postComment: PostComment;
  onRemoveComment: () => void;
  userId: number | null;
  postAuthorId: number;
}

export function PostCommentItem({
  postComment,
  postAuthorId,
  userId,
  postId,
  onRemoveComment,
}: Props) {
  const {mutate} = usePostCommentRemove(postId, {
    onSuccess: () => {
      onRemoveComment();
      showToast({
        message: 'Comentário deletado',
        position: 'bottom',
        type: 'success',
        duration: 4000,
      });
    },
  });
  const {showToast} = useToastService();
  const isAllowedToDelete = postCommmentService.isAllowedToDelete(
    userId,
    postComment,
    postAuthorId,
  );

  function confirmRemove() {
    Alert.alert('Deseja excluir comentário', 'pressione confirmar', [
      {
        text: 'Confirmar',
        onPress: () => mutate({postCommentId: postComment.id}),
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  }

  return (
    <Pressable
      testID="post-comment-id"
      disabled={!isAllowedToDelete}
      onLongPress={confirmRemove}>
      <Box flexDirection="row" alignItems="center" mb="s16">
        <ProfileAvatar imageUrl={postComment.author.profileURL} />
        <Box ml="s12" flex={1}>
          <Text preset="paragraphSmall" bold>
            {postComment.author.name}
          </Text>
          <Text preset="paragraphSmall" color="paragraph">
            {postComment.message} - {postComment.createdAtRelative}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}
