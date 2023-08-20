import {Pressable} from 'react-native';

import {Post} from '@domain';
import {useNavigation} from '@react-navigation/native';

import {Box, Text} from '@components';

import {ProfileAvatar} from '../../ProfileAvatar/ProfileAvatar';

type Props = Pick<Post, 'author'>;

export function PostHeader({author}: Props) {
  const navigation = useNavigation();

  function navigateTpProfile() {
    navigation.navigate('ProfileScreen', {userId: author.id});
  }

  return (
    <Pressable onPress={navigateTpProfile}>
      <Box mb="s16" flexDirection="row" alignItems="center">
        <ProfileAvatar imageUrl={author.profileURL} />
        <Text marginLeft="s12" semiBold preset="paragraphMedium">
          {author.userName}
        </Text>
      </Box>
    </Pressable>
  );
}
