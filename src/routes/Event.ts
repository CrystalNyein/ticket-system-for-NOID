import { createEvent, deleteEvent, getAllEvents, getEventById, searchEvents, updateEvent } from '../controllers/Event';
import { Router } from 'express';

const router = Router();

router.post('/', createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.get('/search', searchEvents);

export default router;
