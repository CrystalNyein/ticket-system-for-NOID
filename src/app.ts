import express from 'express';
import eventRoutes from './routes/Event';
import ticketRoutes from './routes/Ticket';

const app = express();
const PORT = 3000;
app.use(express.json()); // To parse JSON bodies
app.use('/events', eventRoutes);
app.use('/ticket', ticketRoutes);
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
