import { createValidator } from 'express-joi-validation';
import { checkTicketTemplate, createTicketTemplate, deleteTicketTemplate, getAllTicketTemplates, getTicketTemplateById } from '../controllers/TicketTemplate';
import { Router } from 'express';
import validators from '../validators/TicketTemplate';
import multer from 'multer';
import fs from 'fs';

const router = Router();

// Ensure uploads directory exists
const uploadDirectory = 'uploads/';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit size to 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type') as any, false);
    }
    cb(null, true); // Accept file
  },
});

const validator = createValidator();

router.post('/upload-template', upload.single('file'), validator.body(validators.uploadTicketTemplate), createTicketTemplate);
router.get('/', getAllTicketTemplates);
router.post('/check-template', validator.body(validators.checkTicketTemplate), checkTicketTemplate);
router.get('/:id', getTicketTemplateById);
router.delete('/:id', deleteTicketTemplate);

export default router;
