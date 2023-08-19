import {Post} from '@domain';

import {Box, Text} from '@components';

import {ProfileAvatar} from '../../ProfileAvatar/ProfileAvatar';

type Props = Pick<Post, 'author'>;

export function PostHeader({author}: Props) {
  return (
    <Box mb="s16" flexDirection="row" alignItems="center">
      <ProfileAvatar imageUrl={author.profileURL} />
      <Text marginLeft="s12" semiBold preset="paragraphMedium">
        {author.userName}
      </Text>
    </Box>
  );
}
