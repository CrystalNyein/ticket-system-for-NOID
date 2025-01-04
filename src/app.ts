import express, { NextFunction, Request, Response } from 'express';
import authRoutes from './routes/Auth';
import eventRoutes from './routes/Event';
import ticketRoutes from './routes/Ticket';
import ticketTypeRoutes from './routes/TicketType';
import userRoutes from './routes/User';
import authenticate from './middleware/authentication';
import env from './config/env';
import { authorize } from './middleware/authorization';
import morgan from 'morgan';

const app = express();
const PORT = env.appPort;
app.use(express.json()); // To parse JSON bodies
app.use(morgan('dev'));
// Unauthenticated routes (if needed, e.g., login/register)
app.use('/api/auth', authRoutes);

app.use(authenticate);
app.use('/api/events', authorize(['admin', 'event_manager']), eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/ticketTypes', ticketTypeRoutes);
app.use('/api/users', authorize(['admin']), userRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    statusCode,
  });
});
