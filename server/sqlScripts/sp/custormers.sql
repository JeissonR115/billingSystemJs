DELIMITER //

DROP PROCEDURE IF EXISTS manage_customers;
CREATE PROCEDURE manage_customers(
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

    -- Mostrar mensaje si no es una operación de lectura
    IF action != 'Read' AND action != 'ReadAll' THEN
        SELECT msg AS message;
    END IF;

END //

DELIMITER ;
