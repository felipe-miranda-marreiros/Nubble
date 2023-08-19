import {Pressable} from 'react-native';

import {Text} from '@components';

interface Props {
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export function PostCommentBottom({fetchNextPage, hasNextPage}: Props) {
  return hasNextPage ? (
    <Pressable onPress={fetchNextPage}>
      <Text bold textAlign="center" color="primary">
        Ver mais
      </Text>
    </Pressable>
  ) : null;
}
