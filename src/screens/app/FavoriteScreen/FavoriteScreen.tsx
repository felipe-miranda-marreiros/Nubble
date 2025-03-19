import {Dimensions, Image, ListRenderItemInfo} from 'react-native';

import {PostReaction, postReactionService} from '@domain';
import {QueryKeys} from '@infra';

import {InfinityScrollList, PressableBox, Screen, Text} from '@components';
import {useAppNavigation} from '@hooks';
import {AppTabScreenProps} from '@routes';

const NUM_COLUMNS = 2;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_PADDING = 24;
const SCREEN_PADDING_TOTAL = SCREEN_PADDING * 2;
const ITEM_MARGIN = 16;

const ITEM_WIDTH =
  (SCREEN_WIDTH - SCREEN_PADDING_TOTAL - ITEM_MARGIN) / NUM_COLUMNS;

export function FavoriteScreen({}: AppTabScreenProps<'FavoriteScreen'>) {
  const navigation = useAppNavigation();

  function renderItem({item}: ListRenderItemInfo<PostReaction>) {
    return (
      <PressableBox
        onPress={() =>
          navigation.toPostComment({
            postAuthorId: item.author.id,
            postId: item.post.id,
          })
        }>
        <Image
          source={{uri: item.post.imageURL}}
          style={{width: ITEM_WIDTH, height: ITEM_WIDTH}}
        />
        <Text mt="s4" semiBold>
          {item.author.username}
        </Text>
      </PressableBox>
    );
  }

  return (
    <Screen title="Favoritos">
      <InfinityScrollList
        queryKey={[QueryKeys.FavoriteList]}
        flatListProps={{
          numColumns: NUM_COLUMNS,
          columnWrapperStyle: {
            columnGap: ITEM_MARGIN,
          },
          contentContainerStyle: {
            rowGap: SCREEN_PADDING,
          },
        }}
        getList={page => postReactionService.getMyReactions('favorite', page)}
        renderItem={renderItem}
        emptyListProps={{
          emptyMessage: 'não há favoritos',
          errorMessage: 'erro ao carregar favoritos',
        }}
      />
    </Screen>
  );
}
