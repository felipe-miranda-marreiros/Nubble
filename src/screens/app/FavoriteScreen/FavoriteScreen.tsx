import {Screen, Text} from '@components';
import {AppTabScreenProps} from '@routes';

export function FavoriteScreen({
  navigation,
}: AppTabScreenProps<'FavoriteScreen'>) {
  return (
    <Screen>
      <Text preset="headingLarge">Favorite Screen</Text>
    </Screen>
  );
}
