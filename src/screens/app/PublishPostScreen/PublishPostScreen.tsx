import {useState} from 'react';
import {Dimensions, Image} from 'react-native';

import {usePostCreate} from '@domain';
import {useToastService} from '@services';

import {Button, Screen, Text, TextInput} from '@components';
import {AppScreenProps} from '@routes';

const IMAGE_WIDTH = Dimensions.get('screen').width / 2;

export function PublishPostScreen({
  route,
  navigation,
}: AppScreenProps<'PublishPostScreen'>) {
  const imageUri = route.params.imageUri;

  const {showToast} = useToastService();
  const {createPost, isLoading} = usePostCreate({
    onSuccess: () => {
      navigation.navigate('AppTabNavigator', {
        screen: 'HomeScreen',
      });
      showToast({message: 'Foto publicada', type: 'success'});
    },
  });
  const [description, setDescription] = useState('');

  function publishPost() {
    createPost({description, imageUri});
  }

  return (
    <Screen scrollable canGoBack title="Novo post">
      <Image
        source={{
          uri: route.params.imageUri,
        }}
        style={{
          width: IMAGE_WIDTH,
          height: IMAGE_WIDTH,
          alignSelf: 'center',
          marginTop: 20,
        }}
      />
      <Text preset="headingSmall" mt="s32" mb="s10">
        Escreva uma leganda
      </Text>
      <TextInput
        placeholder="Digite aqui"
        value={description}
        onChangeText={setDescription}
        containerProps={{
          borderWidth: 0,
        }}
      />
      <Button
        onPress={publishPost}
        isLoading={isLoading}
        disabled={isLoading || description.length < 1}
        mt="s56"
        title="Publicar post"
      />
    </Screen>
  );
}
