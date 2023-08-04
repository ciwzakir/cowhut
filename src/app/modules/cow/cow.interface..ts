import { Model, Types } from 'mongoose';
import { ISeller } from '../seller/seller.interface.';
export type ILocationOfCow =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';
export type ICattleBreeds =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej';
export type ISalesLabel = 'for sale' | 'sold out';
export type ICowCategory = 'Dairy' | 'Beef' | 'DualPurpose';

export type ICow = {
  // id?: string;
  name: string;
  age: number;
  price: number;
  location: ILocationOfCow;
  breed: ICattleBreeds;
  weight: number;
  label: ISalesLabel;
  category: ICowCategory;
  seller: Types.ObjectId | ISeller;
};

export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilters = {
  searchTerm?: string;
  id?: string;
  age?: string;
  price?: string;
  location?: string;
};
