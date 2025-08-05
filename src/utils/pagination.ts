export const getPagination = (
  page: number = 1,
  perPage: number = 2,
  itemCount: number
) => {
  return {
    skip: (page - 1) * perPage,
    totalPages: Math.ceil(itemCount / perPage),
  };
};
