import {apiAdapter} from '@api';
import {ImageForUpload} from '@services';
import {Page} from '@types';

import {postAdapter} from './postAdapter';
import {postApi} from './postApi';
import {Post} from './postTypes';

async function getList(page: number): Promise<Page<Post>> {
  const postPageAPI = await postApi.getList({page});

  return apiAdapter.toPageModel(postPageAPI, postAdapter.toPost);
}

async function createPost(
  text: string,
  imageCover: ImageForUpload,
): Promise<Post> {
  const postPageAPI = await postApi.createPost(text, imageCover);

  return postAdapter.toPost(postPageAPI);
}

export const postService = {
  getList,
  createPost,
};
