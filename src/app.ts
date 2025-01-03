import express, { NextFunction, Request, Response } from 'express';
import authRoutes from './routes/Auth';
import eventRoutes from './routes/Event';
import ticketRoutes from './routes/Ticket';
import userRoutes from './routes/User';
import authenticate from './middleware/authentication';
import env from './config/env';
import { authorize } from './middleware/authorization';

const app = express();
const PORT = env.appPort;
app.use(express.json()); // To parse JSON bodies

// Unauthenticated routes (if needed, e.g., login/register)
app.use('/auth', authRoutes);

app.use(authenticate);
app.use('/events', authorize(['admin', 'event_manager']), eventRoutes);
app.use('/ticket', ticketRoutes);
app.use('/users', authorize(['admin']), userRoutes);
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    statusCode,
  });
});
