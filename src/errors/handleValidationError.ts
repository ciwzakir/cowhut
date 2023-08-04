import mongoose from 'mongoose';
import { IgenericErrorResponse } from '../interfaces/return.interfaces.';
import { IgenericErrorMessage } from '../interfaces/error.interfaces';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IgenericErrorResponse => {
  const errors: IgenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    },
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
