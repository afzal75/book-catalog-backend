import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { BookRoutes } from '../modules/book/book.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { OrderRoutes } from '../modules/order/order.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes
  },
  {
    path: '/categories',
    route: CategoryRoutes
  },
  {
    path: '/book',
    route: BookRoutes
  },
  {
    path: '/orders',
    route: OrderRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;

