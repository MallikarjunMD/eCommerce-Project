import express from 'express';

import {
  createColor,
  deleteColor,
  getColor,
  getColors,
  updateColor,
} from '../controllers/colorControllers.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';


let colorRouter = express.Router();

colorRouter.post('/', isLoggedIn, createColor);
colorRouter.get('/', getColors);
colorRouter.get('/:id', getColor);
colorRouter.put('/:id', isLoggedIn, updateColor);
colorRouter.delete('/:id', isLoggedIn, deleteColor);

export default colorRouter;