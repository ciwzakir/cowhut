import { IgenericErrorMessage } from './error.interfaces';

export type IgenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IgenericErrorMessage[];
};
