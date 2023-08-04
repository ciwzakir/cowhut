import { Model } from 'mongoose';

export type Name = {
  firstName: string;
  lastName: string;
};

export type IBuyer = {
  id: string;
  name: Name;
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};

export type BuyerModel = Model<IBuyer, Record<string, unknown>>;
