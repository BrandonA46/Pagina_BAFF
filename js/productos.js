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
        },
        {
          id: 4,
          nombre: "Zanahoria",
          descripcion: "Zanahoria fresca por libra",
          precio: 1300,
          imagen: "img/zanahorias.png",
          stock: 18,
          categoria: "verduras"
        },
        {
          id: 5,
          nombre: "Papa criolla",
          descripcion: "Papa criolla lavada por libra",
          precio: 1800,
          imagen: "img/criolla.jpg",
          stock: 25,
          categoria: "verduras"
        },
        {
          id: 6,
          nombre: "Tomate chonto",
          descripcion: "Tomate fresco por libra",
          precio: 2200,
          imagen: "img/tomate.jpg",
          stock: 20,
          categoria: "verduras"
        },
        {
          id: 7,
          nombre: "Cebolla cabezona",
          descripcion: "Cebolla blanca por libra",
          precio: 1500,
          imagen: "img/cebolla.png",
          stock: 17,
          categoria: "verduras"
        },
        {
          id: 8,
          nombre: "Pimentón rojo",
          descripcion: "Pimentón rojo unidad",
          precio: 2000,
          imagen: "img/pimenton.jpg",
          stock: 10,
          categoria: "verduras"
        },
        {
          id: 9,
          nombre: "Brócoli",
          descripcion: "Brócoli fresco por unidad",
          precio: 3200,
          imagen: "img/brocoli.jpg",
          stock: 9,
          categoria: "verduras"
        },
        {
          id: 10,
          nombre: "Repollo",
          descripcion: "Repollo verde por unidad",
          precio: 2800,
          imagen: "img/repollo.jpg",
          stock: 11,
          categoria: "verduras"
        },
        {
          id: 11,
          nombre: "Espinaca",
          descripcion: "Manojo de espinaca fresca",
          precio: 1200,
          imagen: "img/espinacas.jpg",
          stock: 15,
          categoria: "verduras"
        },
        {
          id: 12,
          nombre: "Ajo",
          descripcion: "Cabeza de ajo nacional",
          precio: 600,
          imagen: "img/ajo.jpg",
          stock: 30,
          categoria: "verduras"
        },
        {
          id: 13,
          nombre: "Apio",
          descripcion: "Rama de apio por unidad",
          precio: 1500,
          imagen: "img/apio.png",
          stock: 14,
          categoria: "verduras"
        },
        {
          id: 14,
          nombre: "Pepino cohombro",
          descripcion: "Pepino grande por unidad",
          precio: 1600,
          imagen: "img/cohombro.jpg",
          stock: 13,
          categoria: "verduras"
        },
        {
          id: 15,
          nombre: "Remolacha",
          descripcion: "Remolacha roja por libra",
          precio: 1800,
          imagen: "img/remolacha.jpg",
          stock: 16,
          categoria: "verduras"
        },
        {
          id: 16,
          nombre: "Habichuela",
          descripcion: "Habichuela fresca por libra",
          precio: 2000,
          imagen: "img/habichuela.jpg",
          stock: 12,
          categoria: "verduras"
        },
        {
          id: 17,
          nombre: "Mazorca",
          descripcion: "Mazorca tierna por unidad",
          precio: 2200,
          imagen: "img/mazorca.jpg",
          stock: 10,
          categoria: "verduras"
        },
        {
          id: 18,
          nombre: "Yuca",
          descripcion: "Yuca blanca por libra",
          precio: 1400,
          imagen: "img/yuca.jpg",
          stock: 20,
          categoria: "verduras"
        },
        {
          id: 19,
          nombre: "Manzana verde",
          descripcion: "Manzana verde importada",
          precio: 1200,
          imagen: "img/verde.jpg",
          stock: 20,
          categoria: "frutas"
        },
        {
          id: 20,
          nombre: "Banano",
          descripcion: "Banano maduro nacional",
          precio: 900,
          imagen: "img/banano.jpg",
          stock: 25,
          categoria: "frutas"
        },
        {
          id: 21,
          nombre: "Pera verde",
          descripcion: "Pera verde importada",
          precio: 1400,
          imagen: "img/pera.jpg",
          stock: 18,
          categoria: "frutas"
        },
        {
          id: 22,
          nombre: "Uvas moradas",
          descripcion: "Uvas sin semilla por libra",
          precio: 2500,
          imagen: "img/morada.jpg",
          stock: 15,
          categoria: "frutas"
        },
        {
          id: 23,
          nombre: "Fresas",
          descripcion: "Fresas frescas por libra",
          precio: 2800,
          imagen: "img/fresas.jpg",
          stock: 10,
          categoria: "frutas"
        },
        {
          id: 24,
          nombre: "Sandía",
          descripcion: "Sandía entera por unidad",
          precio: 4500,
          imagen: "img/sandia.jpg",
          stock: 7,
          categoria: "frutas"
        },
        {
          id: 25,
          nombre: "Melón",
          descripcion: "Melón cantalupo por unidad",
          precio: 4200,
          imagen: "img/melon.jpg",
          stock: 8,
          categoria: "frutas"
        },
        {
          id: 26,
          nombre: "Mango tommy",
          descripcion: "Mango rojo por unidad",
          precio: 2000,
          imagen: "img/mango.jpg",
          stock: 20,
          categoria: "frutas"
        },
        {
          id: 27,
          nombre: "Limón",
          descripcion: "Limón común por libra",
          precio: 1000,
          imagen: "img/limon.jpg",
          stock: 22,
          categoria: "frutas"
        },
        {
          id: 28,
          nombre: "Naranja",
          descripcion: "Naranja dulce por libra",
          precio: 1100,
          imagen: "img/naranja.jpg",
          stock: 24,
          categoria: "frutas"
        },
        {
          id: 29,
          nombre: "Mandarina",
          descripcion: "Mandarina jugosa por libra",
          precio: 1300,
          imagen: "img/mandarina.jpg",
          stock: 21,
          categoria: "frutas"
        },
        {
          id: 30,
          nombre: "Papaya",
          descripcion: "Papaya por unidad mediana",
          precio: 3500,
          imagen: "img/papaya.jpg",
          stock: 9,
          categoria: "frutas"
        },
        {
          id: 31,
          nombre: "Maracuyá",
          descripcion: "Maracuyá fresco por libra",
          precio: 2700,
          imagen: "img/maracuya.jpg",
          stock: 14,
          categoria: "frutas"
        },
        {
          id: 32,
          nombre: "Guanábana",
          descripcion: "Guanábana mediana por unidad",
          precio: 5200,
          imagen: "img/guanabana.jpg",
          stock: 6,
          categoria: "frutas"
        },
        {
          id: 33,
          nombre: "Kiwi",
          descripcion: "Kiwi verde por unidad",
          precio: 1900,
          imagen: "img/kiwi.jpg",
          stock: 10,
          categoria: "frutas"
        },
        {
          id: 34,
          nombre: "Leche deslactosada",
          descripcion: "Leche deslactosada semidescremada 1L",
          precio: 2600,
          imagen: "img/deslactosada.jpg",
          stock: 15,
          categoria: "lacteos"
        },
        {
          id: 35,
          nombre: "Yogurt natural",
          descripcion: "Yogurt natural sin azúcar 1L",
          precio: 3100,
          imagen: "img/natural.jpg",
          stock: 12,
          categoria: "lacteos"
        },
        {
          id: 36,
          nombre: "Yogurt de fresa",
          descripcion: "Yogurt sabor fresa 1L",
          precio: 3200,
          imagen: "img/fresa.jpg",
          stock: 18,
          categoria: "lacteos"
        },
        {
          id: 37,
          nombre: "Kumis",
          descripcion: "Kumis natural 1L",
          precio: 2900,
          imagen: "img/kumis.jpg",
          stock: 14,
          categoria: "lacteos"
        },
        {
          id: 38,
          nombre: "Queso campesino",
          descripcion: "Queso fresco tipo campesino 500g",
          precio: 6200,
          imagen: "img/campesino.jpg",
          stock: 10,
          categoria: "lacteos"
        },
        {
          id: 39,
          nombre: "Queso mozzarella",
          descripcion: "Queso mozzarella rallado 250g",
          precio: 5800,
          imagen: "img/mozzarella.jpg",
          stock: 8,
          categoria: "lacteos"
        },
        {
          id: 40,
          nombre: "Queso doble crema",
          descripcion: "Queso doble crema por libra",
          precio: 7000,
          imagen: "img/crema.jpg",
          stock: 11,
          categoria: "lacteos"
        },
        {
          id: 41,
          nombre: "Mantequilla con sal",
          descripcion: "Mantequilla tradicional con sal 250g",
          precio: 3500,
          imagen: "img/mantequilla.jpg",
          stock: 17,
          categoria: "lacteos"
        },
        {
          id: 42,
          nombre: "Mantequilla sin sal",
          descripcion: "Mantequilla sin sal 250g",
          precio: 3600,
          imagen: "img/mantequillasin.jpg",
          stock: 13,
          categoria: "lacteos"
        },
        {
          id: 43,
          nombre: "Crema de leche",
          descripcion: "Crema de leche 200ml",
          precio: 2800,
          imagen: "img/crema_leche.jpg",
          stock: 16,
          categoria: "lacteos"
        },
        {
          id: 44,
          nombre: "Arequipe",
          descripcion: "Dulce de leche tipo arequipe 220g",
          precio: 3700,
          imagen: "img/arequipe.jpg",
          stock: 14,
          categoria: "lacteos"
        },
        {
          id: 45,
          nombre: "Leche en polvo",
          descripcion: "Leche en polvo entera 400g",
          precio: 8500,
          imagen: "img/leche_polvo.jpg",
          stock: 9,
          categoria: "lacteos"
        },
        {
          id: 46,
          nombre: "Bebida láctea sabor vainilla",
          descripcion: "Bebida láctea saborizada 250ml",
          precio: 1800,
          imagen: "img/bebida_lactea.jpg",
          stock: 20,
          categoria: "lacteos"
        },
        {
          id: 47,
          nombre: "Queso crema",
          descripcion: "Queso crema para untar 150g",
          precio: 3900,
          imagen: "img/queso_crema.jpg",
          stock: 10,
          categoria: "lacteos"
        },
        {
          id: 48,
          nombre: "Leche de almendras",
          descripcion: "Leche entera pasteurizada 1L",
          precio: 2500,
          imagen: "img/leche_almendras.jpg",
          stock: 20,
          categoria: "lacteos"
        },
        {
          id: 49,
          nombre: "Pechuga de pollo",
          descripcion: "Pechuga de pollo sin hueso por libra",
          precio: 7800,
          imagen: "img/pechuga.jpg",
          stock: 20,
          categoria: "proteinas"
        },
        {
          id: 50,
          nombre: "Carne molida de res",
          descripcion: "Carne de res molida por libra",
          precio: 8900,
          imagen: "img/carne_molida.jpg",
          stock: 18,
          categoria: "proteinas"
        },
        {
          id: 51,
          nombre: "Costilla de cerdo",
          descripcion: "Costilla de cerdo por libra",
          precio: 8600,
          imagen: "img/costilla_cerdo.jpg",
          stock: 15,
          categoria: "proteinas"
        },
        {
          id: 52,
          nombre: "Filete de pescado",
          descripcion: "Filete de pescado blanco por libra",
          precio: 10500,
          imagen: "img/filete_pescado.jpg",
          stock: 10,
          categoria: "proteinas"
        },
        {
          id: 53,
          nombre: "Huevos AA",
          descripcion: "Cartón de huevos AA x12",
          precio: 5800,
          imagen: "img/huevos.jpg",
          stock: 25,
          categoria: "proteinas"
        },
        {
          id: 54,
          nombre: "Salchicha ranchera",
          descripcion: "Salchicha tipo ranchera 500g",
          precio: 5200,
          imagen: "img/ranchera.jpg",
          stock: 12,
          categoria: "proteinas"
        },
        {
          id: 55,
          nombre: "Chorizo",
          descripcion: "Chorizo artesanal por libra",
          precio: 6400,
          imagen: "img/chorizo.jpg",
          stock: 14,
          categoria: "proteinas"
        },
        {
          id: 56,
          nombre: "Jamón de cerdo",
          descripcion: "Jamón de cerdo tajado 250g",
          precio: 3900,
          imagen: "img/jamon_cerdo.jpg",
          stock: 16,
          categoria: "proteinas"
        },
        {
          id: 57,
          nombre: "Atún en agua",
          descripcion: "Lata de atún en agua 160g",
          precio: 3400,
          imagen: "img/atun_agua.jpg",
          stock: 22,
          categoria: "proteinas"
        },
        {
          id: 58,
          nombre: "Atún en aceite",
          descripcion: "Lata de atún en aceite 160g",
          precio: 3500,
          imagen: "img/atun_aceite.jpg",
          stock: 20,
          categoria: "proteinas"
        },
        {
          id: 59,
          nombre: "Carne para asar",
          descripcion: "Corte de res especial para asar por libra",
          precio: 9800,
          imagen: "img/carne_asar.jpg",
          stock: 13,
          categoria: "proteinas"
        },
        {
          id: 60,
          nombre: "Mortadela",
          descripcion: "Mortadela tajada 250g",
          precio: 2700,
          imagen: "img/mortadela.jpg",
          stock: 17,
          categoria: "proteinas"
        },
        {
          id: 61,
          nombre: "Pollo entero",
          descripcion: "Pollo entero fresco por unidad",
          precio: 15000,
          imagen: "img/pollo.jpg",
          stock: 9,
          categoria: "proteinas"
        },
        {
          id: 62,
          nombre: "Hamburguesas de carne",
          descripcion: "Hamburguesas de carne x4 unidades",
          precio: 6200,
          imagen: "img/hamburguesas.jpg",
          stock: 10,
          categoria: "proteinas"
        },
        {
          id: 63,
          nombre: "Nuggets de pollo",
          descripcion: "Caja de nuggets precocidos 500g",
          precio: 5900,
          imagen: "img/nuggets.jpg",
          stock: 11,
          categoria: "proteinas"
        },
        {
          id: 64,
          nombre: "Arroz integral",
          descripcion: "Arroz integral tipo 1 por libra",
          precio: 1800,
          imagen: "img/arroz_integral.jpg",
          stock: 30,
          categoria: "cereales"
        },
        {
          id: 65,
          nombre: "Avena en hojuelas",
          descripcion: "Avena en hojuelas integral 500g",
          precio: 2200,
          imagen: "img/avena_hojuelas.jpg",
          stock: 20,
          categoria: "cereales"
        },
        {
          id: 66,
          nombre: "Maíz pira",
          descripcion: "Maíz para crispetas 500g",
          precio: 2500,
          imagen: "img/maiz.jpg",
          stock: 18,
          categoria: "cereales"
        },
        {
          id: 67,
          nombre: "Cereal Chocapic",
          descripcion: "Cereal de chocolate 300g",
          precio: 6200,
          imagen: "img/chocapic.jpg",
          stock: 10,
          categoria: "cereales"
        },
        {
          id: 68,
          nombre: "Cereal Corn Flakes",
          descripcion: "Cereal de maíz sin azúcar 300g",
          precio: 5800,
          imagen: "img/corn_flakes.jpg",
          stock: 12,
          categoria: "cereales"
        },
        {
          id: 69,
          nombre: "Harina de maíz",
          descripcion: "Harina de maíz precocida 1kg",
          precio: 3500,
          imagen: "img/harina_maiz.jpg",
          stock: 15,
          categoria: "cereales"
        },
        {
          id: 70,
          nombre: "Harina de trigo",
          descripcion: "Harina de trigo para todo uso 1kg",
          precio: 3300,
          imagen: "img/harina_trigo.jpg",
          stock: 20,
          categoria: "cereales"
        },
        {
          id: 71,
          nombre: "Cereal Fitness",
          descripcion: "Cereal integral bajo en azúcar 300g",
          precio: 6500,
          imagen: "img/fitness.jpg",
          stock: 8,
          categoria: "cereales"
        },
        {
          id: 72,
          nombre: "Granola",
          descripcion: "Mezcla de granola con frutos secos 500g",
          precio: 6800,
          imagen: "img/granola.jpg",
          stock: 10,
          categoria: "cereales"
        },
        {
          id: 73,
          nombre: "Cereal de avena",
          descripcion: "Cereal de avena instantáneo 300g",
          precio: 4200,
          imagen: "img/cereal_avena.png",
          stock: 14,
          categoria: "cereales"
        },
        {
          id: 74,
          nombre: "Cereal infantil",
          descripcion: "Cereal para bebé fortificado 250g",
          precio: 7200,
          imagen: "img/cereal_infantil.jpg",
          stock: 7,
          categoria: "cereales"
        },
        {
          id: 76,
          nombre: "Barra de cereal",
          descripcion: "Barra de cereal con chocolate x6 und.",
          precio: 5200,
          imagen: "img/barra_cereal.jpg",
          stock: 11,
          categoria: "cereales"
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
