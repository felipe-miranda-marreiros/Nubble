import {MetaDataPage, Page} from '@types';

import {MetaDataPageApi, PageAPI} from './apiTypes';

function toMetaDataPage(meta: MetaDataPageApi): MetaDataPage {
  return {
    total: meta.total,
    perPage: meta.per_page,
    currentPage: meta.current_page,
    lastPage: meta.last_page,
    firstPage: meta.first_page,
    hasNextPage: !!meta.next_page_url,
    hasPreviousPage: !!meta.previous_page_url,
  };
}

function toPageModel<ApiType, ModelType>(
  page: PageAPI<ApiType>,
  adapterModel: (api: ApiType) => ModelType,
): Page<ModelType> {
  return {
    data: page.data.map(adapterModel),
    meta: toMetaDataPage(page.meta),
  };
}

export const apiAdapter = {
  toMetaDataPage,
  toPageModel,
};
