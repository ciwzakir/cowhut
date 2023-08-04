import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandlerMiddleware from './app/middlewares/globalErrorHandler';
import combineRoutes from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/', combineRoutes);

app.use(globalErrorHandlerMiddleware);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
