import {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItemInfo,
  Pressable,
} from 'react-native';

import {useMultimediaGetPhotos, usePermission} from '@services';

import {PermissionManager, Screen} from '@components';
import {AppTabScreenProps} from '@routes';

import {Header} from './components/Header';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const NUM_COLUMNS = 4;
const ITEM_WIDTH = SCREEN_WIDTH / NUM_COLUMNS;

export function NewPostScreen({}: AppTabScreenProps<'NewPostScreen'>) {
  const {status} = usePermission('photoLibrary');
  const [selectedImage, setSelectedImage] = useState<string>();
  const {photoList, fetchNextPage} = useMultimediaGetPhotos(
    status === 'granted',
    setSelectedImage,
  );
  const flatListRef = useRef<FlatList>(null);

  function onSelectImage(imageUri: string) {
    setSelectedImage(imageUri);
    flatListRef.current?.scrollToOffset({offset: 0, animated: true});
  }

  function renderItem({item}: ListRenderItemInfo<string>) {
    return (
      <Pressable onPress={() => onSelectImage(item)}>
        <Image
          key={item}
          source={{uri: item}}
          style={{width: ITEM_WIDTH, height: ITEM_WIDTH}}
        />
      </Pressable>
    );
  }

  return (
    <PermissionManager
      permissionName="photoLibrary"
      description="Permita o Nubble acessar as imagens da sua galeria">
      <Screen canGoBack noPaddingHorizontal title="Novo post">
        <FlatList
          ref={flatListRef}
          numColumns={NUM_COLUMNS}
          data={photoList}
          renderItem={renderItem}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={
            <Header imageUri={selectedImage} imageWidth={SCREEN_WIDTH} />
          }
        />
      </Screen>
    </PermissionManager>
  );
}
