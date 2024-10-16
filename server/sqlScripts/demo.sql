
USE billing_system;


CALL manage_products('Create', NULL, 'Laptop', '15 inch laptop with 8GB RAM', 899.99, 50);
CALL manage_products('Create', NULL, 'Smartphone', 'Latest model smartphone with 128GB storage', 699.99, 200);
CALL manage_products('Create', NULL, 'Wireless Mouse', 'Ergonomic wireless mouse', 19.99, 500);

CALL manage_customers('Create', NULL, 'John Doe', '123 Main St', '555-1234', 'john.doe@example.com', 'JDOE-12345');
CALL manage_customers('Create', NULL, 'Jane Smith', '456 Oak Ave', '555-5678', 'jane.smith@example.com', 'JSMITH-67890');
CALL manage_customers('Create', NULL, 'Acme Corp', '789 Industrial Rd', '555-9876', 'contact@acmecorp.com', 'ACME-98765');




CALL manage_invoice('Create', NULL, 1, '2024-10-15', 'pending'); 
CALL manage_invoice_details('Create', NULL, 1, 1, 2, 899.99); 
CALL manage_invoice_details('Create', NULL, 1, 3, 1, 19.99); 


CALL manage_invoice('Create', NULL, 2, '2024-10-15', 'pending'); 
CALL manage_invoice_details('Create', NULL, 2, 2, 1, 699.99); 

CALL manage_invoice('Create', NULL, 3, '2024-10-15', 'pending'); 
CALL manage_invoice_details('Create', NULL, 3, 1, 10, 899.99); 
CALL manage_invoice_details('Create', NULL, 3, 3, 20, 19.99); 

CALL manage_payments('Create', NULL, 1, '2024-10-16', 1819.97, 'card'); 
CALL manage_payments('Create', NULL, 2, '2024-10-16', 699.99, 'transfer'); 
CALL manage_payments('Create', NULL, 3, '2024-10-16', 9039.80, 'cash'); 

CALL manage_customers('ReadAll', NULL, NULL, NULL, NULL, NULL, NULL);


CALL manage_products('ReadAll', NULL, NULL, NULL, NULL, NULL);


CALL manage_invoice('ReadAll', NULL, NULL, NULL, NULL);


CALL manage_payments('ReadAll', NULL, NULL, NULL, NULL, NULL);


CALL manage_invoice_details('Read', NULL, 1, NULL, NULL, NULL);
