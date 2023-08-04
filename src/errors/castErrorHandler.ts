import { IgenericErrorResponse } from '../interfaces/return.interfaces.';
import { IgenericErrorMessage } from '../interfaces/error.interfaces';
import mongoose from 'mongoose';

const castErrorHandler = (
  error: mongoose.Error.CastError,
): IgenericErrorResponse => {
  const errors: IgenericErrorMessage[] = [
    {
      path: error?.path,
      message: ' Invalid ID',
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error!',
    errorMessages: errors,
  };
};

export default castErrorHandler;
