import express from 'express';
import { routes } from '../modules/users/users.routes';
import { CowsRoutes } from '../modules/cow/cow.routes';
import { OrderRoutes } from '../modules/orders/orders.routes';

const combineRoutes = express.Router();
const moduleRouts = [
  // {
  //   path: '/seller/',
  //   route: s,
  // },
  // {
  //   path: '/buyer/',
  //   route: ,
  // },
  {
    path: '/cows/',
    route: CowsRoutes,
  },
  {
    path: '/users/',
    route: routes,
  },
  {
    path: '/orders/',
    route: OrderRoutes,
  },
];
moduleRouts.forEach(route => combineRoutes.use(route.path, route.route));
export default combineRoutes;
