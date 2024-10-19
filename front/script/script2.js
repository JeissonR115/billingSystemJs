document.addEventListener('DOMContentLoaded', function () {
    const invoiceForm = document.getElementById('invoice-form');

    // Función para enviar la factura al backend
    function submitInvoiceToBackend(invoiceData) {
        console.log(invoiceData);
        fetch('http://localhost:3000/v1/invoice/details', { // Cambia esta URL por tu endpoint real
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(invoiceData) // Enviamos los datos en formato JSON
            
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar la factura');
            }
            return response.json();
        })
        .then(data => {
            // Mostrar mensaje de éxito o hacer algo con los datos de la respuesta
            document.getElementById('message').textContent = "Factura enviada con éxito.";
        })
        .catch(error => {
            // Manejo de errores
            document.getElementById('message').textContent = `Error: ${error.message}`;
        });
    }

    // Al enviar el formulario
    invoiceForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el envío normal del formulario

        const invoiceItems = [];
        document.querySelectorAll('#itemsTable tbody tr').forEach(row => {
            const id = row.querySelector('td:first-child').textContent;
            const product = row.querySelector('.product').value;
            const quantity = row.querySelector('.quantity').value;
            const price = row.querySelector('.price').value;
            const subtotal = row.querySelector('.subtotal').textContent;

            invoiceItems.push({ id, product, quantity, price, subtotal });
            console.log(invoiceItems);
        });

        // Crear el objeto con los datos de la factura
        const invoiceData = {
            
                "invoice_id": invoiceItems[0].id,
                "product_id": invoiceItems[0].product,
                "quantity": invoiceItems[0].quantity,
                "unit_price": invoiceItems[0].price,
            }
        // Llamar a la función que envía los datos al backend
        submitInvoiceToBackend(invoiceData);
    });
});
