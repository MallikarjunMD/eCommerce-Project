import expressAsyncHandler from 'express-async-handler';
import Category from '../models/Category.js';

// @desc   Create Category
// @route  POST /api/v1/categories
// @access Private/Admin

export const createCategory = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const existingCategory = await Category.findOne({ name:name });
  if (existingCategory) {
    throw new Error('Category already exists');
  }
  const category = await Category.create({
    name: name.toLowerCase(),
    user: req.userId,
  });

  res.status(201).json({
    status: 'Success',
    message: 'Category added successfully',
    category
  });
});

// @desc   Get Categories
// @route  GET /api/v1/categories
// @access Public

export const getCategories = expressAsyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(201).json({
    status: 'Success',
    message: 'Fetched categories successfully',
    categories
  });
});

// @desc   Get Category
// @route  GET /api/v1/categories/:id
// @access Public

export const getCategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json({
    status: 'Success',
    message: 'Fetched category successfully',
    category,
  });
});

// @desc   Update Category
// @route  PUT /api/v1/categories/:id
// @access Private/Admin

export const updateCategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  res.json({
    status: 'Success',
    message: 'Updated category successfully',
    category,
  });
});

// @desc   Delete Category
// @route  DELETE /api/v1/categories/:id
// @access Private/Admin

export const deleteCategory = expressAsyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({
    status: 'Success',
    message: 'Deleted category successfully',
  });
});