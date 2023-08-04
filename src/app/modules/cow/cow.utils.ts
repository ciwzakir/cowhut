// import { Order } from '../orders/orders.model';
// import { Cow } from './cow.model';

// export const lastCowId = async () => {
//   const getlastCowId = await Order.findOne({ id: 1, _id: 0 })
//     .sort({ createdAt: -1 })
//     .lean(); // id true and _id false || Lean Pure JS
//   return getlastCowId?.id ? getlastCowId.id.substring(2) : undefined;
// };

// export const generateCowId = async (): Promise<string> => {
//   const currentId = (await lastCowId()) || (0).toString().padStart(4, '0');
//   let incrementedId = (parseInt(currentId) + 1).toString().padStart(4, '0');
//   incrementedId = `C-${incrementedId}`;
//   return incrementedId;
// };
