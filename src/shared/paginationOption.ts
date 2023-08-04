import { SortOrder } from 'mongoose';

type IPageOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};
type IPageOptReturnType = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const pagination = (pageOpt: IPageOptions): IPageOptReturnType => {
  const page = Number(pageOpt.page || 1);
  const limit = Number(pageOpt.limit || 10);
  const skip = (page - 1) * limit;
  const sortBy = pageOpt.sortBy || 'year';
  const sortOrder = pageOpt.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
export const pageHelper = {
  pagination,
};
