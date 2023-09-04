import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BookService } from "./book.service";
import httpStatus from "http-status";

const createBook = catchAsync(async (req: Request, res: Response) => {
    const result = await BookService.createBook(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  });

  export const BookController = {
    createBook
  }