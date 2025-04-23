// controller/getTotalRevenue.js
const Sale = require('../models/Sale');

module.exports = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'startDate and endDate are required.' });
    }

    const sales = await Sale.find({
      dateOfSale: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    });

    const totalRevenue = sales.reduce((sum, sale) => {
      const revenue = (sale.unitPrice * sale.quantitySold) * (1 - sale.discount);
      return sum + revenue;
    }, 0);

    res.json({ totalRevenue: totalRevenue.toFixed(2) });
  } catch (error) {
    console.error('Revenue calculation error:', error);
    res.status(500).json({ message: 'Failed to calculate revenue' });
  }
};
