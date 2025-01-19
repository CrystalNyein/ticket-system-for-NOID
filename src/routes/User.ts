import { createUser, deleteUser, getAllUsers, getMe, getUserById, updateUser } from '../controllers/User';
import { Router } from 'express';
import validators from '../validators/User';
import { createValidator } from 'express-joi-validation';
import { authorize } from '../middleware/authorization';

const router = Router();

const validator = createValidator();

router.get('/me', getMe);
router.post('/', authorize(['admin']), validator.body(validators.createUser), createUser);
router.get('/', authorize(['admin']), getAllUsers);
router.get('/:id', authorize(['admin']), getUserById);
router.put('/:id', authorize(['admin']), validator.body(validators.updateUser), updateUser);
router.delete('/:id', authorize(['admin']), deleteUser);

export default router;
