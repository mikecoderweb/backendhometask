import express from 'express';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

router.get('/:id/products', async (req, res) => {
  const products = await Product.find({ category: req.params.id }).populate('category');
  res.json(products);
});

export default router;