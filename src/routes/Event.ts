import { createValidator } from 'express-joi-validation';
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from '../controllers/Event';
import { Router } from 'express';
import validators from '../validators/Event';

const router = Router();

const validator = createValidator();

router.post('/', validator.body(validators.createEvent), createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', validator.body(validators.updateEvent), updateEvent);
router.delete('/:id', deleteEvent);

export default router;
