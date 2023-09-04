import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();


router.get('/', UserController.getAllUser);
router.get('/:id', UserController.getSignleUser);
router.patch('/:id', UserController.updateUser)

export const UserRoutes = router;