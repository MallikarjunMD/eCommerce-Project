import expressAsyncHandler from "express-async-handler";
import Brand from "../models/Brand.js";

// @desc   Create Brand
// @route  POST /api/v1/brands
// @access Private/Admin
export const createBrand = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await Brand.findOne({ name });
  if (brand) {
    throw new Error("Brand already exists");
  }
  const newBrand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userId,
  });

  res.json({
    status: "Success",
    message: "Brand added successfully",
    newBrand,
  });
});

// @desc   Get Brands
// @route  GET /api/v1/brands
// @access Public

export const getBrands = expressAsyncHandler(async (req, res) => {
  const brands = await Brand.find();
  res.json({
    status: "Success",
    message: "Fetched brands successfully",
    brands,
  });
});

// @desc   Get Brand
// @route  GET /api/v1/brands/:id
// @access Public
export const getBrand = expressAsyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  res.json({
    status: "Success",
    message: "Fetched brand successfully",
    brand,
  });
});

// @desc   Update Brand
// @route  PUT /api/v1/brands/:id
// @access Private/Admin

export const updateBrand = expressAsyncHandler(async (req, res) => {
  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  res.json({
    status: "Success",
    message: "Updated brand successfully",
    brand,
  });
});

// @desc   Delete Brand
// @route  DELETE /api/v1/brands/:id
// @access Private/Admin

export const deleteBrand = expressAsyncHandler(async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id);
  res.json({
    status: "Success",
    message: "Deleted Brand successfully",
  });
});