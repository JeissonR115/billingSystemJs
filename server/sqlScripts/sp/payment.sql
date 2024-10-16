DELIMITER //

DROP PROCEDURE IF EXISTS manage_payments;
CREATE PROCEDURE manage_payments(
    IN action ENUM('Create', 'Read', 'ReadAll', 'Update', 'Delete'),
    IN payment_id_param INT,
    IN invoice_id_param INT,
    IN payment_date_param DATE,
    IN amount_param DECIMAL(10, 2),
    IN payment_method_param ENUM('card', 'transfer', 'cash')
)
BEGIN
    DECLARE msg VARCHAR(255);

    CASE action
        WHEN 'Create' THEN
            INSERT INTO Payments (invoice_id, payment_date, amount, payment_method)
            VALUES (invoice_id_param, payment_date_param, amount_param, payment_method_param);
            SET msg = 'Payment recorded successfully.';

        WHEN 'Read' THEN
            SELECT * FROM Payments WHERE payment_id = payment_id_param;

        WHEN 'ReadAll' THEN
            SELECT * FROM Payments;

        WHEN 'Update' THEN
            UPDATE Payments
            SET invoice_id = invoice_id_param,
                payment_date = payment_date_param,
                amount = amount_param,
                payment_method = payment_method_param
            WHERE payment_id = payment_id_param;
            SET msg = 'Payment updated successfully.';

        WHEN 'Delete' THEN
            DELETE FROM Payments WHERE payment_id = payment_id_param;
            SET msg = 'Payment deleted successfully.';

        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid action specified.';
    END CASE;

    IF action != 'Read' AND action != 'ReadAll' THEN
        SELECT msg AS message;
    END IF;

END //

DELIMITER ;
