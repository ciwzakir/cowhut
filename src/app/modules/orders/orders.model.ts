import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './orders.interface';

const orderSchema = new Schema<IOrder>(
  {
    orderNo: { type: String },

    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'Buyer',
    },
    cow: {
      type: Schema.Types.ObjectId,
      ref: 'Cow',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Order = model<IOrder, OrderModel>('Order', orderSchema);
