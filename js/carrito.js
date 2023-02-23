export function agregar_carrito(e){
    let listaCarrito=recuperarCarrito();
    let itemRepetido= false; /**Esta variable se usa cuando quiero comprar un item q ya esta en mi lista */

    let producto_2= e.target;
    let producto_1= producto_2.parentNode;
    let producto=producto_1.parentNode;

    let nombre_productos = producto_1.querySelector("h5").innerHTML;
    let precio_productos = producto_1.querySelector("span").innerHTML;
    let img_productos = producto.querySelector("img").src;

    let itemCarrito={  /** Es el mismo objeto pero le cambie el nombre para q sea mas facil */
        nombre: nombre_productos,
        precio: precio_productos,
        img: img_productos,
        cantidad:1
    };

    listaCarrito.forEach(producto => {  /** Recorro mi listaCarrito (Es la que esta en local storage) */
        if(itemCarrito.img==producto.img){ /**Pregunto si la imagen del item que va a comprar la persona es igual al producto que tengo guardado en el localstorage (es decir si ya existe en mi carrito) */
            producto.cantidad++ /** en caso de que exista, a ese producto dentro de mi localstorage le sumo 1  */
            itemRepetido=true; /**Como el item que quiere comprar esta repetido cambio el valor de la variable */
        }
    });

    if(!itemRepetido){ /**Si el item no esta repetido, entonces voy a agregarlo a mi lista que voy a guardar en mi local storage */
        listaCarrito.push(itemCarrito);    
    }

    guardarCarrito(listaCarrito);
    actualizarCarrito(); /* LLamo a la funcion que muestra el carrito */
}

function recuperarCarrito(){
    let listaCarrito = JSON.parse(localStorage.getItem("GotzListaCarrito")) || [];
    return listaCarrito;
}

export function actualizarCarrito(){  /*Le cambie el nombre a la funcion (antes era solo carrito), de esta manera se entiende mejor que hace esta funcion */
    const carritoEnPantalla = document.getElementById("carrito-card-container");
    carritoEnPantalla.innerHTML="";
    let listaCarrito = recuperarCarrito();
    listaCarrito.forEach(producto =>{ /*para cada elemento de la lista voy a hacer lo siguiente */
        let card = document.createElement("div");
        card.classList.add("carrito-card")
        card.innerHTML = `<div class="carrito-card-img-container">
                            <img src="${producto.img    }" alt="">
                            </div>
                            <p>${producto.nombre}</p>
                            <p>${producto.precio}</p>
                            <p>${producto.cantidad}</p>
                            <div class="carrito-btn-container">
                                <button class="botones-carrito boton-suma">+</button>
                                <button class="botones-carrito boton-resta">-</button>
                                <i class="fas fa-trash-alt trashIcon icon"></i>
                            </div>`;
        let botonSuma= card.querySelector(".boton-suma");
        let botonResta = card.querySelector(".boton-resta")
        botonSuma.addEventListener("click", sumarRestarItems);
        botonResta.addEventListener("click", sumarRestarItems);
        const boton_borrar= card.querySelector(".trashIcon");
        boton_borrar.addEventListener("click",borrarElemento)
        let tabla = document.getElementById("carrito-card-container");
        tabla.append( card );
    })
    
    return ;    
}

function borrarElemento(e){
    let listaCarrito=recuperarCarrito();
    console.log(listaCarrito);
    let imgParaBorrar= e.target.parentNode.parentNode.querySelector("img").src;

    let pos=0;
    listaCarrito.forEach(producto => {  /** Recorro mi listaCarrito (Es la que esta en local storage) */
        if(imgParaBorrar==producto.img){ /**Pregunto si la imagen del item que va a comprar la persona es igual al producto que tengo guardado en el localstorage (es decir si ya existe en mi carrito) */
            listaCarrito.splice(pos,1);
        }
        pos++;
    });
    guardarCarrito(listaCarrito);
    
    let botonPresionado = e.target;
    let columnaBotonPresionado = botonPresionado.parentNode;
    let card = columnaBotonPresionado.parentNode;
    card.remove();
}

function guardarCarrito(listaCarrito){
    let listaCarrito_json=JSON.stringify(listaCarrito);
    localStorage.setItem("GotzListaCarrito",listaCarrito_json); /**Guardo mi lista, ya sea porque le agregue un item al carrito, o porque aumente el valor de algun producto que ya estaba dentro del carrito */

}

function sumarRestarItems(e){
    let imgParaBorrar = e.target.parentNode.parentNode.querySelector("img").src;
    let listaCarrito = recuperarCarrito();
    if(e.target.classList.contains("boton-suma")){
        listaCarrito.forEach(producto => {  /** Recorro mi listaCarrito (Es la que esta en local storage) */
        if(imgParaBorrar==producto.img){ /**Pregunto si la imagen del item que va a comprar la persona es igual al producto que tengo guardado en el localstorage (es decir si ya existe en mi carrito) */
            producto.cantidad++;
        }
    });
    }else{
        console.log(listaCarrito)
        let pos=0;
        listaCarrito.forEach(producto => {  /** Recorro mi listaCarrito (Es la que esta en local storage) */
        if(imgParaBorrar==producto.img){ /**Pregunto si la imagen del item que va a comprar la persona es igual al producto que tengo guardado en el localstorage (es decir si ya existe en mi carrito) */
           if(producto.cantidad>1){
               producto.cantidad--;
           }
           else{
            listaCarrito.splice(pos,1);
           }
        }
        pos++;
    });
    }
    
    guardarCarrito(listaCarrito);
    
    actualizarCarrito();
}

export function finalizarCompra(evento){
    notificacionExitosa();
    localStorage.removeItem("listaCarrito");
    actualizarCarrito();
}

function notificacionExitosa(){
    Toastify({

        text: "Compra Exitosa",
        
        duration: 1500
        
        }).showToast();
}