DELIMITER //

DROP PROCEDURE IF EXISTS manage_invoice;
CREATE PROCEDURE manage_invoice(
    IN action ENUM('Create', 'Read', 'ReadAll', 'Update', 'Delete'),
    IN inv_id INT,
    IN cust_id INT,
    IN inv_issue_date DATE,
    IN inv_status ENUM('paid', 'pending', 'canceled')
)
BEGIN
    DECLARE msg VARCHAR(255);
    DECLARE total DECIMAL(10, 2);

    CASE action
        WHEN 'Create' THEN
            -- Calcular el total
            SET total = COALESCE((SELECT SUM(subtotal) FROM Invoice_Details WHERE invoice_id = inv_id), 0);
            -- Crear una nueva factura
            INSERT INTO Invoices (customer_id, issue_date, total, status)
            VALUES (cust_id, inv_issue_date, total, inv_status);
            SET msg = 'Invoice created successfully.';

        WHEN 'Read' THEN
            -- Leer una factura específica
            SELECT * FROM Invoices WHERE invoice_id = inv_id;

        WHEN 'ReadAll' THEN
            -- Leer todas las facturas
            SELECT * FROM Invoices;

        WHEN 'Update' THEN
            -- Calcular el nuevo total
            SET total = COALESCE((SELECT SUM(subtotal) FROM Invoice_Details WHERE invoice_id = inv_id), 0);
            -- Actualizar la factura
            UPDATE Invoices
            SET customer_id = cust_id,
                issue_date = inv_issue_date,
                total = total,
                status = inv_status
            WHERE invoice_id = inv_id;
            SET msg = 'Invoice updated successfully.';

        WHEN 'Delete' THEN
            -- Eliminar una factura
            DELETE FROM Invoices WHERE invoice_id = inv_id;
            SET msg = 'Invoice deleted successfully.';

        ELSE
            -- Acción inválida
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid action specified.';
    END CASE;

    -- Mostrar mensaje si no es una lectura
    IF action != 'Read' AND action != 'ReadAll' THEN
        SELECT msg AS message;
    END IF;

END //

DELIMITER ;
DELIMITER //

DROP PROCEDURE IF EXISTS manage_customer;
CREATE PROCEDURE manage_customer(
    IN action ENUM('Create', 'Read', 'ReadAll', 'Update', 'Delete'),
    IN cust_id INT,
    IN cust_name VARCHAR(255),
    IN cust_address VARCHAR(255),
    IN cust_phone VARCHAR(50),
    IN cust_email VARCHAR(255),
    IN cust_tax_id VARCHAR(50)
)
BEGIN
    DECLARE msg VARCHAR(255);

    CASE action
        WHEN 'Create' THEN
            INSERT INTO Customers (name, address, phone, email, tax_id)
            VALUES (cust_name, cust_address, cust_phone, cust_email, cust_tax_id);
            SET msg = 'Customer created successfully.';

        WHEN 'Read' THEN
            SELECT * FROM Customers WHERE customer_id = cust_id;

        WHEN 'ReadAll' THEN
            SELECT * FROM Customers;

        WHEN 'Update' THEN
            UPDATE Customers
            SET name = cust_name,
                address = cust_address,
                phone = cust_phone,
                email = cust_email,
                tax_id = cust_tax_id
            WHERE customer_id = cust_id;
            SET msg = 'Customer updated successfully.';

        WHEN 'Delete' THEN
            DELETE FROM Customers WHERE customer_id = cust_id;
            SET msg = 'Customer deleted successfully.';

        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid action specified.';
    END CASE;

    IF action != 'Read' AND action != 'ReadAll' THEN
        SELECT msg AS message;
    END IF;

END //

DELIMITER ;
DELIMITER //

