import { createUser, deleteUser, getAllUsers, getMe, getUserById, updateUser } from '../controllers/User';
import { Router } from 'express';
import validators from '../validators/User';
import { createValidator } from 'express-joi-validation';

const router = Router();

const validator = createValidator();

router.get('/me', getMe);
router.post('/', validator.body(validators.createUser), createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', validator.body(validators.updateUser), updateUser);
router.delete('/:id', deleteUser);

export default router;
