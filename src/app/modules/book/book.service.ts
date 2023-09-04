/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
    BookSearchAbleFields,
    IBookFilterRequest,
    IPriceFilters,
} from './book.interface';

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: { category: true },
  });
  return result;
};

const getAllBooks = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions,
  priceQuery: IPriceFilters
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filtersData } = filters;

  const andConditions = [];

  // price query

  if (priceQuery.minPrice !== undefined && priceQuery.maxPrice !== undefined) {
    const minPrice = Number(priceQuery.minPrice);
    const maxPrice = Number(priceQuery.maxPrice);

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      andConditions.push({
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      });
    }
  } else if (priceQuery.minPrice !== undefined) {
    const minPrice = Number(priceQuery.minPrice);

    if (!isNaN(minPrice)) {
      andConditions.push({
        price: {
          gte: minPrice,
        },
      });
    }
  } else if (priceQuery.maxPrice !== undefined) {
    const maxPrice = Number(priceQuery.maxPrice);

    if (!isNaN(maxPrice)) {
      andConditions.push({
        price: {
          lte: maxPrice,
        },
      });
    }
  }

  // price query

  if (search) {
    andConditions.push({
      OR: BookSearchAbleFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const books = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            //   createdAt: 'desc',
          },
  });

  const total = await prisma.book.count();
  const totalPage = Math.ceil(total / size);
  return {
    meta: {
      total,
      page,
      size,
      totalPage,
      // limit: 0
    },
    data: books,
  };
};

const bookCategoryId = async (
  paginationOptions: IPaginationOptions,
  categoryId: string
) => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await prisma.book.findMany({
    where: { categoryId },
    skip,
    take: size,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : {
            title: 'desc',
          },
  });
  const total = await prisma.book.count({
    where: { categoryId },
  });

  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
};

const getSingleBook = async (id: string) => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

const deleteBook = async (id: string) => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  bookCategoryId,
  getSingleBook,
  updateBook,
  deleteBook,
};
