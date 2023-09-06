import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BookFilterAbleFields, PriceSearchableFields } from './book.interface';
import { BookService } from './book.service';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.createBook(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterAbleFields);
  const priceQuery = pick(req.query, PriceSearchableFields);
  const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);

  const books = await BookService.getAllBooks(filters, options, priceQuery);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    meta: books.meta,
    data: books.data,
  });
});

const bookCategoryId = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const paginationOptions = pick(req.query, [
    'size',
    'page',
    'sortBy',
    'sortOrder',
  ]);
  const result = await BookService.bookCategoryId(
    paginationOptions,
    categoryId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books with associated category data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getSingleBook(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Book fetched successfully',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookService.updateBook(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book updated successfully',
      data: result,
    });
  });
  
  const deleteBook = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookService.deleteBook(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book deleted successfully',
      data: result,
    });
  });

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  bookCategoryId,
  updateBook,
  deleteBook
};
