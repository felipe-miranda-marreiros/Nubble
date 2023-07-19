export interface MetaDataPage {
  currentPage: number;
  firstPage: number;
  lastPage: number;
  perPpage: number;
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Page<Data> {
  meta: MetaDataPage;
  data: Data[];
}
