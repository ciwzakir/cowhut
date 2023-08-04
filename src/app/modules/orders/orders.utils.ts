import { Order } from './orders.model';

export const lastOrderId = async () => {
  const getlastOrderId = await Order.findOne().sort({ createdAt: -1 }).lean();
  return getlastOrderId?.orderNo
    ? getlastOrderId?.orderNo.substring(8)
    : undefined;
};

export const generateOrderId = async (): Promise<string> => {
  const currentId = (await lastOrderId()) || (0).toString().padStart(7, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(7, '0');
  incrementedId = `OrderNo-${incrementedId}`;
  return incrementedId;
};
