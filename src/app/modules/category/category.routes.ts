import express from 'express';
import { CategoryController } from './category.controller';
const router = express.Router();

router.get('/:id', CategoryController.getSingleCategory)
router.patch('/:id', CategoryController.updateCategory)
router.post('/create-category', CategoryController.createCategory)
router.get('/', CategoryController.getAllCategory)


export const CategoryRoutes = router;