import {apiAdapter} from '@api';
import {ImageForUpload} from '@services';
import {Page} from '@types';

import {postAdapter} from './postAdapter';
import {postApi} from './postApi';
import {Post} from './postTypes';

async function getList(page: number, userId?: number): Promise<Page<Post>> {
  const postPageAPI = await postApi.getList({
    page,
    user_id: userId,
    per_page: 10,
  });

  return apiAdapter.toPageModel(postPageAPI, postAdapter.toPost);
}

async function createPost(
  text: string,
  imageCover: ImageForUpload,
): Promise<Post> {
  const postPageAPI = await postApi.createPost(text, imageCover);

  return postAdapter.toPost(postPageAPI);
}

async function getById(postId: number): Promise<Post> {
  const response = await postApi.getById(postId.toString());
  return postAdapter.toPost(response);
}

export const postService = {
  getList,
  createPost,
  getById,
};
