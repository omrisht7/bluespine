import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
}

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  const status = err?.status || 500;
  const message = err?.message || 'Internal Server Error';

  console.error(`[${new Date().toISOString()}] Error handling request ${req.method} ${req.originalUrl}:`, err);

  res.status(status).json({ error: message });
}
