import Coupon from "../models/Coupon.js";

import expressAsyncHandler from "express-async-handler";


// @desc   Create Coupon
// @route  POST /api/v1/coupons
// @access Private/Admin
export const createCoupon = expressAsyncHandler(async (req, res) => {
  const { code,startDate,endDate,discount } = req.body;
  const existingCoupon = await Coupon.findOne({ code:code });
  if (existingCoupon) {
    throw new Error("Coupon already exists");
  }
  const newCoupon = await Coupon.create({
    code,
    startDate,
    endDate,
    discount,
    user:req.userId
  });

  res.status(201).json({
    status: "Success",
    message: "Coupon created successfully",
    newCoupon,
  });
});

// @desc   Get Coupons
// @route  GET /api/v1/coupons
// @access Private/admin

export const getCoupons = expressAsyncHandler(async (req, res) => {
  const coupons = await Coupon.find();
  res.status(201).json({
    status: "Success",
    message: "Fetched Coupons successfully",
    coupons,
  });
});

// @desc   Get Coupon
// @route  GET /api/v1/coupons/:id
// @access Public

export const getCoupon = expressAsyncHandler(async (req, res) => {
  const Coupon = await Coupon.findById(req.params.id);
  res.status(200).json({
    status: "Success",
    message: "Fetched Coupon successfully",
    Coupon,
  });
});

// @desc   Update Coupon
// @route  PUT /api/v1/coupons/:id
// @access Private/Admin

export const updateCoupon = expressAsyncHandler(async (req, res) => {
  const updatedCoupon = await Coupon.findByIdAndUpdate(
    req.params.id,
    req.body,
    { 
    new: true ,
    runValidators:true
}
  );
  res.status(200).json({
    status: "Success",
    message: "Updated Coupon successfully",
    updatedCoupon,
  });
});

// @desc   Delete Coupon
// @route  DELETE /api/v1/coupons/:id
// @access Private/Admin

export const deleteCoupon = expressAsyncHandler(async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "Success",
    message: "Deleted Coupon successfully",
  });
});