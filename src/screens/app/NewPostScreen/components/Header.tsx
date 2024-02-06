import {ImageBackground} from 'react-native';

import {images} from '@assets';
import {useNavigation} from '@react-navigation/native';

import {Box, Button, Icon, Text} from '@components';

interface Props {
  imageUri?: string;
  imageWidth: number;
}

export function Header({imageUri, imageWidth}: Props) {
  const navigation = useNavigation();

  function navigateToPublishPost() {
    if (imageUri) {
      navigation.navigate('PublishPostScreen', {
        imageUri,
      });
    }
  }

  return (
    <Box>
      <ImageBackground
        source={imageUri ? {uri: imageUri} : images.imagePlaceholder}
        style={{
          width: imageWidth,
          height: imageWidth,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        {imageUri && (
          <Button
            onPress={navigateToPublishPost}
            preset="ghost"
            title="Escolha essa"
            marginBottom="s24"
          />
        )}
      </ImageBackground>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingVertical="s16"
        paddingHorizontal="s24">
        <Text preset="headingSmall">Sua galeria</Text>
        <Icon name="camera" />
      </Box>
    </Box>
  );
}
