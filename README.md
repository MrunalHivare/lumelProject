
# Backend Data Processing Solution

This project provides a backend API for processing sales data, calculating revenue, and refreshing data from a CSV file. It connects to a MongoDB database and supports operations like retrieving total revenue for a specific date range and refreshing data from a CSV file into the database.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv for environment variables
- CORS for handling cross-origin requests
- Body-Parser for parsing request bodies
- csv-parser for reading CSV files

## Prerequisites

- **Node.js**: v14.x or higher
- **MongoDB**: Local or MongoDB Atlas instance
- **Python (optional)**: If using any Python-based tools for CSV processing (not required for this project)

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MrunalHivare/lumelProject.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd backend-data-processing-solution
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   Create a `.env` file in the root of the project and add the following:

   ```env
   MONGO_URI=mongodb://localhost:27017/myDatabase
   PORT=5000
   ```

   - Replace `mongodb://localhost:27017/myDatabase` with your MongoDB URI (use MongoDB Atlas URI if applicable).
   - Set the `PORT` to the desired port for your server.

5. **Start the server**:
   ```bash
   npm start
   ```

   The server will start and listen on `http://localhost:5000`.

## API Endpoints

### 1. **POST /api/refresh** - Refresh Data from CSV

This endpoint reads a CSV file and inserts data into the `Sale`, `Product`, and `Customer` collections in the database. If an existing sale order is found, it will be skipped.

#### Request:
No body required. This is a simple `POST` request.

**cURL Command:**

```bash
curl -X POST http://localhost:5000/api/refresh
```

#### Sample Response:
```json
{
  "message": "Data refresh complete.",
  "inserted": 100,
  "skipped": 10
}
```

### 2. **POST /api/revenue** - Calculate Total Revenue for a Date Range

This endpoint calculates the total revenue between the given start and end dates. It retrieves data from the `Sale` collection and calculates the revenue based on the sales data.

#### Request:
```json
{
  "startDate": "2025-01-01",
  "endDate": "2025-12-31"
}
```

**cURL Command:**

```bash
curl -X POST http://localhost:5000/api/revenue -H "Content-Type: application/json" -d '{"startDate": "2025-01-01", "endDate": "2025-12-31"}'
```

#### Sample Response:
```json
{
  "totalRevenue": "123456.78"
}
```

## Database Schema

### MongoDB Collections:

1. **Sale**
   - `orderId`: String (Unique identifier for each sale)
   - `product`: ObjectId (Reference to `Product` collection)
   - `customer`: ObjectId (Reference to `Customer` collection)
   - `region`: String
   - `dateOfSale`: Date
   - `quantitySold`: Number
   - `unitPrice`: Number
   - `discount`: Number
   - `shippingCost`: Number
   - `paymentMethod`: String

2. **Product**
   - `productId`: String (Unique identifier for each product)
   - `name`: String
   - `category`: String

3. **Customer**
   - `customerId`: String (Unique identifier for each customer)
   - `name`: String
   - `email`: String
   - `address`: String

---

## File Structure

```
/backend-data-processing-solution
│
├── /config
│   ├── data
│   │   └── sales.csv        # CSV file with sales data
│   ├── db.js                # MongoDB connection setup
│
├── /controllers
│   ├── getTotalRevenue.js   # Controller for revenue calculation
│   └── refreshData.js       # Controller for refreshing data from CSV
│
├── /models
│   ├── Sale.js              # Mongoose model for Sale
│   ├── Product.js           # Mongoose model for Product
│   └── Customer.js          # Mongoose model for Customer
│
├── /routes
│   └── index.js             # Routes for the API
│
├── .env                     # Environment variables (MongoDB URI, PORT)
├── app.js                   # Main server file
├── package.json             # Node.js dependencies and scripts
└── README.md                # Project documentation
```

## Schema Diagram

You can create a schema diagram that represents the relationships between the `Sale`, `Product`, and `Customer` collections. Below is a simple example:

```
Sale -> Product (Many-to-One) 
Sale -> Customer (Many-to-One)
```

The PDF or JPEG schema diagram can be added to the `docs` folder and referenced here.

---

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
