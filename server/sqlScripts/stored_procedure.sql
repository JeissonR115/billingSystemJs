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
            SET total = (SELECT SUM(subtotal) FROM Invoice_Details WHERE invoice_id = inv_id);
            INSERT INTO Invoices (customer_id, issue_date, total, status)
            VALUES (cust_id, inv_issue_date, total, inv_status);
            SET msg = 'Invoice created successfully.';

        WHEN 'Read' THEN
            SELECT * FROM Invoices WHERE invoice_id = inv_id;

        WHEN 'ReadAll' THEN
            SELECT i.*, 
                   (SELECT SUM(subtotal) FROM Invoice_Details WHERE invoice_id = i.invoice_id) AS total
            FROM Invoices i;

        WHEN 'Update' THEN
            SET total = (SELECT SUM(subtotal) FROM Invoice_Details WHERE invoice_id = inv_id);
            UPDATE Invoices
            SET customer_id = cust_id,
                issue_date = inv_issue_date,
                total = total,
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

DROP PROCEDURE IF EXISTS manage_invoice_details;
CREATE PROCEDURE manage_invoice_details(
    IN action ENUM('Create', 'Read', 'Update', 'Delete'),
    IN detail_id_param INT,
    IN invoice_id_param INT,
    IN product_id_param INT,
    IN quantity_param INT,
    IN unit_price_param DECIMAL(10, 2)
)
BEGIN
    DECLARE msg VARCHAR(255);
    DECLARE subtotal DECIMAL(10, 2);

    -- Calcular el subtotal
    SET subtotal = quantity_param * unit_price_param;

    CASE action
        WHEN 'Create' THEN
            INSERT INTO Invoice_Details (invoice_id, product_id, quantity, unit_price, subtotal)
            VALUES (invoice_id_param, product_id_param, quantity_param, unit_price_param, subtotal);
            SET msg = 'Invoice detail created successfully.';

        WHEN 'Read' THEN
            SELECT * FROM Invoice_Details WHERE invoice_id = invoice_id_param;

        WHEN 'Update' THEN
            -- Actualizar el subtotal basado en la nueva cantidad y precio unitario
            SET subtotal = quantity_param * unit_price_param;

            UPDATE Invoice_Details
            SET product_id = product_id_param,
                quantity = quantity_param,
                unit_price = unit_price_param,
                subtotal = subtotal
            WHERE detail_id = detail_id_param;
            SET msg = 'Invoice detail updated successfully.';

        WHEN 'Delete' THEN
            DELETE FROM Invoice_Details WHERE detail_id = detail_id_param;
            SET msg = 'Invoice detail deleted successfully.';

        ELSE
        
