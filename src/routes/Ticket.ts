import {
  createTicket,
  deleteTicket,
  deleteTicketsByEventAndType,
  generateBulkTickets,
  getAllTickets,
  getTicketById,
  getTicketByQR,
  getTicketStatsByDate,
  getTicketStatsByEvent,
  getTicketSummary,
  updateDoorSaleTickets,
  updateTicket,
  uploadAndProcessExcel,
} from '../controllers/Ticket';
import { Router } from 'express';
import { authorize } from '../middleware/authorization';
import { createValidator } from 'express-joi-validation';
import validators from '../validators/Ticket';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { scanTicket } from '../controllers/TicketScan';

const router = Router();

// Ensure uploads directory exists
const uploadDirectory = 'uploads/';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Directory to save files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /xlsx|xls/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      cb(null, true);
    } else {
      cb(new Error('Only Excel files are allowed!'));
    }
  },
});

const validator = createValidator();

router.post('/import-ticket-sales', authorize(['admin', 'event_manager']), upload.single('file'), validator.body(validators.importTicketSales), uploadAndProcessExcel);
router.post('/door-sales', validator.body(validators.doorSales), updateDoorSaleTickets);
router.post('/scan', validator.body(validators.scanTicket), scanTicket);
router.post('/scan-details', validator.body(validators.scanTicket), getTicketByQR);
router.post('/', authorize(['admin', 'event_manager']), validator.body(validators.createTicket), createTicket);
router.post('/bulk', authorize(['admin', 'event_manager']), validator.body(validators.generateBulkTickets), generateBulkTickets);
router.post('/stats-by-date', authorize(['admin', 'event_manager']), validator.body(validators.ticketStatsByDate), getTicketStatsByDate);
router.post('/stats-by-event', authorize(['admin', 'event_manager']), validator.body(validators.ticketStatsByEvent), getTicketStatsByEvent);
router.get('/summary', authorize(['admin', 'event_manager']), getTicketSummary);
router.get('/', getAllTickets);
router.get('/:id', getTicketById);
router.put('/:id', validator.body(validators.updateTicket), updateTicket);
router.delete('/delete-by-params', authorize(['admin', 'event_manager']), validator.query(validators.deleteTicketsByParam), deleteTicketsByEventAndType);
router.delete('/:id', deleteTicket);

export default router;
