const contenedorCarrito = document.getElementById("carrito-container");
const totalTexto = document.getElementById("total-carrito");

function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
    totalTexto.textContent = "$0 COP";
    return;
  }

  // Agrupar productos por ID para mostrar cantidad y subtotal
  const resumen = {};
  carrito.forEach(p => {
    if (resumen[p.id]) {
      resumen[p.id].cantidad++;
    } else {
      resumen[p.id] = { ...p, cantidad: 1 };
    }
  });

  contenedorCarrito.innerHTML = "";
  let total = 0;

  Object.values(resumen).forEach(producto => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const div = document.createElement("div");
    div.classList.add("producto-carrito");

    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" style="width:80px; height:80px; object-fit: contain; border-radius: 8px; margin-bottom: 8px;">
      <h4>${producto.nombre}</h4>
      <p>Precio unitario: $${producto.precio.toLocaleString()} COP</p>
      <p>Cantidad: ${producto.cantidad}</p>
      <p><strong>Subtotal: $${subtotal.toLocaleString()} COP</strong></p>
      <button class="btn-eliminar" onclick="eliminarProducto(${producto.id})">
        <i class="fas fa-trash"></i> Quitar uno
      </button>
      <hr>
    `;

    contenedorCarrito.appendChild(div);
  });

  totalTexto.textContent = `$${total.toLocaleString()} COP`;
}

/**
 * Función que elimina una unidad de producto del carrito,
 * y almacena el stock aumentado en la lista de productos en localStorage.
 * @param {Number} id - id del producto a eliminar una unidad
 */
function eliminarProducto(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let productos = JSON.parse(localStorage.getItem("productos_admin")) || [];

  // Encontrar el primer índice de producto con el id dado en el carrito
  const indexCarrito = carrito.findIndex(p => p.id === id);
  if (indexCarrito === -1) return; // No encontrado, nada que hacer

  // Remover una unidad en carrito
  carrito.splice(indexCarrito, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Aumentar el stock en productos_admin
  const indexProducto = productos.findIndex(p => p.id === id);
  if (indexProducto !== -1) {
    productos[indexProducto].stock += 1; // aumentar stock en 1
    localStorage.setItem("productos_admin", JSON.stringify(productos));
  }

  // Refrescar el carrito para mostrar la nueva cantidad y total
  mostrarCarrito();
}

// Función para vaciar el carrito completo, preguntar antes
function vaciarCarrito() {
  if (confirm("¿Seguro que quieres vaciar el carrito?")) {
    localStorage.removeItem("carrito");
    mostrarCarrito();
  }
}

mostrarCarrito();
