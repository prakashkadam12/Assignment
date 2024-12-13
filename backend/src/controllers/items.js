import asyncHandler from 'express-async-handler';
import Item from '../models/Item.js';

// @desc    Get all items
// @route   GET /api/items
// @access  Private
export const getItems = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const searchQuery = req.query.search
    ? { $text: { $search: req.query.search } }
    : {};
  const statusQuery = req.query.status ? { status: req.query.status } : {};

  const query = {
    user: req.user._id,
    ...searchQuery,
    ...statusQuery,
  };

  const total = await Item.countDocuments(query);
  const items = await Item.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    items,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
});

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Private
export const getItem = asyncHandler(async (req, res) => {
  const item = await Item.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

// @desc    Create new item
// @route   POST /api/items
// @access  Private
export const createItem = asyncHandler(async (req, res) => {
  const { title, description, status, tags } = req.body;

  const item = await Item.create({
    title,
    description,
    status,
    tags,
    user: req.user._id,
  });

  res.status(201).json(item);
});

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private
export const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  const updatedItem = await Item.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );

  res.json(updatedItem);
});

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private
export const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  await item.deleteOne();
  res.json({ message: 'Item removed' });
});