if (localStorage.getItem('sesion_admin') !== 'activa') {
  alert('Acceso restringido. Debes iniciar sesión como empleado.');
  window.location.href = 'login.html';
}

const STORAGE_KEY = 'productos_admin';

let productos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
if (productos.length === 0) {
  productos = [
    {
      id: 1,
      nombre: 'Manzana',
      descripcion: 'Manzana roja importada',
      precio: 1200,
      stock: 5,
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg',
      categoria: 'frutas'
    },
    {
      id: 2,
      nombre: 'Arroz',
      descripcion: 'Arroz blanco 500g',
      precio: 2500,
      stock: 10,
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Rice.png',
      categoria: 'cereales'
    },
    {
      id: 3,
      nombre: 'Leche',
      descripcion: 'Leche entera 1L',
      precio: 3500,
      stock: 3,
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Milk_glass.jpg',
      categoria: 'lacteos'
    }
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
}

let editIndex = -1;

const form = document.getElementById('form-nuevo-producto');
const contenedorTabla = document.getElementById('tabla-productos');
const btnSubmit = form.querySelector('button[type="submit"]');
const imagenPreview = document.getElementById('imagen-preview');

function renderizarTabla() {
  contenedorTabla.innerHTML = '';
  if (productos.length === 0) {
    contenedorTabla.innerHTML = '<p>No hay productos aún.</p>';
    return;
  }
  productos.forEach((p, idx) => {
    const div = document.createElement('div');
    div.classList.add('producto-carrito');
    div.innerHTML = `
      <strong>${p.nombre}</strong><br>
      Precio: $${p.precio.toLocaleString()} COP<br>
      Stock: ${p.stock}<br>
      Categoría: ${p.categoria}<br>
      <img src="${p.imagen}" alt="${p.nombre}" width="100" style="border-radius:8px; margin-top:5px;"><br>
      <button type="button" onclick="editarProducto(${idx})">Editar</button>
      <button type="button" onclick="eliminarProducto(${idx})" style="background-color:#b30000; margin-left:10px;">Eliminar</button>
    `;
    contenedorTabla.appendChild(div);
  });
}

function eliminarProducto(i) {
  if (confirm('¿Eliminar este producto?')) {
    productos.splice(i, 1);
    guardarYActualizar();
    if (editIndex === i) {
      resetForm();
    }
  }
}

function guardarYActualizar() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
  renderizarTabla();
}

function editarProducto(i) {
  const p = productos[i];
  document.getElementById('nombre').value = p.nombre || '';
  document.getElementById('precio').value = p.precio || '';
  document.getElementById('stock').value = p.stock || '';
  document.getElementById('imagen').value = p.imagen || '';
  document.getElementById('categoria').value = p.categoria || '';
  if(imagenPreview){
    imagenPreview.src = p.imagen || '';
    imagenPreview.style.display = p.imagen ? 'block' : 'none';
  }
  editIndex = i;
  btnSubmit.textContent = 'Guardar cambios';
}

function resetForm() {
  form.reset();
  if(imagenPreview){
    imagenPreview.src = '';
    imagenPreview.style.display = 'none';
  }
  editIndex = -1;
  btnSubmit.textContent = 'Agregar';
}

function generarNuevoId() {
  if (productos.length === 0) {
    return 1;
  }
  return Math.max(...productos.map(p => p.id)) + 1;
}

function esUrlValida(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (_) {
    // También permitir ruta local simple (opcional)
    return url.startsWith('img/') || url === '';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = form.nombre.value.trim();
  const precio = parseFloat(form.precio.value);
  const stock = parseInt(form.stock.value);
  let imagen = form.imagen.value.trim();
  const categoria = form.categoria.value;

  if (!nombre || isNaN(precio) || isNaN(stock) || !categoria) {
    alert('Por favor completa todos los campos correctamente.');
    return;
  }

  if(imagen === '' && editIndex !== -1) {
    imagen = productos[editIndex].imagen;
  } else if(!esUrlValida(imagen)) {
    alert('Por favor ingresa una URL válida o ruta local para la imagen.');
    return;
  }

  if (editIndex === -1) {
    const nuevoProducto = {
      id: generarNuevoId(),
      nombre,
      precio,
      stock,
      imagen,
      categoria
    };
    productos.push(nuevoProducto);
  } else {
    productos[editIndex].nombre = nombre;
    productos[editIndex].precio = precio;
    productos[editIndex].stock = stock;
    productos[editIndex].imagen = imagen;
    productos[editIndex].categoria = categoria;
  }

  guardarYActualizar();
  resetForm();
});

function cerrarSesion() {
  localStorage.removeItem('sesion_admin');
  window.location.href = 'login.html';
}

window.editarProducto = editarProducto;
window.eliminarProducto = eliminarProducto;
window.cerrarSesion = cerrarSesion;

document.addEventListener('DOMContentLoaded', () => {
  renderizarTabla();
});

document.getElementById('btn-cerrar-sesion').addEventListener('click', cerrarSesion);
