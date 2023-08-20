import {useRef} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {Post, usePostLis} from '@domain';
import {useScrollToTop} from '@react-navigation/native';

import {PostItem, Screen} from '@components';

import {HomeEmpty} from './components/HomeEmpty';
import {HomeHeader} from './components/HomeHeader';

export function HomeScreen() {
  const {
    isError,
    isLoading,
    list: postList,
    refresh,
    fetchNextPage,
  } = usePostLis();
  const flatListRef = useRef<FlatList<Post>>(null);
  useScrollToTop(flatListRef);

  function renderItem({item}: ListRenderItemInfo<Post>) {
    return <PostItem post={item} />;
  }

  return (
    <Screen style={$screen}>
      <FlatList
        ref={flatListRef}
        data={postList}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onEndReached={fetchNextPage}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refresh} />
        }
        refreshing={isLoading}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flex: postList.length === 0 ? 1 : undefined}}
        ListHeaderComponent={<HomeHeader />}
        ListEmptyComponent={
          <HomeEmpty refetch={refresh} loading={isLoading} error={isError} />
        }
      />
    </Screen>
  );
}

const $screen: StyleProp<ViewStyle> = {
  paddingBottom: 0,
  paddingTop: 0,
  paddingHorizontal: 0,
  flex: 1,
};
