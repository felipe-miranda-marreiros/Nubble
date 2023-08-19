import {Image} from 'react-native';

interface ProfileAvatarProps {
  imageUrl: string;
  size?: number;
  borderRadius?: number;
}

export function ProfileAvatar({
  imageUrl,
  borderRadius = 14,
  size = 32,
}: ProfileAvatarProps) {
  return (
    <Image
      source={{uri: imageUrl}}
      style={{width: size, height: size, borderRadius: borderRadius}}
    />
  );
}
