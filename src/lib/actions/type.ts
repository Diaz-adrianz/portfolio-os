export interface ActionResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface ActionPagination {
  page: number;
  limit: number;
  totalItems?: number;
  totalPages?: number;
}

export interface ActionPaginationResponse<
  T = unknown,
> extends ActionPagination {
  items: T[];
}
