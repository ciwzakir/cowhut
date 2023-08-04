import { Model } from 'mongoose';

export type Name = {
  firstName: string;
  lastName: string;
};

export type ISeller = {
  id: string;
  name: Name;
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};

export type SellerModel = Model<ISeller, Record<string, unknown>>;
