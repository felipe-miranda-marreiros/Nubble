import {ListRenderItemInfo, StyleProp, ViewStyle} from 'react-native';

import {Post, postService} from '@domain';
import {QueryKeys} from '@infra';

import {InfinityScrollList, PostItem, Screen} from '@components';

import {HomeHeader} from './components/HomeHeader';

export function HomeScreen() {
  function renderItem({item}: ListRenderItemInfo<Post>) {
    return <PostItem post={item} />;
  }

  return (
    <Screen style={$screen}>
      <InfinityScrollList
        queryKey={[QueryKeys.PostList]}
        getList={postService.getList}
        renderItem={renderItem}
        flatListProps={{
          ListHeaderComponent: HomeHeader,
        }}
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
