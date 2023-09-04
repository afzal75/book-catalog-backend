import express from 'express';
import { BookController } from './book.controller';
const router = express.Router();

router.post('/create-book', BookController.createBook)
router.get('/', BookController.getAllBooks)
router.get('/:id', BookController.getSingleBook)
router.get('/:categoryId/category', BookController.bookCategoryId);
router.patch('/:id', BookController.updateBook)

export const BookRoutes = router;