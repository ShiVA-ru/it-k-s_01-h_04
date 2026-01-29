export type DbOptions = {
  skip: number;
  limit: number;
  sort: Record<string, 1 | -1>;
  filter?: any;
};

export const buildDbQueryOptions = (queryDto: {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: "asc" | "desc";
  searchNameTerm?: string;
}): DbOptions => {
  const skip = (queryDto.pageNumber - 1) * queryDto.pageSize;
  const limit = queryDto.pageSize;
  const sort: Record<string, 1 | -1> = {
    [queryDto.sortBy]: queryDto.sortDirection === "asc" ? 1 : -1,
  };
  const filter = queryDto.searchNameTerm
    ? { name: { $regex: queryDto.searchNameTerm, $options: "i" } }
    : {};
  return { skip, limit, sort, filter };
};
