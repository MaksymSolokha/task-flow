// middleware/error-handler.ts
import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../lib/error';

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  // 0. якщо відповідь уже почалась — делегуємо дефолтному обробнику
  if (res.headersSent) {
    return next(err);
  }

  // 1. помилка валідації zod → 400 + деталі полів
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.issues.map((i) => ({
        field: i.path.join('.'), // напр. "email"
        message: i.message, // напр. "Must be at least 8 characters"
      })),
    });
  }

  // 2. наша усвідомлена помилка → її власний статус
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // 3. усе інше = справжній збій сервера → 500
  //    логуємо ПОВНУ помилку для себе, але клієнту НЕ показуємо деталі
  console.error(err);
  return res.status(500).json({ error: 'Internal server error' });
};
