import {create} from 'zustand';
import {persist} from 'zustand/middleware';

import {storage} from '../storage';

import {SearchHistoryService} from './searchHistoryTypes';

const useSearchHistoryStore = create<SearchHistoryService>()(
  persist(
    (set, get) => ({
      userList: [],
      addUser: user => {
        const userList = get().userList;
        const userExist = userList.some(item => item.id === user.id);
        if (!userExist) {
          const updatedList = [...userList, user];
          set({userList: updatedList});
        }
      },
      clearUserList: () => {
        set({userList: []});
      },
      removeUser: id => {
        const userList = get().userList;
        const updatedList = userList.filter(user => user.id !== id);
        set({userList: updatedList});
      },
    }),
    {name: '@SearchHistory', storage: storage},
  ),
);

export function useSearchHistory(): SearchHistoryService['userList'] {
  const userList = useSearchHistoryStore(state => state.userList);
  return userList;
}

export function useSearchHistoryService(): Omit<
  SearchHistoryService,
  'userList'
> {
  const addUser = useSearchHistoryStore(state => state.addUser);
  const clearUserList = useSearchHistoryStore(state => state.clearUserList);
  const removeUser = useSearchHistoryStore(state => state.removeUser);

  return {
    addUser,
    clearUserList,
    removeUser,
  };
}
