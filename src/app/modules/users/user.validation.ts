import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    seller: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
      }),
      phoneNumber: z.string({
        required_error: 'Phone number is required',
      }),
      address: z.string({
        required_error: 'Address is required',
      }),
      budget: z.number({
        required_error: 'Budget is required',
      }),
      income: z.number({
        required_error: 'Income is required',
      }),
    }),
  }),
});

const createBuyerZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    buyer: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
      }),
      phoneNumber: z.string({
        required_error: 'Phone number is required',
      }),
      address: z.string({
        required_error: 'Address is required',
      }),
      budget: z.number({
        required_error: 'Bgt is required',
      }),
      income: z.number({
        required_error: 'In is required',
      }),
    }),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    role: z.string().optional(),
    password: z.string().optional(),
    // seller?: z.string().optional(),
    // buyer?: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  createBuyerZodSchema,
  updateUserZodSchema,
};
