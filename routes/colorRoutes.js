import express from 'express';

import {
  createColor,
  deleteColor,
  getColor,
  getColors,
  updateColor,
} from '../controllers/colorControllers.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';


let colorRouter = express.Router();

colorRouter.post('/', isLoggedIn,isAdmin, createColor);
colorRouter.get('/', getColors);
colorRouter.get('/:id', getColor);
colorRouter.put('/:id', isLoggedIn,isAdmin, updateColor);
colorRouter.delete('/:id', isLoggedIn,isAdmin, deleteColor);

export default colorRouter;