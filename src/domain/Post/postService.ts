import {apiAdapter} from '@api';
import {Page} from '@types';

import {postAdapter} from './postAdapter';
import {postApi} from './postApi';
import {Post} from './postTypes';

async function getList(page: number): Promise<Page<Post>> {
  const postPageAPI = await postApi.getList({page});

  return apiAdapter.toPageModel(postPageAPI, postAdapter.toPost);
}

export const postService = {
  getList,
};
