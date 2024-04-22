console.log("llega a productos")
const socket = io()

const form = document.querySelector('form')

form.addEventListener('submit', (event) =>{
    event.preventDefault()

    const formData = new FormData(form)
    const formObject = Object.fromEntries(formData);
    socket.emit('newproduct',formObject)
    
})




socket.on('products', dataServer =>{
    
    const contenedor = document.getElementById('list_Product')
    let headtable,bodytable,footertable = ''
    let index = 0
    console.log("html mensaje",dataServer)
    

    headtable = `<table class="table">
            <thead class="table-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Nombre Producto</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Codigo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Categoria</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>`
/*
                */
                
            

    dataServer.map(product =>{
        index += 1
        bodytable += `
        <tr>
        <th scope="row">${index}</th>
        <td>vacia</td>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td>${product.code}</td>
        <td>${product.stock}</td>
        <td>${product.category}</td>
        <td><button type="button" class="btn btn-danger" onclick="eliminar(${product.code})">Eliminar</button></td>
        </tr>`
    })

footertable = `</tbody>
    </table>`

const productsTable = headtable+bodytable+footertable;

contenedor.innerHTML = productsTable
})

function eliminar(code){
    console.log("ESTE ES EL CODIGO",code)
    socket.emit("deleteProductByCode",code)
}
