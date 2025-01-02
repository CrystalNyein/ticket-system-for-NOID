import { createTicket, deleteTicket, generateBulkTickets, getAllTickets, getTicketById, updateTicket } from '../controllers/Ticket';
import { Router } from 'express';

const router = Router();

router.post('/', createTicket);
router.get('/', getAllTickets);
router.get('/:id', getTicketById);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);
router.post('/generate-bulk-tickets', generateBulkTickets);

export default router;
