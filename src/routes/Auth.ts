import { Router } from 'express';
import { login } from '../controllers/Auth';
import validators from '../validators/Auth';
import { createValidator } from 'express-joi-validation';

const router = Router();
const validator = createValidator();
router.post('/login', validator.body(validators.login), login);

export default router;
