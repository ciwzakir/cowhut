import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { IgenericErrorMessage } from '../../interfaces/error.interfaces';
import handleValidationError from '../../errors/handleValidationError';
import { erroLogger } from '../../shared/logger';
import ApiError from '../../errors/ApiError';
import zodErrorHandler from '../../errors/zodErrorHandler';
import { ZodError } from 'zod';
import castErrorHandler from '../../errors/castErrorHandler';

const globalErrorHandlerMiddleware: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  config.env === 'development'
    ? console.log(`🤣 Global Error`, error)
    : erroLogger.error(`🤣 Global Error`, error);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: IgenericErrorMessage[] = [];

  if (error?.name === 'ValidatorError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  } else if (error instanceof ZodError) {
    const simplifiedError = zodErrorHandler(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = castErrorHandler(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });

  next();
};
export default globalErrorHandlerMiddleware;
