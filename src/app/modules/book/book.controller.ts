import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookService } from './book.service';
import { BookFilterAbleFields, PriceSearchableFields } from './book.interface';
import pick from '../../../shared/pick';

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
    // filters
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

// const getAllBooks = catchAsync(async (req: Request, res: Response) => {
//     const filters = pick(req.query, bookFilterableFields);
//     const paginationOptions = pick(req.query, [
//       'size',
//       'page',
//       'sortBy',
//       'sortOrder',
//     ]);
  
//     const result = await BookService.getAllBooks(filters, paginationOptions);
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'All book fetched successfully',
//       meta: result.meta,
//       data: result.data,
//     });
//   });

export const BookController = {
  createBook,
  getAllBooks,
};
