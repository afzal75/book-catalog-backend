/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BookSearchAbleFields, IBookFilterRequest, IPriceFilters } from './book.interface';

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
              // createdAt: 'desc',
            },
    });
  
    // include: {
    //   category: true,
    //   reviews: true,
    //   orderBooks: true,
    // },
  
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


// const getAllBooks = async (filters: any, paginationOptions: any) => {
//     const { size, page, skip } =
//       paginationHelpers.calculatePagination(paginationOptions);
//     const { search, minPrice, maxPrice, ...filterData } = filters;
  
//     const andConditions = [];
  
//     if (search) {
//       andConditions.push({
//         OR: bookSearchableFields.map(field => ({
//           [field]: {
//             contains: search,
//             mode: 'insensitive',
//           },
//         })),
//       });
//     }
  
//     if (Object.keys(filterData).length > 0) {
//       if (filterData.category) {
//         andConditions.push({
//           categoryId: filterData.category,
//         });
//       }
//     }
  
//     if (minPrice) {
//       andConditions.push({
//         price: {
//           gte: parseInt(minPrice),
//         },
//       });
//     }
//     if (maxPrice) {
//       andConditions.push({
//         price: {
//           lte: parseInt(maxPrice),
//         },
//       });
//     }
  
//     const whereConditions: Prisma.BookWhereInput =
//       andConditions.length > 0 ? { AND: andConditions } : {};
  
//     const result = await prisma.book.findMany({
//       include: {
//         category: true,
//       },
//       where: whereConditions,
//       skip,
//       take: size,
//       orderBy:
//         paginationOptions.sortBy && paginationOptions.sortOrder
//           ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
//           : {
//               title: 'desc',
//             },
//     });
  
//     const total = await prisma.book.count({
//       where: whereConditions,
//     });
  
//     const totalPage = Math.ceil(total / size);
  
//     return {
//       meta: {
//         total,
//         page,
//         size,
//         totalPage,
//       },
//       data: result,
//     };
//   };

export const BookService = {
  createBook,
  getAllBooks
};
