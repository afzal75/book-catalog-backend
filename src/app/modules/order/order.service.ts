/* eslint-disable @typescript-eslint/no-explicit-any */
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

const getAllOrder = async (user: any) => {
  const { userId, role } = user;

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (role === 'admin') {
    const result = await prisma.order.findMany({});
    return result;
  }

  if (role === 'customer') {
    const result = await prisma.order.findMany({ where: { userId: userId } });

    return result;
  }
};

export const OrderService = {
  createOrder,
  getAllOrder,
};
