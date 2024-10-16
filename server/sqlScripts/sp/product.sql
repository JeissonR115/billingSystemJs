DELIMITER //

DROP PROCEDURE IF EXISTS manage_products;
CREATE PROCEDURE manage_products(
    IN action ENUM('Create', 'Read', 'ReadAll', 'Update', 'Delete'),
    IN prod_id INT,
    IN prod_name VARCHAR(255),
    IN prod_description TEXT,
    IN prod_price DECIMAL(10, 2),
    IN prod_quantity INT
)
BEGIN
    DECLARE msg VARCHAR(255);

    CASE action
        WHEN 'Create' THEN
            INSERT INTO Products (product_name, description, price, quantity_available)
            VALUES (prod_name, prod_description, prod_price, prod_quantity);
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
                quantity_available = prod_quantity
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
