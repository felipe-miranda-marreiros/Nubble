import {PageAPI, PageParams, api} from '@api';

import {PostCommentAPI} from './postCommentTypes';

const POST_COMMENT_PATH = 'user/post_comment';

async function getList(
  post_id: number,
  page_params?: PageParams,
): Promise<PageAPI<PostCommentAPI>> {
  const response = await api.get<PageAPI<PostCommentAPI>>(POST_COMMENT_PATH, {
    params: {
      ...page_params,
      post_id,
    },
  });
  return response.data;
}

async function create(
  post_id: number,
  message: string,
): Promise<PostCommentAPI> {
  const response = await api.post<PostCommentAPI>(POST_COMMENT_PATH, {
    post_id,
    message,
  });
  return response.data;
}

async function remove(postCommentId: number): Promise<{message: string}> {
  const response = await api.delete<{message: string}>(
    `${POST_COMMENT_PATH}/${postCommentId}`,
  );
  return response.data;
}

export const postCommentApi = {
  getList,
  create,
  remove,
  POST_COMMENT_PATH,
};
