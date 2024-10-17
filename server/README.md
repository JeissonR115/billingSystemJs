
# Invoice Management API

This API provides a set of endpoints to manage invoices, customers, and products. It allows creating, reading, updating, and deleting invoices, along with their associated details like products and customers.

## API Base URL

[http://localhost:3000/v1](http://localhost:3000/v1)

## Prerequisites

Before running the API, make sure you have the following installed:

-   Node.js
-   MariaDB or MySQL
-   npm or yarn (depending on your preference)

## Installation

1.  Clone the repository:

```bash
git  clone  https://github.com/JeissonR115/billingSystemJs/
```

2.  Navigate to the project directory:

```bash
cd  billingSystemJs
```

3.  Install the necessary dependencies:

```bash
npm  i
```


4.  Set up your database configuration in `src/config/database.js`.
5.  Initialize the database by running the SQL script located in ./sqlScripts/execute.sql:
```bash
    mysql -u username -p < ./sqlScripts/execute.sql
```
6.  Run the server:
```bash
node app.js
```

The server will run at `http://localhost:3000/v1`.

## Endpoints

### Invoices
| Method | URL                        | Body                                                                                  | Response                       |
| ------ | -------------------------- | ------------------------------------------------------------------------------------- | ------------------------------ |
| POST   | `/v1/invoice`              | `{"customer_id": 123, "issue_date": "YYYY-MM-DD", "status": "Pending" `               | Success message                |
| GET    | `/v1/invoices/:invoice_id` | None                                                                                  | JSON with invoice and details. |
| PUT    | `/v1/invoices/:invoice_id` | `{"invoice_id": 1, "customer_id": 123, "issue_date": "YYYY-MM-DD", "status": "Paid"}` | Success message.               |
| DELETE | `/v1/invoices/:invoice_id` | None                                                                                  | Success message.               |
| GET    | `/v1/invoices`             | None                                                                                  | Array of all invoices.         |

### InvoiceDetails
| Method | URL                                          | Body                                                        | Response                       |
| ------ | -------------------------------------------- | ----------------------------------------------------------- | ------------------------------ |
| POST   | `/v1/invoice/:invoice_id/details`            | `{"product_id": 5, "quantity": 10, "unit_price": "899.99"}` | Success message.               |
| GET    | `/v1/invoice/:invoice_id/details`            | None                                                        | JSON with all invoice details. |
| PUT    | `/v1/invoice/:invoice_id/details/:detail_id` | `{"product_id": 5, "quantity": 12, "unit_price": "799.99"}` | Success message.               |
| DELETE | `/v1/invoice/:invoice_id/details/:detail_id` | None                                                        | Success message.               |

### Products
| Method | URL                       | Body                                                                                                                    | Response                   |
| ------ | ------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| POST   | `/v1/product`             | `{"product_name": "Laptop", "description": "15 inch laptop with 8GB RAM", "price": "899.99", "quantity_available": 50}` | Success message.           |
| GET    | `/v1/product/:product_id` | None                                                                                                                    | JSON with product details. |
| GET    | `/v1/product`             | None                                                                                                                    | Array of all products.     |
| PUT    | `/v1/product/:product_id` | `{"product_name": "Laptop", "description": "Updated description", "price": "799.99", "quantity_available": 40}`         | Success message.           |
| DELETE | `/v1/product/:product_id` | None                                                                                                                    | Success message.           |

## Technologies Used

-   Node.js
-   Express.js
-   MariaDB/MySQL

# Invoice Management API

This API provides a set of endpoints to manage invoices, customers, and products. It allows creating, reading, updating, and deleting invoices, along with their associated details like products and customers.

## Project Structure

```
.
├── app.js
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── config
    │   └── database.js
    ├── controllers
    │   ├── customerController.js
    │   ├── invoiceController.js
    │   ├── invoiceDetailController.js
    │   ├── paymentController.js
    │   ├── productsController.js
    │   └── spController.js
    ├── models
    │   ├── invoice.js
    │   └── SP.js
    └── routes
        ├── index.js
        ├── invoiceDetailRoute.js
        ├── invoiceRoutes.js
        └── productRoutes.js
```

## Technologies Used

- Node.js
- Express.js
- MariaDB/MySQL