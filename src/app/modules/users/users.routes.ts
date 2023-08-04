import express from 'express';
import { UserController } from './users.controller';
import { UserValidation } from './user.validation';
import validateUserRequest from '../../middlewares/userCreate.validation';

const router = express.Router();

router.patch(
  '/:id',
  validateUserRequest(UserValidation.updateUserZodSchema),
  UserController.updateuser,
);
router.delete('/:id', UserController.deleteUser);
router.get('/:id', UserController.getSingleUser);
router.get('/', UserController.getAllUser);

router.post(
  '/create-seller',
  validateUserRequest(UserValidation.createUserZodSchema),
  UserController.createSeller,
);
router.post(
  '/create-buyer',
  validateUserRequest(UserValidation.createBuyerZodSchema),
  UserController.createBuyer,
);

export const routes = router;