DROP PROCEDURE IF EXISTS manage_product;
CREATE PROCEDURE manage_product(
    IN action ENUM('Create', 'Read', 'ReadAll', 'Update', 'Delete'),
    IN prod_id INT,
    IN prod_name VARCHAR(255),
    IN prod_description TEXT,
    IN prod_price DECIMAL(10, 2),
    IN prod_quantity_available INT
)
BEGIN
    DECLARE msg VARCHAR(255);

    CASE action
        WHEN 'Create' THEN
            INSERT INTO Products (product_name, description, price, quantity_available)
            VALUES (prod_name, prod_description, prod_price, prod_quantity_available);
            SET msg = 'Product created successfully.';

        WHEN 'Read' THEN
            SELECT * FROM Products WHERE product_id = prod_id;

        WHEN 'ReadAll' THEN
            SELECT * FROM Products;

        WHEN 'Update' THEN
            UPDATE Products
            SET product_name = prod_name,
                description = prod_description,
                price = prod_price,
                quantity_available = prod_quantity_available
            WHERE product_id = prod_id;
            SET msg = 'Product updated successfully.';

        WHEN 'Delete' THEN
            DELETE FROM Products WHERE product_id = prod_id;
            SET msg = 'Product deleted successfully.';

        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid action specified.';
    END CASE;

    IF action != 'Read' AND action != 'ReadAll' THEN
        SELECT msg AS message;
    END IF;

END //

DELIMITER ;
DELIMITER //

DROP PROCEDURE IF EXISTS manage_invoice;
CREATE PROCEDURE manage_invoice(
    IN action ENUM('Create', 'Read', 'ReadAll', 'Update', 'Delete'),
    IN inv_id INT,
    IN cust_id INT,
    IN inv_issue_date DATE,
    IN inv_status ENUM('paid', 'pending', 'canceled')
)
BEGIN
    DECLARE msg VARCHAR(255);

    CASE action
        WHEN 'Create' THEN
            INSERT INTO Invoices (customer_id, issue_date, status)
            VALUES (cust_id, inv_issue_date, inv_status);
            SET msg = 'Invoice created successfully.';

        WHEN 'Read' THEN
            SELECT * FROM Invoices WHERE invoice_id = inv_id;

        WHEN 'Update' THEN
            UPDATE Invoices
            SET customer_id = cust_id,
                issue_date = inv_issue_date,
                status = inv_status
            WHERE invoice_id = inv_id;
            SET msg = 'Invoice updated successfully.';

        WHEN 'Delete' THEN
            DELETE FROM Invoices WHERE invoice_id = inv_id;
            SET msg = 'Invoice deleted successfully.';

        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid action specified.';
    END CASE;

    IF action != 'Read' AND action != 'ReadAll' THEN
        SELECT msg AS message;
    END IF;

END //

DELIMITER ;


DELIMITER //

DROP PROCEDURE IF EXISTS manage_invoice_detail;
CREATE PROCEDURE manage_invoice_detail(
    IN action ENUM('Create', 'Read', 'ReadAll', 'Update', 'Delete'),
    IN detail_id INT,
    IN inv_id INT,
    IN prod_id INT,
    IN detail_quantity INT,
    IN detail_unit_price DECIMAL(10, 2)
)
BEGIN
    DECLARE msg VARCHAR(255);
    DECLARE subtotal DECIMAL(10, 2);

    -- Calcular el subtotal
    SET subtotal = detail_quantity * detail_unit_price;

    CASE action
        WHEN 'Create' THEN
            INSERT INTO Invoice_Details (invoice_id, product_id, quantity, unit_price, subtotal)
            VALUES (inv_id, prod_id, detail_quantity, detail_unit_price, subtotal);
            SET msg = 'Invoice detail created successfully.';

        WHEN 'Read' THEN
            SELECT * FROM Invoice_Details WHERE detail_id = detail_id;

        WHEN 'ReadAll' THEN
            SELECT * FROM Invoice_Details WHERE invoice_id = inv_id;

        WHEN 'Update' THEN
            UPDATE Invoice_Details
            SET product_id = prod_id,
                quantity = detail_quantity,
                unit_price = detail_unit_price,
                subtotal = subtotal
            WHERE detail_id = detail_id;
            SET msg = 'Invoice detail updated successfully.';

        WHEN 'Delete' THEN
            DELETE FROM Invoice_Details WHERE detail_id = detail_id;
            SET msg = 'Invoice detail deleted successfully.';

        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid action specified.';
    END CASE;

    IF action != 'Read' AND action != 'ReadAll' THEN
        SELECT msg AS message;
    END IF;

END //

DELIMITER ;
