export interface Transaction {
  id: string;
  time: string;
  sender: string;
  content: string;
  amount: number;
}

export interface TransactionFilters {
  type: string;
  amount: string;
  fromDate: Date | undefined;
  toDate: Date | undefined;
  search: string;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}
