import { createValidator } from 'express-joi-validation';
import { createTicketType, deleteTicketType, getAllTicketTypes, getTicketTypeById, updateTicketType } from '../controllers/TicketType';
import { Router } from 'express';
import validators from '../validators/TicketType';

const router = Router();

const validator = createValidator();

router.post('/', validator.body(validators.createTicketType), createTicketType);
router.get('/', getAllTicketTypes);
router.get('/:id', getTicketTypeById);
router.put('/:id', validator.body(validators.updateTicketType), updateTicketType);
router.delete('/:id', deleteTicketType);

export default router;
