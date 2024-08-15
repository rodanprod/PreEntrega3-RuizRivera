document.addEventListener("DOMContentLoaded", function () {
    const carrito = [];
    const componentes = [
        { tipo: "Gabinete", nombre: "ASUS ROG Hyperion", precio: 250000 },
        { tipo: "Gabinete", nombre: "ASUS ROG Strix Case", precio: 200000 },
        { tipo: "Gabinete", nombre: "ASUS TUF Gaming Case", precio: 150000 },
        { tipo: "Placa Madre", nombre: "ASUS ROG Maximus XIII", precio: 350000 },
        { tipo: "Placa Madre", nombre: "ASUS ROG Strix Z590-E", precio: 300000 },
        { tipo: "Placa Madre", nombre: "ASUS TUF Gaming B560M", precio: 200000 },
        { tipo: "Procesador", nombre: "AMD Ryzen 9 5900X", precio: 400000 },
        { tipo: "Procesador", nombre: "AMD Ryzen 7 5800X", precio: 350000 },
        { tipo: "Procesador", nombre: "AMD Ryzen 5 5600X", precio: 300000 },
        { tipo: "Tarjeta Gráfica", nombre: "ASUS ROG Strix RTX 3080", precio: 800000 },
        { tipo: "Tarjeta Gráfica", nombre: "ASUS TUF Gaming RTX 3070", precio: 700000 },
        { tipo: "Tarjeta Gráfica", nombre: "ASUS Dual RTX 3060", precio: 600000 },
        { tipo: "Fuente de Poder", nombre: "ASUS ROG Thor 850W", precio: 150000 },
        { tipo: "Fuente de Poder", nombre: "ASUS ROG Strix 750W", precio: 130000 },
        { tipo: "Fuente de Poder", nombre: "ASUS TUF Gaming 650W", precio: 100000 },
        { tipo: "RAM", nombre: "Corsair Vengeance RGB Pro 32GB", precio: 200000 },
        { tipo: "RAM", nombre: "G.Skill Trident Z RGB 16GB", precio: 150000 },
        { tipo: "RAM", nombre: "Kingston HyperX Fury 16GB", precio: 120000 },
        { tipo: "Refrigeración", nombre: "Cooler Master Liquid ML360R", precio: 150000 },
        { tipo: "Refrigeración", nombre: "Corsair H100i RGB", precio: 130000 },
        { tipo: "Refrigeración", nombre: "NZXT Kraken X53", precio: 120000 },
        { tipo: "Disco Sólido", nombre: "Samsung 970 EVO Plus 1TB", precio: 200000 },
        { tipo: "Disco Sólido", nombre: "WD Black SN750 1TB", precio: 180000 },
        { tipo: "Disco Sólido", nombre: "Kingston A2000 1TB", precio: 150000 }
    ];

    const seleccionDiv = document.getElementById("seleccion");
    const carritoDiv = document.getElementById("carrito");
    const carritoItemsDiv = document.getElementById("carritoItems");
    const totalCarritoSpan = document.getElementById("totalCarrito");
    const pagoDiv = document.getElementById("pago");
    const searchResultsDiv = document.getElementById("searchResults");

    document.getElementById("armarPC").addEventListener("click", function () {
        seleccionDiv.style.display = "block";
        carritoDiv.style.display = "none";
        pagoDiv.style.display = "none";
        searchResultsDiv.style.display = "none";
        mostrarComponentes();
    });

    document.getElementById("buscarComponente").addEventListener("click", function () {
        seleccionDiv.style.display = "none";
        carritoDiv.style.display = "none";
        pagoDiv.style.display = "none";
        searchResultsDiv.style.display = "block";
    });

    document.getElementById("verCarrito").addEventListener("click", function () {
        seleccionDiv.style.display = "none";
        carritoDiv.style.display = "block";
        pagoDiv.style.display = "none";
        searchResultsDiv.style.display = "none";
        mostrarCarrito();
    });

    document.getElementById("salir").addEventListener("click", function () {
        alert("Gracias por visitar Cybermart. ¡Vuelve pronto!");
        seleccionDiv.style.display = "none";
        carritoDiv.style.display = "none";
        pagoDiv.style.display = "none";
        searchResultsDiv.style.display = "none";
    });

    document.getElementById("searchBtn").addEventListener("click", function () {
        const query = document.getElementById("searchInput").value.toLowerCase();
        const resultados = componentes.filter(componente => 
            componente.nombre.toLowerCase().includes(query) || 
            componente.tipo.toLowerCase().includes(query)
        );
        mostrarResultadosBusqueda(resultados);
    });

    document.getElementById("pagarBtn").addEventListener("click", function () {
        seleccionDiv.style.display = "none";
        carritoDiv.style.display = "none";
        pagoDiv.style.display = "block";
        searchResultsDiv.style.display = "none";
    });

    document.getElementById("formularioPago").addEventListener("submit", function (event) {
        event.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const metodoPago = document.getElementById("metodoPago").value;

        alert(`Gracias ${nombre} por tu compra. Recibirás un correo de confirmación en ${email}.`);
        if (nombre.toLowerCase() === "lucas") {
            alert("¡Ahh!! te la creíste! jajaja.");
        }

        carrito.length = 0; // Vaciar el carrito después de la compra
        actualizarCarrito();
        seleccionDiv.style.display = "none";
        carritoDiv.style.display = "none";
        pagoDiv.style.display = "none";
        searchResultsDiv.style.display = "none";
    });

    function mostrarComponentes() {
        seleccionDiv.innerHTML = "";
        const tipos = [...new Set(componentes.map(componente => componente.tipo))];
        tipos.forEach(tipo => {
            const tipoDiv = document.createElement("div");
            tipoDiv.innerHTML = `<h4>${tipo}</h4>`;
            componentes.filter(componente => componente.tipo === tipo).forEach(componente => {
                const itemDiv = document.createElement("div");
                itemDiv.className = "item";
                itemDiv.innerHTML = `
                    <p>${componente.nombre} - ${componente.precio} CLP</p>
                    <button class="btn btn-primary agregarCarrito">Agregar al Carrito</button>
                `;
                itemDiv.querySelector(".agregarCarrito").addEventListener("click", function () {
                    agregarAlCarrito(componente);
                });
                tipoDiv.appendChild(itemDiv);
            });
            seleccionDiv.appendChild(tipoDiv);
        });
    }

    function agregarAlCarrito(componente) {
        carrito.push(componente);
        actualizarCarrito();
    }

    function actualizarCarrito() {
        const total = carrito.reduce((sum, item) => sum + item.precio, 0);
        document.getElementById("carritoCantidad").textContent = carrito.length;
        totalCarritoSpan.textContent = total;
    }

    function mostrarCarrito() {
        carritoItemsDiv.innerHTML = "";
        carrito.forEach((item, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.innerHTML = `
                <p>${item.nombre} - ${item.precio} CLP <button class="btn btn-danger btn-sm eliminarItem" data-index="${index}">Eliminar</button></p>
            `;
            itemDiv.querySelector(".eliminarItem").addEventListener("click", function () {
                eliminarDelCarrito(index);
            });
            carritoItemsDiv.appendChild(itemDiv);
        });
        actualizarCarrito();
    }

    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        mostrarCarrito();
    }

    function mostrarResultadosBusqueda(resultados) {
        searchResultsDiv.innerHTML = "<h4>Resultados de Búsqueda</h4>";
        if (resultados.length > 0) {
            resultados.forEach(componente => {
                const itemDiv = document.createElement("div");
                itemDiv.className = "item";
                itemDiv.innerHTML = `
                    <p>${componente.nombre} - ${componente.precio} CLP</p>
                    <button class="btn btn-primary agregarCarrito">Agregar al Carrito</button>
                `;
                itemDiv.querySelector(".agregarCarrito").addEventListener("click", function () {
                    agregarAlCarrito(componente);
                });
                searchResultsDiv.appendChild(itemDiv);
            });
        } else {
            searchResultsDiv.innerHTML += "<p>No se encontraron productos con ese nombre.</p>";
        }
    }
});