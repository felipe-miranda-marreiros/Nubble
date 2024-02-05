import {GestureResponderEvent} from 'react-native';

import {User} from '@domain';
import {useNavigation} from '@react-navigation/native';

import {
  Box,
  PressableBox,
  PressableBoxProps,
  ProfileAvatar,
  ProfileAvatarProps,
  Text,
} from '@components';

type Props = {
  user: Pick<User, 'username' | 'profileUrl' | 'id'>;
  avatarProps?: Omit<Partial<ProfileAvatarProps>, 'imageUrl'>;
  RightComponent?: React.ReactElement;
} & PressableBoxProps;

export function ProfileUser({
  user: {id, profileUrl, username},
  onPress,
  avatarProps,
  RightComponent,
  ...pressableBoxProps
}: Props) {
  const navigation = useNavigation();

  function handleOnPress(event: GestureResponderEvent) {
    if (onPress) {
      onPress(event);
    }
    navigation.navigate('ProfileScreen', {userId: id});
  }

  return (
    <PressableBox
      onPress={handleOnPress}
      justifyContent="space-between"
      flexDirection="row"
      alignItems="center"
      mb="s16"
      {...pressableBoxProps}>
      <Box flexDirection="row" alignItems="center">
        <ProfileAvatar {...avatarProps} imageUrl={profileUrl} />
        <Text marginLeft="s12" semiBold preset="paragraphMedium">
          {username}
        </Text>
      </Box>
      {RightComponent}
    </PressableBox>
  );
}
