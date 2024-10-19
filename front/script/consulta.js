document.addEventListener('DOMContentLoaded', function () {
    const loadInvoicesBtn = document.getElementById('loadInvoicesBtn');
    const invoicesTableBody = document.querySelector('#invoicesTable tbody');
    const message = document.getElementById('message');

    // Función para cargar las facturas desde el backend
    function loadInvoices() {
        fetch('http://localhost:3000/v1/Invoice/')  // Cambia esta URL por tu API real
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
            data.forEach(async (invoice,i) => {
    try {
        // Espera la respuesta del fetch
    //    // const response = await fetch('http://localhost:3000/v1/invoice/details/' + 1 );
    //     const detalles = await response.json(); // Suponiendo que el API responde con JSON
    //     console.log(detalles);
            // <td>${detalles[i].product_id}</td>
            //  <td>${detalles[i].quantity}</td>
            //  <td>${detalles[i].unit_price}</td>
            
        // Crea la fila para la tabla
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${invoice.invoice_id}</td>
            <td>${invoice.customer_id}</td>
            <td>${invoice.issue_date}</td>
            
        `;

        invoicesTableBody.appendChild(row);
    } catch (error) {
        console.error('Error fetching invoice details:', error);
    }
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
