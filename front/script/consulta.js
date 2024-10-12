document.addEventListener('DOMContentLoaded', function () {
    const loadInvoicesBtn = document.getElementById('loadInvoicesBtn');
    const invoicesTableBody = document.querySelector('#invoicesTable tbody');
    const message = document.getElementById('message');

    // Función para cargar las facturas desde el backend
    function loadInvoices() {
        fetch('https://api.example.com/invoices')  // Cambia esta URL por tu API real
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar las facturas');
                }
                return response.json();
            })
            .then(data => {
                // Limpiar la tabla antes de agregar las nuevas filas
                invoicesTableBody.innerHTML = '';

                if (data.length === 0) {
                    message.textContent = 'No hay facturas disponibles.';
                    return;
                }

                // Recorrer los datos de las facturas y agregarlas a la tabla
                data.forEach(invoice => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${invoice.invoiceId}</td>
                        <td>${invoice.clientName}</td>
                        <td>${invoice.companyName}</td>
                        <td>${invoice.totalAmount}</td>
                        <td>${invoice.date}</td>
                    `;
                    invoicesTableBody.appendChild(row);
                });

                message.textContent = ''; // Limpiar cualquier mensaje de error
            })
            .catch(error => {
                message.textContent = `Error: ${error.message}`;
            });
    }

    // Escuchar el botón para cargar las facturas
    loadInvoicesBtn.addEventListener('click', loadInvoices);
});
