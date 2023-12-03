//informacion sobre botones de carrito
const añadirCarritoB = document.querySelectorAll('.cart');
console.log(':añadirCarritoB', añadirCarritoB);
añadirCarritoB.forEach((agregarCarrito) => {
    agregarCarrito.addEventListener('click', añadirCarritoClick);
});
const botoncomprar = document.querySelector('.comprar');
botoncomprar.addEventListener('click', botoncomprarCliked);
//añade al carrito el contenido falta la hacer el carrito
const agregandoCarritoUbi = document.querySelector('.carrito-productos')
//informacion sobre carrito
function añadirCarritoClick(event) {
    const cart = event.target;
    const productos = cart.closest('.productos');
    const productoTitulo = productos.querySelector('.productos h4').textContent;
    const productoPrecio = productos.querySelector('.productos .precio').textContent;
    const productoImagen = productos.querySelector('.productos img').src;
    console.log(':añadirCarritoClick -> productoTitulo', productoTitulo, productoPrecio,
        productoImagen
    );
    añadirProductoCarrito(productoTitulo, productoPrecio, productoImagen)
}
function añadirProductoCarrito(productoTitulo, productoPrecio, productoImagen) {
    //deja solo un producto
    const titulos = agregandoCarritoUbi.getElementsByClassName('carrito-producto-titulo');
    for(let i =0; i < titulos.length; i++){
        if(titulos[i].innerText === productoTitulo){
        let cantidad = titulos[i].parentElement.parentElement.parentElement.querySelector('.carrito-producto-cantidad');
        cantidad.value++;
        añadirCarrito();
        return;
        }
    }
    const agregandoCarrito = document.createElement('div');
    const compraCarritoContenido = `
    <div class="carrito-items">
    </div>
    <div class="carrito-producto">
        <img src=${productoImagen} width="80px" alt="">
        <div class="carrito-producto-detalles">
            <span class="carrito-producto-titulo">${productoTitulo}</span>
            <div class="selector-cantidad">
                <input class="carrito-producto-cantidad" type="number" value="1">
            </div>
            <span class="carrito-producto-precio">${productoPrecio}</span>
        </div>
        <button class="eliminar" type="button">Eliminar</button>
    </div>
     `;
    agregandoCarrito.innerHTML = compraCarritoContenido;
    agregandoCarritoUbi.append(agregandoCarrito);
    agregandoCarrito.querySelector('.eliminar').addEventListener('click', eliminarproductocarrito);
    agregandoCarrito.querySelector('.carrito-producto-cantidad').addEventListener('change', cantidadcambio);
    añadirCarrito()
}
//funcion de actualizar carrito
function añadirCarrito() {
    let total = 0;
    const compracarritototal = document.querySelector('.total');
    const compracarritoproducto = document.querySelectorAll('.carrito-producto')
    compracarritoproducto.forEach(compracarritoproducto => {
        const compracarritoproductota = compracarritoproducto.querySelector('.carrito-producto-precio');
        const carritoproductoprecio =Number(compracarritoproductota.textContent.replace('$',''));
        const carritocantidad = compracarritoproducto.querySelector('.carrito-producto-cantidad');
        const carritocantidadvalor = Number(carritocantidad.value);
        total= total + carritoproductoprecio * carritocantidadvalor;
console.log(':añadirCarrito -> total', total);
    });
    compracarritototal.innerHTML = `${total}$`;
}
//funcion para eliminar del carrito
function eliminarproductocarrito(event) {
    const botoneliminar = event.target;
    botoneliminar.closest('.carrito-producto').remove();
    añadirCarrito();
}
//funcion para cambiar cantidad
function cantidadcambio(event) {
    const input = event.target;
    if(input.value <=0){
        input.value =1;
    }
    añadirCarrito()
}
function botoncomprarCliked() {
    agregandoCarritoUbi.innerHTML = '';
    añadirCarrito();
}