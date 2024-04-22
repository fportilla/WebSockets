const express = require('express');
const router = express.Router();

const ProductManager = require('../ProductManager')
const path = 'products.json'
const Productos = new ProductManager(path);



router.get('/',(req,res) =>{

    let {limit} = req.query;
    const products = Productos.getProducts()
    let response = []
    let contador = 0
    if(limit > 0){
        for (const i of products) {
            contador+=1
            if (contador <= limit){
                response.push(i)
            }
        }
        console.log("response",response)
        res.send(response)
    }else{
        res.send(products)
        console.log("entra ree",products)
    }
    
})

router.get('/:pid', (req,res)=>{
    console.log("entra")
    const idProduct = req.params.pid
    console.log("id",idProduct)
    res.send(Productos.getProductById(parseInt(idProduct)))
})

router.post('/',(req,res)=>{
    
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    
    if (!title || !description || !code || !price || !status || !stock || !category){
        return res.send({ status: 'error', error: 'faltan campos obligatorios'})
    }

    Productos.addProduct(title,description,price,thumbnails,code,stock,status,category)
    res.status(200).send( { status: 'success', mensaje: 'resgistro exitoso'})
})

router.put('/:pid',(req,res)=>{
    const idProductUdp = req.params.pid
    let udpProduct = []
    udpProduct = req.body
    
    if (idProductUdp){
        Productos.updateProduct(parseInt(idProductUdp),udpProduct)
        res.send({ status: "success", mensaje: "actualizado con exito"})
    }
})

router.delete('/:pid',(req,res)=>{
    const idProductdel = req.params.pid
    if (idProductdel){
        Productos.deleteProduct(parseInt(idProductdel))
        res.send({ status: "success", mensaje: "eliminado con exito"})
    }
})



module.exports = router;
