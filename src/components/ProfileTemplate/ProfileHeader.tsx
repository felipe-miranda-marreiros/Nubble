import React from 'react';

import {UserDetails} from '@domain';
import {useNavigation} from '@react-navigation/native';

import {Box, Icon, ProfileAvatar, Text} from '@components';

import {BackButton} from '../BackButton/BackButton';

import {ProfileButton} from './ProfileButton';
import {ProfileMetadata} from './ProfileMetadata';

type Props = {
  user: UserDetails;
  isMyProfile?: boolean;
  publicationCount: string;
};

export function ProfileHeader({user, isMyProfile, publicationCount}: Props) {
  const navigation = useNavigation();

  return (
    <Box paddingHorizontal="s24">
      <Box alignItems="center" position="relative">
        <ProfileAvatar
          imageUrl={user?.profileUrl}
          size={100}
          borderRadius={40}
        />
        <Text preset="headingMedium" mt="s16">
          {user.fullName}
        </Text>
        <Text preset="paragraphLarge" mt="s4" color="gray1">
          @{user.username}
        </Text>
        <ProfileMetadata
          followersCount={user.meta.followersCount}
          followingCount={user.meta.followingCount}
          publicationCount={publicationCount}
        />
        {isMyProfile ? (
          <Box position="absolute" alignSelf="flex-end">
            <Icon
              size={30}
              name="settings"
              onPress={() => navigation.navigate('SettingsScreen')}
            />
          </Box>
        ) : (
          <Box position="absolute" alignSelf="flex-start" left={-24}>
            <BackButton />
          </Box>
        )}
      </Box>
      <ProfileButton
        userId={user.id}
        isMyProfile={isMyProfile}
        isFollowing={user.isFollowing}
      />
    </Box>
  );
}
