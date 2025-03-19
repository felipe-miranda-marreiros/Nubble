import {Post, useReactToPost} from '@domain';
import {QueryKeys} from '@infra';

import {Box, Icon, IconProps, Text, TouchableOpacityBox} from '@components';
import {useAppNavigation} from '@hooks';

type Props = {
  post: Post;
  hideCommentAction?: boolean;
};

export function PostActions({post, hideCommentAction}: Props) {
  const navigate = useAppNavigation();

  const likeReaction = useReactToPost({
    post,
    postReactionType: 'like',
    queryKeys: [QueryKeys.FavoriteList],
  });
  const favoriteReaction = useReactToPost({
    post,
    postReactionType: 'favorite',
    queryKeys: [QueryKeys.FavoriteList],
  });

  const navigateToCommment = () => {
    navigate.toPostComment({
      postId: post.id,
      postAuthorId: post.author.id,
    });
  };

  return (
    <Box mt="s16" flexDirection="row">
      <Item
        onPress={likeReaction.reactToPost}
        text={likeReaction.reactionCount}
        marked={likeReaction.hasReacted}
        icon={{
          default: 'heart',
          marked: 'heartFill',
        }}
      />
      <Item
        disabled={hideCommentAction}
        marked={false}
        onPress={navigateToCommment}
        icon={{
          default: 'comment',
          marked: 'comment',
        }}
        text={post.commentCount}
      />
      <Item
        disabled={hideCommentAction}
        marked={favoriteReaction.hasReacted}
        text={favoriteReaction.reactionCount}
        onPress={favoriteReaction.reactToPost}
        icon={{
          default: 'bookmark',
          marked: 'bookmarkFill',
        }}
      />
    </Box>
  );
}

interface ItemProps {
  onPress: () => void;
  icon: {
    default: IconProps['name'];
    marked: IconProps['name'];
  };
  marked: boolean;
  text: number;
  disabled?: boolean;
}

function Item({onPress, icon, text, marked, disabled}: ItemProps) {
  return (
    <TouchableOpacityBox
      flexDirection="row"
      alignItems="center"
      disabled={disabled}
      onPress={onPress}
      mr="s24">
      <Icon
        color={marked ? 'marked' : undefined}
        name={marked ? icon.marked : icon.default}
      />
      {text > 0 && (
        <Text preset="paragraphSmall" marginLeft="s4">
          {text}
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
