import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.createOrder(req.user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Created successfully',
    data: result,
  });
});


const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrder(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Order fetched successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrder
};
