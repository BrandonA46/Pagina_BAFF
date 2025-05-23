// Este archivo maneja la carga y visualización de productos, así como la adición al carrito, usando un almacenamiento limpio y sincronizado.

// Mantener la lista completa de productos en localStorage bajo la clave "productos_admin".
// Si no existe, inicializamos con productos de ejemplo.

(function() {
  // Clave para almacenamiento local
  const STORAGE_KEY = 'productos_admin';

  // Cargar productos de localStorage o crear lista base
  function cargarProductos() {
    let productosLocal = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!productosLocal || productosLocal.length === 0) {
      productosLocal = [
        {
          id: 1,
          nombre: "Manzana",
          descripcion: "Manzana roja importada",
          precio: 1200,
          imagen: "img/manzana.jpg",
          stock: 5,
          categoria: "frutas"
        },
        {
          id: 2,
          nombre: "Arroz",
          descripcion: "Arroz blanco 500g",
          precio: 2500,
          imagen: "img/arroz.jpg",
          stock: 10,
          categoria: "cereales"
        },
        {
          id: 3,
          nombre: "Leche",
          descripcion: "Leche entera 1L",
          precio: 3500,
          imagen: "img/leche.jpg",
          stock: 3,
          categoria: "lacteos"
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productosLocal));
    }
    return productosLocal;
  }

  // Guardar productos en localStorage
  function guardarProductos(productos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
  }

  // Mostrar los productos en la interfaz
  function mostrarProductos(lista) {
    const contenedor = document.getElementById('productos-container');
    contenedor.innerHTML = '';

    if (!lista.length) {
      contenedor.innerHTML = '<p>No se encontraron productos que coincidan con el filtro.</p>';
      return;
    }

    lista.forEach(producto => {
      const div = document.createElement('div');
      div.classList.add('producto');

      div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion || ''}</p>
      <p><strong>$${producto.precio.toLocaleString()} COP</strong></p>
      ${producto.stock <= 5 ? `<p id="stock-${producto.id}"><strong>Stock disponible: ${producto.stock}</strong></p>` : ''}
      <label for="cantidad-${producto.id}">Cantidad:</label>
      <input 
        type="number" 
        id="cantidad-${producto.id}" 
        min="1" 
        max="${producto.stock}" 
        value="1" 
        ${producto.stock === 0 ? 'disabled' : ''}
      />
      <button class="btn-agregar" data-id="${producto.id}" ${producto.stock === 0 ? 'disabled' : ''}>
        <i class="fas fa-cart-plus"></i> Agregar al carrito
      </button>
    `;
    
      contenedor.appendChild(div);
    });

    // Añadir los eventos a los botones
    agregarEventosBotones();
  }

  // Función para agregar los listeners a los botones, evitando recolección múltiple
  function agregarEventosBotones() {
    const botones = document.querySelectorAll('.btn-agregar');
    botones.forEach(btn => {
      btn.removeEventListener('click', onAgregarAlCarrito);
      btn.addEventListener('click', onAgregarAlCarrito);
    });
  }

  // Evento que maneja la adición al carrito
  function onAgregarAlCarrito(e) {
    const btn = e.currentTarget;
    const dataId = btn.getAttribute('data-id');
    if (!dataId) {
      alert('Error: No se encontró el ID del producto en el botón.');
      return;
    }
    const idProducto = Number(dataId);
    if (isNaN(idProducto)) {
      alert('Error: ID de producto inválido.');
      return;
    }
    agregarAlCarrito(idProducto);
  }

  // Función para agregar producto al carrito y actualizar stock
  function agregarAlCarrito(id) {
    // Cargar productos actuales
    let productos = cargarProductos();

    // Buscar producto por id
    const producto = productos.find(p => p.id === id);
    if (!producto) {
      alert('Producto no encontrado.');
      return;
    }

    const inputCantidad = document.getElementById(`cantidad-${id}`);
    if (!inputCantidad) {
      alert('Error interno: campo cantidad no encontrado.');
      return;
    }
    let cantidad = parseInt(inputCantidad.value, 10);
    if (isNaN(cantidad) || cantidad < 1) {
      alert('Por favor, ingresa una cantidad válida.');
      return;
    }

    if (cantidad > producto.stock) {
      alert('No hay suficiente stock disponible.');
      return;
    }

    // Actualizar stock en la variable productos y guardar
    producto.stock -= cantidad;
    guardarProductos(productos);

    // Actualizar interfaz: stock restante
    const stockElemento = document.getElementById(`stock-${id}`);
    if (stockElemento) {
      stockElemento.textContent = 'Stock disponible: ' + producto.stock;
    }

    // Actualizar input y botón si stock agotado
    inputCantidad.max = producto.stock;
    if (producto.stock === 0) {
      inputCantidad.disabled = true;
      inputCantidad.value = 0;
      if (inputCantidad.nextElementSibling) {
        inputCantidad.nextElementSibling.disabled = true;
      }
    }

    // Cargar carrito actual o crear nuevo
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Añadir los productos al carrito
    for (let i = 0; i < cantidad; i++) {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
      });
    }

    // Guardar carrito actualizado
    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert(`${cantidad} ${producto.nombre}(s) se agregaron al carrito 🛒`);
  }

  // Función para filtrar productos
  function filtrar() {
    const texto = document.getElementById('buscador').value.toLowerCase();
    const categoria = document.getElementById('filtro-categoria').value;

    const filtrados = productos.filter(p => {
      const coincideTexto = p.nombre.toLowerCase().includes(texto);
      const coincideCategoria = categoria === 'todos' || p.categoria === categoria;
      return coincideTexto && coincideCategoria;
    });

    mostrarProductos(filtrados);
  }

  // Inicialización
  document.addEventListener('DOMContentLoaded', () => {
    productos = cargarProductos();
    mostrarProductos(productos);

    document.getElementById('buscador').addEventListener('input', filtrar);
    document.getElementById('filtro-categoria').addEventListener('change', filtrar);

    const adminLink = document.getElementById('admin-link');
    if (localStorage.getItem('sesion_admin') !== 'activa') {
      if (adminLink) adminLink.style.display = 'none';
    }
  });
})();
