import express from "express";
import { deleteReview, getReviewsOfProduct, postReview } from "../controllers/reviewControllers.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

let reviewRouter = express.Router();

reviewRouter.post("/:productId", isLoggedIn, postReview);

reviewRouter.get("/:productId",isLoggedIn,getReviewsOfProduct);

reviewRouter.delete("/delete/:reviewId",isLoggedIn,isAdmin, deleteReview);

export default reviewRouter;
