import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import categoryRoutes from './src/routes/categoryRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
const orderRoutes = require('./routes/orderRoutes');
dotenv.config();
const app = express();
app.use(express.json());

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB ga ulandi');
    app.listen(PORT, () => console.log(`Server ${PORT}-portda ishlayapti`));
  })
  .catch(err => console.log(err));