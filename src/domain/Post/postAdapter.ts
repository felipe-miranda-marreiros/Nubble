import {Post, PostAPI} from './postTypes';

function toPost(postAPI: PostAPI): Post {
  return {
    id: postAPI.id.toString(),
    text: postAPI.text,
    author: {
      profileURL: postAPI.user.profile_url,
      name: postAPI.user.full_name,
      userName: postAPI.user.username,
    },
    reactionCount: parseInt(postAPI.meta.like_count, 10),
    imageURL: postAPI.image_url,
    commentCount: parseInt(postAPI.meta.comments_count, 10),
    favoriteCount: parseInt(postAPI.meta.favorite_count, 10),
  };
}

export const postAdapter = {
  toPost,
};
