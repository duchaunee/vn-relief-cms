export type SortDirection = "asc" | "desc";

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterConfig<T> {
  key: keyof T;
  label: string;
  options: FilterOption[];
}

export interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  renderHeader?: (label: string) => React.ReactNode;
}

export interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: ColumnConfig<T>[];
  filters?: FilterConfig<T>[];
  onDelete?: (items: T[]) => Promise<void>;
  onEdit?: (item: T) => Promise<void>;
  onView?: (item: T) => void;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
}
