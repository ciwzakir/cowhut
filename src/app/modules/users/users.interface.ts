import { Model, Types } from 'mongoose';
import { ISeller } from '../seller/seller.interface.';
import { IBuyer } from '../buyer/buyer.interface.';

export type IUser = {
  id: string;
  role: string;
  password: string;
  seller?: Types.ObjectId | ISeller;
  buyer?: Types.ObjectId | IBuyer;
};
export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserFilters = {
  searchTerm?: string;
  id?: string;
  role?: string;
  seller?: string;
  buyer?: string;
};
