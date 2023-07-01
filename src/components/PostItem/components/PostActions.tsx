import {Post} from '@domain';

import {Box, Icon, IconProps, Text, TouchableOpacityBox} from '@components';

type Props = Pick<Post, 'commentCount' | 'favoriteCount' | 'reactionCount'>;

export function PostActions({
  commentCount,
  favoriteCount,
  reactionCount,
}: Props) {
  const likePost = () => {
    // TODO
  };
  const navigateToCommment = () => {
    // TODO
  };
  const favoritePost = () => {
    // TODO
  };

  return (
    <Box mt="s16" flexDirection="row">
      <Item
        marked
        onPress={likePost}
        icon={{
          default: 'heart',
          marked: 'heartFill',
        }}
        text={reactionCount}
      />
      <Item
        marked={false}
        onPress={navigateToCommment}
        icon={{
          default: 'comment',
          marked: 'comment',
        }}
        text={commentCount}
      />
      <Item
        marked={false}
        onPress={favoritePost}
        icon={{
          default: 'bookmark',
          marked: 'bookmarkFill',
        }}
        text={favoriteCount}
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
}

function Item({onPress, icon, text, marked}: ItemProps) {
  return (
    <TouchableOpacityBox
      flexDirection="row"
      alignItems="center"
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
