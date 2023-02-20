let url="https://dummyjson.com/products?limit=12 "; /*Guardamos la url de donde vamos a consumir el recurso*/
const botonCarrito= document.getElementById("carritoIcon");
const carrito = document.getElementById("carrito")

botonCarrito.onclick= ()=>{
    if(carrito.style.display=="flex"){
        carrito.style.display="none";
    }else{
        carrito.style.display="flex";
    }
};

fetch(url) /* Consumimos una API con productos*/
.then(res => res.json()) 
.then(producto=>mostrarProducto(producto.products))
.catch(error=>console.log(error));


function mostrarProducto(producto){
    const areaMarket = document.getElementById("areaMarket")
    for(let i = 0; i<producto.length;i++){
        const card= document.createElement("div")
        card.className="card";
        card.style.width="90%"
        card.innerHTML = `
        <div style="overflow:hidden;">
            <img style="height: 265px;" src="${producto[i].thumbnail}" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
          <h5 class="card-title">${producto[i].title}</h5>
          <p class="card-text">${producto[i].description} </p>
          <span class="precio">${producto[i].price}</span>  
          <a href="#carrito" class="btn btn-primary btn-gott">Comprar</a>
        </div>
         `; 
        areaMarket.append(card);
        // let botonCompra=card.querySelector(".botonCompra")
        // botonCompra.addEventListener("click",agregar_carrito);
    }
}