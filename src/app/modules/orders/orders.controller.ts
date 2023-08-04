import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/tryCatchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IOrder } from './orders.interface';
import { OrderService } from './orders.services';

const createOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const orderData = req.body;

    const result = await OrderService.createOrder(id, orderData);

    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  },
);

export const OrderController = {
  createOrder,
};
