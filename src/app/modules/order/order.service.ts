import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createOrder = async (user: any, payload: any): Promise<Order> => {
  const { userId, role } = user;

  const isExist = await prisma.user.findUnique({ where: { id: userId } });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (role !== 'customer') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Only customers can order');
  }

  const { orderedBooks } = payload;

  const result = await prisma.order.create({
    data: {
      userId: userId,
      orderedBooks,
    },
  });
  return result;
};




export const OrderService = {
  createOrder,
};
