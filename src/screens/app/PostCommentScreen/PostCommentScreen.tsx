import {FlatList, ListRenderItemInfo} from 'react-native';

import {PostComment, usePostCommentList, usePostGetById} from '@domain';
import {useAuthCredentials} from '@services';

import {Box, PostItem, Screen} from '@components';
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
  const showPost = route.params.showPost || false;

  const {list, hasNextPage, fetchNextPage, refresh} =
    usePostCommentList(postId);

  const {post} = usePostGetById(postId, showPost);

  const {bottom} = useAppSafeArea();

  const {userId} = useAuthCredentials();

  function renderItem({item}: ListRenderItemInfo<PostComment>) {
    return (
      <PostCommentItem
        postId={postId}
        onRemoveComment={refresh}
        postComment={item}
        postAuthorId={postAuthorId}
        userId={userId}
      />
    );
  }

  return (
    <Screen
      noPaddingHorizontal
      flex={1}
      title={showPost ? 'Post' : 'Comentários'}
      canGoBack>
      <Box flex={1} justifyContent="space-between">
        <FlatList
          data={list}
          contentContainerStyle={{paddingBottom: bottom}}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            post && <PostItem post={post} hideCommentAction />
          }
          ListFooterComponent={
            <PostCommentBottom
              hasNextPage={!!hasNextPage}
              fetchNextPage={fetchNextPage}
            />
          }
        />
        <PostCommentTextMessage postId={postId} />
      </Box>
    </Screen>
  );
}
