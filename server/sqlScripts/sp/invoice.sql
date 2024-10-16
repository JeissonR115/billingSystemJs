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
            SELECT i.*, 
                   (SELECT SUM(subtotal) FROM Invoice_Details WHERE invoice_id = i.invoice_id) AS total
            FROM Invoices i
            WHERE i.invoice_id = inv_id;

        WHEN 'ReadAll' THEN
            SELECT i.*, 
                   (SELECT SUM(subtotal) FROM Invoice_Details WHERE invoice_id = i.invoice_id) AS total
            FROM Invoices i;

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

    -- Mostrar mensaje si no es una operación de lectura
    IF action != 'Read' AND action != 'ReadAll' THEN
        SELECT msg AS message;
    END IF;

END //

DELIMITER ;
