document.addEventListener('DOMContentLoaded', function () {
    const itemsTable = document.querySelector('#itemsTable tbody');
    const totalAmount = document.getElementById('totalAmount');
    const addRowBtn = document.getElementById('addRowBtn');
    
    // Inicializamos el contador para el ID autoincremental
    let productId = 1;

    // Función para agregar una nueva fila de artículo
    function addRow() {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${productId}</td> <!-- ID autoincremental -->
            <td><input type="text" class="product" placeholder="Producto"></td>
            <td><input type="number" class="quantity" value="1"></td>
            <td><input type="number" class="price" value="0"></td>
            <td><span class="subtotal">0.00</span></td>
            <td><button type="button" class="deleteRowBtn">Eliminar</button></td>
        `;
        itemsTable.appendChild(row);

        // Escuchar cambios en cantidad y precio para recalcular el subtotal
        row.querySelector('.quantity').addEventListener('input', updateSubtotal);
        row.querySelector('.price').addEventListener('input', updateSubtotal);

        // Botón de eliminar fila
        row.querySelector('.deleteRowBtn').addEventListener('click', function () {
            row.remove();
            updateTotal();
        });

        // Incrementar el ID para la próxima fila
        productId++;
    }

    // Función para actualizar el subtotal de una fila
    function updateSubtotal(event) {
        const row = event.target.closest('tr');
        const quantity = row.querySelector('.quantity').value;
        const price = row.querySelector('.price').value;
        const subtotal = row.querySelector('.subtotal');

        const total = (quantity * price).toFixed(2);
        subtotal.textContent = total;

        updateTotal();
    }

    // Función para actualizar el total de todos los productos
    function updateTotal() {
        let total = 0;
        document.querySelectorAll('.subtotal').forEach(subtotal => {
            total += parseFloat(subtotal.textContent);
        });
        totalAmount.textContent = total.toFixed(2);
    }

    // Escuchar el botón para agregar una nueva fila
    addRowBtn.addEventListener('click', addRow);

    // Agregar una fila inicial por defecto
    addRow();

    // Al enviar el formulario
    document.getElementById('invoice-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const invoiceItems = [];
        document.querySelectorAll('#itemsTable tbody tr').forEach(row => {
            const id = row.querySelector('td:first-child').textContent;
            const product = row.querySelector('.product').value;
            const quantity = row.querySelector('.quantity').value;
            const price = row.querySelector('.price').value;
            const subtotal = row.querySelector('.subtotal').textContent;

            invoiceItems.push({ id, product, quantity, price, subtotal });
        });

        // Mostrar mensaje de éxito con los datos (puedes enviar los datos a la API aquí)
        document.getElementById('message').textContent = `Factura creada con éxito con ${invoiceItems.length} productos. Total a pagar: ${totalAmount.textContent}`;
    });
});
