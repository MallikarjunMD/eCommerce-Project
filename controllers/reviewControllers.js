import expressAsyncHandler from "express-async-handler";
import Product from "../models/Product.js"
import Review from "../models/Review.js";

// @desc   post Review for a product
// @route  get /api/v1/reviews
// @access public

export const postReview=expressAsyncHandler(async (req,res)=>{
    let productId=req.params.productId;

    const productFound=await Product.findById(productId).populate("reviews")
    if(!productFound){
        throw new Error("Product not found")
    }
    const {message,rating}=req.body

    //check whether user has reviewed the product already
    const userFound=productFound.reviews.find(review=>{
        return review?.user.toString()===req.userId.toString() //toString to convert .user in object format to string
    })
    if(userFound){
        throw new Error("You have reviewed this product already")
    }
    const review=await Review.create({
        user:req.userId,
        product:productFound?._id,
        message,
        rating
    })

    productFound.reviews.push(review?._id)
    //resave
    await productFound.save()
    res.status(201).json({
        status:"Success",
        message:"Successfully added reviews",
        review
    })
})

// @desc   get Reviews for a product
// @route  get /api/v1/reviews/:id
// @access Private/Admin

export const getReviewsOfProduct = expressAsyncHandler(async (req, res) => {
    let productId=req.params.productId;
    // find product
    const productFound=await Product.findOne({_id:productId}).populate("reviews")
    const reviews=productFound.reviews
    res.json({
      status: "Success",
      message: "Reviews fetched successfully",
      reviews
    });
  });


// @desc   Delete Review
// @route  DELETE /api/v1/delete/reviews/:id
// @access Private/Admin

export const deleteReview = expressAsyncHandler(async (req, res) => {
    let reviewId=req.params.reviewId

    await Review.findByIdAndDelete(reviewId);
    res.status(201).json({
      status: "Success",
      message: "Deleted Review successfully",
    });
  });
