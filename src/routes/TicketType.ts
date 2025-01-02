import { createTicketType, deleteTicketType, getAllTicketTypes, getTicketTypeById, searchTicketTypes, updateTicketType } from '../controllers/TicketType';
import { Router } from 'express';

const router = Router();

router.post('/', createTicketType);
router.get('/', getAllTicketTypes);
router.get('/:id', getTicketTypeById);
router.put('/:id', updateTicketType);
router.delete('/:id', deleteTicketType);
router.get('/search', searchTicketTypes);

export default router;
