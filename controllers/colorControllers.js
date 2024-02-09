import expressAsyncHandler from "express-async-handler";
import Color from "../models/Color.js";

// @desc   Create Colors
// @route  POST /api/v1/colors
// @access Private/Admin
export const createColor = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const color = await Color.findOne({ name });
  if (color) {
    throw new Color("Color already exists");
  }
  const newColor = await Color.create({
    name: name.toLowerCase(),
    user: req.userId,
  });

  res.json({
    status: "Success",
    message: "Color added successfully",
    newColor,
  });
});

// @desc   Get Colors
// @route  GET /api/v1/colors
// @access Public

export const getColors = expressAsyncHandler(async (req, res) => {
  const colors = await Color.find();
  res.json({
    status: "Success",
    message: "Fetched colors successfully",
    colors,
  });
});

// @desc   Get Color
// @route  GET /api/v1/colors/:id
// @access Public
export const getColor = expressAsyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  res.json({
    status: "Success",
    message: "Fetched color successfully",
    color,
  });
});

// @desc   Update Color
// @route  PUT /api/v1/colors/:id
// @access Private/Admin

export const updateColor = expressAsyncHandler(async (req, res) => {
  const color = await Color.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  res.json({
    status: "Success",
    message: "Updated color successfully",
    color,
  });
});

// @desc   Delete color
// @route  DELETE /api/v1/brand/:id
// @access Private/Admin

export const deleteColor = expressAsyncHandler(async (req, res) => {
  await Color.findByIdAndDelete(req.params.id);
  res.json({
    status: "Success",
    message: "Deleted color successfully",
  });
});