import {Screen, Text} from '@components';
import {AppTabScreenProps} from '@routes';

export function MyProfileScreen({
  navigation,
}: AppTabScreenProps<'MyProfileScreen'>) {
  return (
    <Screen>
      <Text preset="headingLarge">My Profile Screen</Text>
    </Screen>
  );
}
