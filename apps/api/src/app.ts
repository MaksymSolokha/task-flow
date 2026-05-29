import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { errorHandler } from './middleware/error-handler';
import router from './routes';

export const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

app.use(errorHandler);
