import mongoose from 'mongoose';
import { IOrder } from './orders.interface';
import { Order } from './orders.model';
import { generateOrderId } from './orders.utils';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createOrder = async (
  _id: string,
  order: IOrder,
): Promise<IOrder | any> => {
  let newOrderData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateOrderId();
    order.orderNo = id;

    const newOrder = await Order.create([order], { session });

    if (!newOrder.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create order');
    }

    newOrderData = newOrder[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newOrderData) {
    newOrderData = await Order.findById(_id).populate({
      path: 'order',
      populate: [
        {
          path: 'buyer',
        },
        {
          path: 'cow',
          populate: {
            path: 'seller',
          },
        },
      ],
    });
  }

  return newOrderData;
};

export const OrderService = {
  createOrder,
};
