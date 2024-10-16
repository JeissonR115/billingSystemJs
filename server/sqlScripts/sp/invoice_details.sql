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

    SET subtotal = quantity_param * unit_price_param;

    CASE action
        WHEN 'Create' THEN
            INSERT INTO Invoice_Details (invoice_id, product_id, quantity, unit_price, subtotal)
            VALUES (invoice_id_param, product_id_param, quantity_param, unit_price_param, subtotal);
            SET msg = 'Invoice detail created successfully.';

        WHEN 'Read' THEN
            SELECT * FROM Invoice_Details WHERE invoice_id = invoice_id_param;

        WHEN 'Update' THEN
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
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid action specified.';
    END CASE;

    IF action != 'Read' THEN
        SELECT msg AS message;
    END IF;

END //

DELIMITER ;
