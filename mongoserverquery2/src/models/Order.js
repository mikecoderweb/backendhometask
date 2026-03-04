const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['paid', 'pending', 'canceled'],
    required: true
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  itemsCount: {
    type: Number,
    required: true,
    min: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);