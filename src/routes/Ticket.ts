import { createTicket, deleteTicket, generateBulkTickets, getAllTickets, getTicketById, updateTicket } from '../controllers/Ticket';
import { Router } from 'express';
import { authorize } from '../middleware/authorization';
import { createValidator } from 'express-joi-validation';
import validators from '../validators/Ticket';

const router = Router();

const validator = createValidator();

router.post('/create', authorize(['admin', 'event_manager']), validator.body(validators.createTicket), createTicket);
router.post('/bulk', authorize(['admin', 'event_manager']), validator.body(validators.generateBulkTickets), generateBulkTickets);
router.get('/', getAllTickets);
router.get('/:id', getTicketById);
router.put('/:id', validator.body(validators.updateTicket), updateTicket);
router.delete('/:id', deleteTicket);

export default router;
