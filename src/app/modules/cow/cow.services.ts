import { SortOrder } from 'mongoose';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interfaces/paginationOptions';
import { pageHelper } from '../../../shared/paginationOption';
import { cowSearchableFields } from './cow.constant';
import { ICow, ICowFilters } from './cow.interface.';
import { Cow } from './cow.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
// import ApiError from '../../../errors/ApiError';
// import httpStatus from 'http-status';

const creates = async (payload: ICow): Promise<ICow> => {
  const result = (await Cow.create(payload)).populate({
    path: 'seller',
  });
  return result;
};

const getCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    pageHelper.pagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .populate({ path: 'seller' })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingle = async (_id: string): Promise<ICow | null> => {
  const result = await Cow.findOne({ _id });
  return result;
};

const updateCow = async (
  _id: string,
  payload: Partial<ICow>,
): Promise<ICow | null> => {
  const isExist = await Cow.findById({ _id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow Info not found !');
  }

  const { ...CowData } = payload;

  const updatedCowData: Partial<ICow> = { ...CowData };

  const result = await Cow.findOneAndUpdate({ _id }, updatedCowData, {
    new: true,
  });
  return result;
};

const deleteCow = async (_id: string): Promise<ICow | null> => {
  const isExist = await Cow.findById({ _id });
  if (!isExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      ' The Cow You wanted to delete not found !',
    );
  }
  const result = await Cow.findByIdAndDelete(_id, { new: true });
  return result;
};
export const cowService = {
  creates,
  getCows,
  getSingle,
  updateCow,
  deleteCow,
};
