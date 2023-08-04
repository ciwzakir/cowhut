import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/tryCatchAsync';
import { ICow } from './cow.interface.';
import sendResponse from '../../../shared/sendResponse';
import { cowService } from './cow.services';
import pick from '../../../shared/pick';
import { cowsFilterableFields } from './cow.constant';
import { cowPageOptionValues } from '../../../constant/pagination';

const createCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...cowsData } = req.body;
    const result = await cowService.creates(cowsData);

    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Posted a cow successfully!',
      data: result,
    });
  },
);

const getCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowsFilterableFields);
  const paginationOptions = pick(req.query, cowPageOptionValues);

  const result = await cowService.getCows(filters, paginationOptions);

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await cowService.getSingle(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Cow Information retrieved successfully !',
    data: result,
  });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await cowService.updateCow(id, updatedData);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow Data updated successfully !',
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await cowService.deleteCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow deleted successfully !',
    data: result,
  });
});

export const CowController = {
  createCow,
  getCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
