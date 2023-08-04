import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.interface.';
import {
  CowBreeds,
  CowCategories,
  CowSalesLabels,
  cowLocations,
} from './cow.constant';

export const CowSchema = new Schema<ICow, CowModel>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      enum: cowLocations,
    },
    breed: {
      type: String,
      required: true,
      enum: CowBreeds,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      enum: CowSalesLabels,
      required: true,
    },
    category: {
      type: String,
      enum: CowCategories,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Cow = model<ICow, CowModel>('Cow', CowSchema);
