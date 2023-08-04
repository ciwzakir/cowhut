import { ZodError, ZodIssue } from 'zod';
import { IgenericErrorResponse } from '../interfaces/return.interfaces.';
import { IgenericErrorMessage } from '../interfaces/error.interfaces';

const zodErrorHandler = (error: ZodError): IgenericErrorResponse => {
  const errors: IgenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: ' Zod Validation Error',
    errorMessages: errors,
  };
};

export default zodErrorHandler;
