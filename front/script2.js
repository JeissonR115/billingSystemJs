document.addEventListener('DOMContentLoaded', function () {
    const invoiceForm = document.getElementById('invoice-form');

    // Función para enviar la factura al backend
    function submitInvoiceToBackend(invoiceData) {
        fetch('https://api.example.com/invoices', { // Cambia esta URL por tu endpoint real
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
            document.getElementById('message').textContent = `Factura enviada con éxito. ID de la factura: ${data.invoiceId}`;
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
        });

        // Crear el objeto con los datos de la factura
        const invoiceData = {
            companyInfo: {
                nit: '809891658',
                companyName: 'Super Locos',
                clientName: 'Kevin Ramirez',
                phone: '3222291007',
                email: 'alejo1025@gmail.com'
            },
            items: invoiceItems,
            totalAmount: document.getElementById('totalAmount').textContent
        };

        // Llamar a la función que envía los datos al backend
        submitInvoiceToBackend(invoiceData);
    });
});
