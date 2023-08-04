import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { ISeller } from '../seller/seller.interface.';
import { IUser, IUserFilters } from './users.interface';
import { User } from './users.model';
import { Seller } from '../seller/seller.model';
import { generateBuyerId, generateSellertId } from './user.utils';
import { IBuyer } from '../buyer/buyer.interface.';
import { Buyer } from '../buyer/buyer.model';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interfaces/paginationOptions';
import { pageHelper } from '../../../shared/paginationOption';
import { userSearchableFields } from './user.constant';

const createSeller = async (
  seller: ISeller,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  // set role
  user.role = 'seller';

  let newSellerAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateSellertId();

    user.id = id;
    seller.id = id;

    const newSeller = await Seller.create([seller], { session });

    if (!newSeller.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create seller');
    }

    user.seller = newSeller[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create a user');
    }
    newSellerAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newSellerAllData) {
    newSellerAllData = await User.findOne({ id: newSellerAllData.id }).populate(
      {
        path: 'seller',
      },
    );
  }

  return newSellerAllData;
};

const createBuyer = async (
  buyer: IBuyer,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_buyer_pass as string;
  }
  // set role
  user.role = 'buyer';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateBuyerId();

    user.id = id;
    buyer.id = id;

    //array
    const newBuyer = await Buyer.create([buyer], { session });

    if (!newBuyer.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Buyer');
    }

    //set student -->  _id into user.student
    user.buyer = newBuyer[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Buyer user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'buyer',
      // populate: [
      //   {
      //     path: 'buyer',
      //   },
      // ],
    });
  }

  return newUserAllData;
};

const getUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    pageHelper.pagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
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

  const result = await User.find(whereConditions)
    .populate({ path: 'seller' })
    .populate({ path: 'buyer' })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleUser = async (_id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id });
  return result;
};

const updateUser = async (
  _id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const isExist = await User.findById({ _id });

  if (!isExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'The User you want to update not found !',
    );
  }

  const { ...UserData } = payload;

  const updatedUserData: Partial<IUser> = { ...UserData };

  const result = await User.findOneAndUpdate({ _id }, updatedUserData, {
    new: true,
  });
  return result;
};

const deleteUser = async (_id: string): Promise<IUser | null> => {
  const isExist = await User.findById({ _id });
  if (!isExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      ' The User You wanted to delete not found !',
    );
  }
  const result = await User.findByIdAndDelete(_id, { new: true });
  return result;
};

export const UserService = {
  createSeller,
  createBuyer,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
