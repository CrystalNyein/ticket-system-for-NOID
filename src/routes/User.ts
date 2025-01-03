import { createUser, deleteUser, getAllUsers, getMe, getUserById, updateUser } from '../controllers/User';
import { Router } from 'express';
import validators from '../validators/User';
import { createValidator } from 'express-joi-validation';

const router = Router();

const validator = createValidator();

router.post('/', validator.body(validators.createOrUpdateUser), createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', validator.body(validators.createOrUpdateUser), updateUser);
router.delete('/:id', deleteUser);
router.get('/me', getMe);

export default router;
