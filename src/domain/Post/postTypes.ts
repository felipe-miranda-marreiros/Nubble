import {PostReaction, PostReactionAPI} from '../PostReaction';
import {UserAPI} from '../User';

export interface Post {
  id: number;
  text: string;
  author: {
    profileURL: string;
    name: string;
    userName: string;
    id: number;
  };
  imageURL: string;
  reactionCount: number;
  commentCount: number;
  favoriteCount: number;
  reactions: Pick<PostReaction, 'emojiType' | 'postId'>[];
}

export interface PostAPI {
  created_at: string;
  id: number;
  image_url: string;
  is_activated: boolean;
  is_fixed: boolean;
  meta: {
    comments_count: string;
    favorite_count: string;
    like_count: string;
  };
  status: string;
  text: string;
  updated_at: string;
  user: UserAPI;
  user_id: number;
  reactions: Pick<PostReactionAPI, 'emoji_type' | 'post_id'>[];
}
