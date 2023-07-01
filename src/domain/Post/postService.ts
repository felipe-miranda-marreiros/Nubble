import {postApi} from './postApi';
import {Post} from './types';

async function getList(): Promise<Post[]> {
  await new Promise(resolve => setTimeout(() => resolve(''), 2000));
  const postList = await postApi.getList();
  return postList;
}

export const postService = {
  getList,
};
