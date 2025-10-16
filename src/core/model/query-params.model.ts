export interface QueryParams {
  limit?: number;
  offset?: number;
  search?: string;
  ordering?: string;
  created_at__gte?: string;
  created_at__lte?: string;
}
