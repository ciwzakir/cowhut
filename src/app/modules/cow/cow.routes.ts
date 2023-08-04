import express from 'express';
import { validateCowZodSchema } from './cow.validation';
import validateUserRequest from '../../middlewares/userCreate.validation';
import { CowController } from './cow.controller';

const router = express.Router();

router.patch(
  '/:id',
  validateUserRequest(validateCowZodSchema.updateCowZodSchema),
  CowController.updateCow,
);
router.delete('/:id', CowController.deleteCow);
router.get('/:id', CowController.getSingleCow);
router.get('/', CowController.getCows);

router.post(
  '/',
  validateUserRequest(validateCowZodSchema.toCreateACow),
  CowController.createCow,
);
export const CowsRoutes = router;
