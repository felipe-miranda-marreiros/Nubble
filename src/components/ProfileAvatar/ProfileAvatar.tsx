import {Image, Pressable} from 'react-native';

import {useAppNavigation} from '@hooks';

export interface ProfileAvatarProps {
  imageUrl: string;
  size?: number;
  borderRadius?: number;
  authorId?: number;
}

export function ProfileAvatar({
  imageUrl,
  borderRadius = 14,
  size = 32,
  authorId,
}: ProfileAvatarProps) {
  const navigate = useAppNavigation();

  function handleOnPress() {
    if (authorId) {
      navigate.toProfile(authorId);
    }
  }

  return (
    <Pressable disabled={!authorId} onPress={handleOnPress}>
      <Image
        source={{uri: imageUrl}}
        style={{width: size, height: size, borderRadius}}
      />
    </Pressable>
  );
}
