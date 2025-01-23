import { createValidator } from 'express-joi-validation';
import { createEvent, deleteEvent, getAllEvents, getEventById, getRecentEventStats, updateEvent } from '../controllers/Event';
import { Router } from 'express';
import validators from '../validators/Event';
import { authorize } from '../middleware/authorization';

const router = Router();

const validator = createValidator();

router.post('/', authorize(['admin', 'event_manager']), validator.body(validators.createEvent), createEvent);
router.get('/', getAllEvents);
router.get('/recent-stats', authorize(['admin', 'event_manager']), getRecentEventStats);
router.get('/:id', authorize(['admin', 'event_manager']), getEventById);
router.put('/:id', authorize(['admin', 'event_manager']), validator.body(validators.updateEvent), updateEvent);
router.delete('/:id', authorize(['admin', 'event_manager']), deleteEvent);

export default router;
