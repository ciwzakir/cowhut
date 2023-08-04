import { z } from 'zod';
import {
  CowBreeds,
  CowCategories,
  CowSalesLabels,
  cowLocations,
} from './cow.constant';

const toCreateACow = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Zod Error comes from name  , Check Year key spelling',
    }),
    age: z.number({
      required_error: 'Zod Error comes from age  , Check Year key spelling',
    }),
    price: z.number({
      required_error: 'Zod Error comes from Price  , Check Year key spelling',
    }),
    location: z.enum([...cowLocations] as [string, ...string[]], {
      required_error: 'Zod Error comes from Code , Check Code key spelling',
    }),
    breed: z.enum([...CowBreeds] as [string, ...string[]], {
      required_error: 'Zod Error comes from Code , Check Code key spelling',
    }),
    label: z.enum([...CowSalesLabels] as [string, ...string[]], {
      required_error: 'Zod Error comes from Code , Check Code key spelling',
    }),
    category: z.enum([...CowCategories] as [string, ...string[]], {
      required_error: 'Zod Error comes from Code , Check Code key spelling',
    }),
    weight: z.number({
      required_error: 'Zod Error comes from weight, Check Year key spelling',
    }),
    seller: z.string({
      required_error: 'Zod Error comes from seller, Check Year key spelling',
    }),
  }),
});

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([...cowLocations] as [string, ...string[]]).optional(),
    breed: z.enum([...CowBreeds] as [string, ...string[]]).optional(),
    label: z.enum([...CowSalesLabels] as [string, ...string[]]).optional(),
    category: z.enum([...CowCategories] as [string, ...string[]]).optional(),
    weight: z.number().optional(),
    seller: z.string().optional(),
  }),
});

export const validateCowZodSchema = {
  toCreateACow,
  updateCowZodSchema,
};
