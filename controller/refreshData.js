const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Sale = require('../models/Sale');

const filePath = path.join(__dirname, '../config/data/sales.csv'); // change if different

module.exports = async (req, res) => {
  try {
    const results = [];

    // Read CSV file
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => results.push(row))
      .on('end', async () => {
        let inserted = 0;
        let skipped = 0;

        for (const row of results) {
          // Skip if order already exists
          const existingOrder = await Sale.findOne({ orderId: row['Order ID'] });
          if (existingOrder) {
            skipped++;
            continue;
          }

          // Check / insert product
          let product = await Product.findOne({ productId: row['Product ID'] });
          if (!product) {
            product = await Product.create({
              productId: row['Product ID'],
              name: row['Product Name'],
              category: row['Category']
            });
          }

          // Check / insert customer
          let customer = await Customer.findOne({ customerId: row['Customer ID'] });
          if (!customer) {
            customer = await Customer.create({
              customerId: row['Customer ID'],
              name: row['Customer Name'],
              email: row['Customer Email'],
              address: row['Customer Address']
            });
          }

          // Insert sale
          await Sale.create({
            orderId: row['Order ID'],
            product: product._id,
            customer: customer._id,
            region: row['Region'],
            dateOfSale: new Date(row['Date of Sale']),
            quantitySold: parseInt(row['Quantity Sold']),
            unitPrice: parseFloat(row['Unit Price']),
            discount: parseFloat(row['Discount']),
            shippingCost: parseFloat(row['Shipping Cost']),
            paymentMethod: row['Payment Method']
          });

          inserted++;
        }

        return res.json({
          message: 'Data refresh complete.',
          inserted,
          skipped
        });
      });
  } catch (error) {
    console.error('Refresh error:', error);
    res.status(500).json({ message: 'Error refreshing data.' });
  }
};
