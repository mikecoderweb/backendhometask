const express = require('express');
const router = express.Router();
const Order = require('../models/Order')

// Status bo'yicha umumiy statistika (count + avg total)
router.get('/stats', async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          avgTotal: { $avg: "$total" },
          totalSum: { $sum: "$total" }        // ixtiyoriy qo'shimcha
        }
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
          avgTotal: { $round: ["$avgTotal", 2] },
          totalSum: 1
        }
      },
      {
        $sort: { status: 1 }   // paid → pending → canceled tartibida
      }
    ]);

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server xatosi",
      error: error.message
    });
  }
});

// Qo'shimcha: faqat countlar uchun oddiy variant
router.get('/stats/counts', async (req, res) => {
  try {
    const counts = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(counts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;