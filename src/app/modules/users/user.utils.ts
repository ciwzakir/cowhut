import { User } from './users.model';

export const lastSellerId = async () => {
  const getlastSellerId = await User.findOne(
    { role: 'seller' },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean(); // id true and _id false || Lean Pure JS
  return getlastSellerId?.id ? getlastSellerId.id.substring(2) : undefined;
};

export const generateSellertId = async (): Promise<string> => {
  const currentId = (await lastSellerId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `S-${incrementedId}`;
  return incrementedId;
};
export const lastBuyerId = async () => {
  const getlastBuyerId = await User.findOne(
    { role: 'buyer' },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean(); // id true and _id false || Lean Pure JS
  return getlastBuyerId?.id ? getlastBuyerId.id.substring(2) : undefined;
};

export const generateBuyerId = async (): Promise<string> => {
  const currentId = (await lastBuyerId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `B-${incrementedId}`;
  return incrementedId;
};
