import { Model, Types } from 'mongoose';
import { IBuyer } from '../buyer/buyer.interface.';
import { ICow } from '../cow/cow.interface.';

export type IOrder = {
  orderNo?: string;
  cow?: Types.ObjectId | ICow;
  buyer?: Types.ObjectId | IBuyer;
};
export type OrderModel = Model<IOrder, Record<string, unknown>>;
