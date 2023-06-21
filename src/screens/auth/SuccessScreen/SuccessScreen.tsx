import {Button, Icon, Screen, Text} from '@components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@routes';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'SuccessScreen'>;

export function SuccessScreen({route, navigation}: ScreenProps) {
  const goBackToBegin = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Screen>
      <Icon name={route.params.icon.name} color={route.params.icon.color} />
      <Text preset="headingLarge" mt="s24">
        {route.params.title}
      </Text>
      <Text preset="paragraphLarge" mt="s16">
        {route.params.description}
      </Text>
      <Button onPress={goBackToBegin} title="Voltar ao início" mt="s40" />
    </Screen>
  );
}
