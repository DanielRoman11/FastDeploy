import { SelectQueryBuilder } from 'typeorm';

export interface Paginator<T> {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: T[];
}

export async function paginate<T>(
  selectQuery: SelectQueryBuilder<T>,
  page: number = 1,
  limit: number = 10,
): Promise<Paginator<T>> {
  const offset = limit * (page - 1);
  const values = await selectQuery
    .offset(offset)
    .limit(limit)
    .getManyAndCount();

  return {
    page,
    limit,
    total: values[1],
    totalPages: Math.ceil(values[1] / limit),
    data: values[0],
  };
}
