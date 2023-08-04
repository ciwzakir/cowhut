import express from 'express';
import validateUserRequest from '../../middlewares/userCreate.validation';
import { OrderController } from './orders.controller';
import { OrderValidation } from './orders.validation';

const router = express.Router();

router.post(
  '/',
  validateUserRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder,
);

export const OrderRoutes = router;
