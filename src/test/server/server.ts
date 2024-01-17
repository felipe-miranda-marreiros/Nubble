import {setupServer} from 'msw/node';

import {postCommentHandlers} from './PostComment/PostCommentHandlers';

export const server = setupServer(...postCommentHandlers);

export {mockedData as mockedPostComment} from './PostComment/mocks';

export {resetInMemoryResponse} from './PostComment/PostCommentHandlers';
