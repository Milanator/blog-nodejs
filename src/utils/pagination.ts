import type { Request } from "express";

export const getPagination = (req: Request, itemCount: number) => {
  const { page = 1, perPage=2 } = req.query;

  return {
    skip: (page - 1) * perPage,
    totalPages: Math.ceil(itemCount / perPage),
    currentPage: page,
    perPage,
  };
};
