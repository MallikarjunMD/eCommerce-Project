import express from 'express';

import {
  createCoupon,
  deleteCoupon,
  getCoupon,
  getCoupons,
  updateCoupon,
} from '../controllers/couponControllers.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';


let couponRouter = express.Router();

couponRouter.post('/', isLoggedIn,isAdmin, createCoupon);
couponRouter.get('/', getCoupons);
couponRouter.get('/:id', getCoupon);
couponRouter.put('/:id', isLoggedIn,isAdmin, updateCoupon);
couponRouter.delete('/:id', isLoggedIn,isAdmin, deleteCoupon);

export default couponRouter;