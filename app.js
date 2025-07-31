let productos = [];

fetch("productos.json")
  .then((res) => res.json())
  .then((data) => {
    productos = data;
    renderProductos(productos);
    llenarCategorias();
  });

function renderProductos(lista) {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";
  lista.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" />
      <h3>${p.nombre}</h3>
      <p class="precio">${p.precio}</p>
      <p class="categoria">${p.categoria}</p>
    `;
    container.appendChild(card);
  });
}

function llenarCategorias() {
  const select = document.getElementById("categorySelect");
  const categorias = [...new Set(productos.map(p => p.categoria))].sort();
  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

document.getElementById("searchInput").addEventListener("input", filtrar);
document.getElementById("categorySelect").addEventListener("change", filtrar);

function filtrar() {
  const texto = document.getElementById("searchInput").value.toLowerCase();
  const categoria = document.getElementById("categorySelect").value;
  const filtrados = productos.filter(p =>
    (categoria === "Todas" || p.categoria === categoria) &&
    p.nombre.toLowerCase().includes(texto)
  );
  renderProductos(filtrados);
}