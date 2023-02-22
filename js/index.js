let url="https://dummyjson.com/products?limit=12 "; /*Guardamos la url de donde vamos a consumir el recurso*/
url="https://api.escuelajs.co/api/v1/products/?categoryId=1&offset=0&limit=9";
const botonCarrito= document.getElementById("carritoIcon");
const carrito = document.getElementById("carrito");
const btnEnviarWap= document.getElementById("enviar");

btnEnviarWap.addEventListener("click",enviarWap);

function enviarWap(e){ 5491165641856
    let urlWap="https://wa.me/+5491165641856?text=";
    let nombre = document.getElementById("nombre").value;
    let mensaje= document.getElementById("mensaje").value ;
    let mensajeWap= "hola mi nombre es: "+nombre+". Les envie el siguiente mensaje por la web: "+mensaje;

    mensajeWap=mensajeWap.split(" ").join("%20");
    urlWap+=mensajeWap;
    window.open(urlWap,"_blank")
}

botonCarrito.onclick= ()=>{
    if(carrito.style.display=="flex"){
        carrito.style.display="none";
    }else{
        carrito.style.display="flex";
    }
};

fetch(url) /* Consumimos una API con productos*/
.then(res => res.json()) 
.then(producto=>mostrarProducto(producto))
.catch(error=>console.log(error));


function mostrarProducto(producto){
    const areaMarket = document.getElementById("areaMarket")
    for(let i = 0; i<producto.length;i++){
        const card= document.createElement("div")
        card.className="card";
        card.style.width="90%"
        card.innerHTML = `
        <div style="overflow:hidden;">
            <img style="height: 265px;" src="${producto[i].images[0]}" class="card-img-top" alt="...">
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