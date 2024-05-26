type Paging<T> = {
  pageCount: number;
  totalCount: number;
  results: T[];
};

export default Paging;
