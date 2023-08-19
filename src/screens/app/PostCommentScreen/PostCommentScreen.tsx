import {FlatList, ListRenderItemInfo} from 'react-native';

import {PostComment, usePostCommentList, useUser} from '@domain';

import {Box, Screen} from '@components';
import {useAppSafeArea} from '@hooks';
import {AppScreenProps} from '@routes';

import {PostCommentBottom} from './components/PostCommentBottom';
import {PostCommentItem} from './components/PostCommentItem';
import {PostCommentTextMessage} from './components/PostCommentTextMessage';

export function PostCommentScreen({
  route,
}: AppScreenProps<'PostCommentScreen'>) {
  const postId = route.params.postId;
  const postAuthorId = route.params.postAuthorId;

  const {list, hasNextPage, fetchNextPage, refresh} =
    usePostCommentList(postId);
  const {bottom} = useAppSafeArea();
  const {id} = useUser();

  function renderItem({item}: ListRenderItemInfo<PostComment>) {
    return (
      <PostCommentItem
        onRemoveComment={refresh}
        postComment={item}
        postAuthorId={postAuthorId}
        userId={id}
      />
    );
  }

  return (
    <Screen flex={1} title="Comentários" canGoBack>
      <Box flex={1} justifyContent="space-between">
        <FlatList
          data={list}
          contentContainerStyle={{paddingBottom: bottom}}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <PostCommentBottom
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
            />
          }
        />
        <PostCommentTextMessage onAddComment={refresh} postId={postId} />
      </Box>
    </Screen>
  );
}
