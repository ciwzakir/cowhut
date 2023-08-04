import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/tryCatchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './users.interface';
import { UserService } from './users.services';
import pick from '../../../shared/pick';
import { userFilterableFields } from './user.constant';
import { userPageOptionValues } from '../../../constant/pagination';

const createSeller: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { seller, ...userData } = req.body;
    const result = await UserService.createSeller(seller, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  },
);

const createBuyer: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { buyer, ...userData } = req.body;
    const result = await UserService.createBuyer(buyer, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Buyer created successfully!',
      data: result,
    });
  },
);

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, userPageOptionValues);

  const result = await UserService.getUsers(filters, paginationOptions);

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Users retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.getSingleUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Cow Information retrieved successfully !',
    data: result,
  });
});

const updateuser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await UserService.updateUser(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Data updated successfully !',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.deleteUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow deleted successfully !',
    data: result,
  });
});

export const UserController = {
  createSeller,
  createBuyer,
  getAllUser,
  getSingleUser,
  updateuser,
  deleteUser,
};
